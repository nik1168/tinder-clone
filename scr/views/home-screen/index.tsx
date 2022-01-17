import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from '@firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import tw from 'tailwind-rn';

import {db} from '../../../firebase';
import ActionCardBlock from '../../components/molecules/action-card-block';
import CardItem from '../../components/organisms/card-item';
import CardNoResults from '../../components/organisms/card-no-results';
import Header from '../../components/organisms/header';
import useAuth from '../../hooks/useAuth';
import {RootStackParams, RootStackRouteNames} from '../../navigation/typings';
import {mapUserToMatchUser} from '../../utils/match-utils';
import {MatchUser} from './typings';

const HomeScreen = (): JSX.Element => {
  const {user} = useAuth();

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [profiles, setProfiles] = useState<MatchUser[]>([]);

  const swipeRef = useRef<Swiper<MatchUser>>(null);

  const onSwipedLeft = async (cardIndex: number): Promise<void> => {
    const userSwiped: MatchUser | undefined = profiles.find(
      (_, idx) => cardIndex === idx,
    );

    if (!userSwiped) {
      return;
    }

    await setDoc(
      doc(db, 'users', user?.uid ?? '', 'passes', userSwiped.id.toString()),
      userSwiped,
    );
  };

  const onSwipedRight = async (cardIndex: number): Promise<void> => {
    console.log('Swipe match= ', cardIndex);
  };

  const onPressPass = (): void => {
    swipeRef.current?.swipeLeft();
  };

  const onPressMatch = (): void => {
    swipeRef.current?.swipeRight();
  };

  const overlayLabels = {
    left: {
      title: 'NOPE',
      style: {
        label: {
          textAlign: 'right',
          color: 'red',
        },
      },
    },
    right: {
      title: 'MATCH',
      style: {
        label: {
          color: '#4DED30',
        },
      },
    },
  };

  const renderCard = (card: MatchUser): JSX.Element => {
    return card ? <CardItem user={card} /> : <CardNoResults />;
  };

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, 'users', user?.uid ?? ''), snapshot => {
        if (!snapshot.exists()) {
          navigation.navigate(RootStackRouteNames.UserInfoModal);
        }
      }),
    [navigation, user?.uid],
  );

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      const passes: string[] = await getDocs(
        collection(db, 'users', user?.uid ?? '', 'passes'),
      ).then(snapshot => snapshot.docs.map(document => document.id));
      const passedUserIds = passes.length > 0 ? passes : ['undefined'];

      unsub = onSnapshot(
        query(
          collection(db, 'users'),
          where('id', 'not-in', [...passedUserIds]),
        ),
        snapshot => {
          const profilesFetch: MatchUser[] = snapshot.docs
            .filter(document => document.id !== user?.uid)
            .map(mapUserToMatchUser);

          setProfiles(profilesFetch);
        },
      );
    };

    fetchCards();

    return unsub;
  }, [user?.uid]);

  return (
    <SafeAreaView style={tw('flex-1')}>
      <Header photoUrl={user?.photoURL} />
      <View style={tw('flex-1 -mt-6')}>
        <Swiper
          ref={swipeRef}
          containerStyle={{backgroundColor: 'transparent'}}
          cards={profiles}
          renderCard={renderCard}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          onSwipedLeft={onSwipedLeft}
          onSwipedRight={onSwipedRight}
          backgroundColor={'#4FD0E9'}
          overlayLabels={overlayLabels}
        />
      </View>
      <ActionCardBlock onPressPass={onPressPass} onPressMatch={onPressMatch} />
    </SafeAreaView>
  );
};

export default HomeScreen;

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from '@firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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
import {
  generateId,
  mapMatchUserToUser,
  mapUserToMatchUser,
} from '../../utils/match-utils';
import {MatchUser, User} from './typings';

const HomeScreen = (): JSX.Element => {
  const {user} = useAuth();

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [profiles, setProfiles] = useState<MatchUser[]>([]);

  const swipeRef = useRef<Swiper<MatchUser>>(null);

  const handleSwipe = async (
    userSwiped: MatchUser,
    position: 'left' | 'right',
  ) => {
    await setDoc(
      doc(
        db,
        'users',
        user?.uid ?? '',
        position === 'left' ? 'passes' : 'swipes',
        userSwiped.id.toString(),
      ),
      userSwiped,
    );
  };

  const handleMatch = async (
    userId: string,
    userSwipedId: string,
    loggedInProfile: User,
    userSwiped: User,
  ) => {
    //Create Match
    await setDoc(doc(db, 'matches', generateId(userId, userSwipedId)), {
      users: {
        [userId]: loggedInProfile,
        [userSwipedId]: userSwiped,
      },
      usersMatched: [userId, userSwipedId],
      timestamp: serverTimestamp(),
    });
  };

  const onSwipedLeft = async (cardIndex: number): Promise<void> => {
    const userSwiped: MatchUser | undefined = profiles.find(
      (_, idx) => cardIndex === idx,
    );

    if (!userSwiped) {
      return;
    }

    await handleSwipe(userSwiped, 'left');
  };

  const onSwipedRight = async (cardIndex: number): Promise<void> => {
    const userSwiped: MatchUser | undefined = profiles.find(
      (_, idx) => cardIndex === idx,
    );

    if (!userSwiped) {
      return;
    }
    // getInformation about the user
    const loggedInProfile = await (
      await getDoc(doc(db, 'users', user?.uid ?? ''))
    ).data();
    // Check if user swiped on you

    getDoc(doc(db, 'users', userSwiped.id ?? 'swipes', user?.uid ?? '')).then(
      async snapshot => {
        const userSwipedMatched = snapshot.exists();

        if (userSwipedMatched) {
          await handleSwipe(userSwiped, 'right');
          // Create a match
          await handleMatch(
            user?.uid ?? '',
            userSwiped.id,
            loggedInProfile as User,
            mapMatchUserToUser(userSwiped),
          );

          navigation.navigate(RootStackRouteNames.UserMatchModal, {
            loggedInProfile: loggedInProfile as User,
            swipedUser: mapMatchUserToUser(userSwiped),
          });
        } else {
          //First match interaction started by logged-in user
          await handleSwipe(userSwiped, 'right');
        }
      },
    );
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

  const getCollectionIds = useCallback(
    (collectionName: string): Promise<string[]> => {
      return getDocs(
        collection(db, 'users', user?.uid ?? '', collectionName),
      ).then(snapshot => snapshot.docs.map(document => document.id));
    },
    [user?.uid],
  );

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      const passes: string[] = await getCollectionIds('passes');
      const passedUserIds = passes.length > 0 ? passes : ['undefined'];
      const swipes: string[] = await getCollectionIds('swipes');
      const swipedUserIds = swipes.length > 0 ? swipes : ['undefined'];

      unsub = onSnapshot(
        query(
          collection(db, 'users'),
          where('id', 'not-in', [...passedUserIds, ...swipedUserIds]),
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
  }, [user?.uid, getCollectionIds]);

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

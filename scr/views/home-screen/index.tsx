import React, {useRef} from 'react';
import {SafeAreaView, View} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import tw from 'tailwind-rn';

import ActionCardBlock from '../../components/molecules/action-card-block';
import CardItem from '../../components/organisms/cardItem';
import Header from '../../components/organisms/header';
import useAuth from '../../hooks/useAuth';
import {mockedMatchUsers} from './__data__/mocks';
import {MatchUser} from './typings';

const HomeScreen = (): JSX.Element => {
  const {user} = useAuth();

  const swipeRef = useRef<Swiper<MatchUser>>(null);

  const onSwipedLeft = (cardIndex: number): void => {
    console.log('Swipe pass= ', cardIndex);
  };

  const onSwipedRight = (cardIndex: number): void => {
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
    return <CardItem user={card} />;
  };

  return (
    <SafeAreaView style={tw('flex-1')}>
      <Header photoUrl={user?.photoURL} />
      <View style={tw('flex-1 -mt-6')}>
        <Swiper
          ref={swipeRef}
          containerStyle={{backgroundColor: 'transparent'}}
          cards={mockedMatchUsers}
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

import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import tw from 'tailwind-rn';

import CardItem from '../../components/organisms/cardItem';
import Header from '../../components/organisms/header';
import useAuth from '../../hooks/useAuth';
import {mockedMatchUsers} from './__data__/mocks';
import {MatchUser} from './typings';

const HomeScreen = (): JSX.Element => {
  const {user} = useAuth();

  const renderCard = (card: MatchUser): JSX.Element => {
    return <CardItem user={card} />;
  };

  return (
    <SafeAreaView style={tw('flex-1')}>
      <Header photoUrl={user?.photoURL} />
      <View style={tw('flex-1 -mt-6')}>
        <Swiper
          containerStyle={{backgroundColor: 'transparent'}}
          cards={mockedMatchUsers}
          renderCard={renderCard}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          overlayLabels={{
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
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

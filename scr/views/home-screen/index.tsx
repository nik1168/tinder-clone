import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-rn';

import useAuth from '../../hooks/useAuth';
import {RootStackParams, RootStackRouteNames} from '../../navigation/typings';
import {mockedMatchUsers} from './__data__/mocks';
import {MatchUser} from './typings';

const HomeScreen = (): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {user} = useAuth();

  const onPressChat = () => {
    navigation.navigate(RootStackRouteNames.Chat);
  };

  const renderCard = (card: MatchUser): JSX.Element => {
    return (
      <View key={card.id} style={tw('relative bg-white h-3/4 rounded-xl')}>
        <Image
          style={tw('absolute top-0 h-full w-full rounded-xl')}
          source={{uri: card.photoUrl}}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={tw('flex-1')}>
      {/*Header*/}
      <View style={tw('flex-row items-center justify-between px-5')}>
        <TouchableOpacity>
          <Image
            style={tw('h-10 w-10 rounded-full')}
            source={{uri: user?.photoURL ?? ''}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={tw('h-14 w-14')}
            source={require('../../assets/images/tinder.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressChat}>
          <Icon name="chatbubbles-sharp" size={30} color={'#FF5864'} />
        </TouchableOpacity>
      </View>
      {/*Header*/}
      {/*Cards*/}
      <View style={tw('flex-1 -mt-6')}>
        <Swiper
          containerStyle={{backgroundColor: 'transparent'}}
          cards={mockedMatchUsers}
          renderCard={renderCard}
        />
      </View>

      {/*Cards*/}
    </SafeAreaView>
  );
};

export default HomeScreen;

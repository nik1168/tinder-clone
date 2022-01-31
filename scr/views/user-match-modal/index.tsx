import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import tw from 'tailwind-rn';

import {RootStackParams, RootStackRouteNames} from '../../navigation/typings';

const UserMatchModal = (): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {params} =
    useRoute<RouteProp<RootStackParams, RootStackRouteNames.UserMatchModal>>();
  const {loggedInProfile, swipedUser} = params;

  const handleOnSendMessage = (): void => {
    navigation.goBack();
    navigation.navigate(RootStackRouteNames.Chat);
  };

  return (
    <View style={[tw('h-full bg-red-500 pt-20'), {opacity: 0.99}]}>
      <View style={tw('justify-center px-10 pt-20')}>
        <Image
          style={tw('h-20 w-full')}
          source={{uri: 'https://links.papareact.com/mg9'}}
        />
      </View>
      <Text style={tw('justify-center px-10 pt-20')}>
        You and {swipedUser.displayName} have liked each other.
      </Text>
      <View style={tw('flex-row justify-evenly mt-5')}>
        <Image
          style={tw('h-32 w-32 rounded-full')}
          source={{uri: loggedInProfile.photoURL}}
        />
        <Image
          style={tw('h-32 w-32 rounded-full')}
          source={{uri: swipedUser.photoURL}}
        />
      </View>
      <TouchableOpacity
        style={tw('bg-white m-5 px-10 py-8 rounded-full mt-20')}
        onPress={handleOnSendMessage}>
        <Text style={tw('text-center')}>Send a message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserMatchModal;

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Button, Text, View} from 'react-native';

import {RootStackParams, RootStackRouteNames} from '../../navigation/typings';
import useAuth from '../../hooks/useAuth';

const HomeScreen = (): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {signOut} = useAuth();

  const onPress = () => {
    navigation.navigate(RootStackRouteNames.Chat);
  };

  return (
    <View>
      <Text>I am the home screen</Text>
      <Button onPress={onPress} title={'go to chat screen'} />
      <Button onPress={signOut} title={'Sign out'} />
    </View>
  );
};

export default HomeScreen;

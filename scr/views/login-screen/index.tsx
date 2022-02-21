import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import tw from 'tailwind-rn';

import useAuth from '../../hooks/useAuth';
import {RootStackParams, RootStackRouteNames} from '../../navigation/typings';

const LoginScreen = (): JSX.Element => {
  const {signInWithGoogle} = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const createAccount = () => {
    navigation.navigate(RootStackRouteNames.UserSignUpModal);
  };

  return (
    <View style={tw('flex-1')}>
      <ImageBackground
        resizeMode={'cover'}
        style={tw('flex-1')}
        source={{
          uri: 'https://tinder.com/static/tinder.png',
        }}>
        <TouchableOpacity
          style={[
            tw('absolute bottom-40 w-52 bg-white p-4 rounded-2xl'),
            {marginHorizontal: '25%'},
          ]}
          onPress={signInWithGoogle}
          accessibilityRole={'button'}
          accessibilityLabel={'signIn'}
          testID={'signIn'}>
          <Text style={tw('text-center font-semibold')}>
            Sign in & get swapping
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw('absolute bottom-20 w-52 bg-white p-4 rounded-2xl'),
            {marginHorizontal: '25%'},
          ]}
          onPress={createAccount}
          accessibilityRole={'button'}
          accessibilityLabel={'signIn'}
          testID={'signIn'}>
          <Text style={tw('text-center font-semibold')}>Create account</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

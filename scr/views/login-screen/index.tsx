import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import tw from 'tailwind-rn';

import useAuth from '../../hooks/useAuth';

const LoginScreen = (): JSX.Element => {
  const {signInWithGoogle} = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

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
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

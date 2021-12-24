import React from 'react';
import {Button, Text, View} from 'react-native';

import useAuth from '../../hooks/useAuth';

const LoginScreen = (): JSX.Element => {
  const {signInWithGoogle} = useAuth();

  return (
    <View>
      <Text>Login to the app</Text>
      <Button title={'login'} onPress={signInWithGoogle} />
    </View>
  );
};

export default LoginScreen;

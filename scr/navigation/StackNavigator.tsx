import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import useAuth from '../hooks/useAuth';
import ChatScreen from '../views/chat-screen';
import HomeScreen from '../views/home-screen';
import LoginScreen from '../views/login-screen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const {user} = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;

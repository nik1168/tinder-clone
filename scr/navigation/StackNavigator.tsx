import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import useAuth from '../hooks/useAuth';
import ChatScreen from '../views/chat-screen';
import HomeScreen from '../views/home-screen';
import LoginScreen from '../views/login-screen';
import MessagesScreen from '../views/messages-screen';
import UserInfoModal from '../views/user-info-modal';
import UserMatchModal from '../views/user-match-modal';
import UserSignUpModal from '../views/user-sign-up-modal';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const {user} = useAuth();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Messaging" component={MessagesScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen name="UserInfoModal" component={UserInfoModal} />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
            <Stack.Screen name="UserMatchModal" component={UserMatchModal} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen name="UserSignUpModal" component={UserSignUpModal} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;

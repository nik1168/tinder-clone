import {
  NavigationContainer,
  NavigationContext,
  NavigationProp,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {ComponentType, FC, ReactNode} from 'react';

import fakeNavigation from './navigation';

const Stack = createStackNavigator();

const MockedNavigator: FC<{
  component?: ComponentType<any>;
  children?: ReactNode;
  navigation?: NavigationProp<Record<string, object | undefined>>;
  params?: object;
  props?: any;
  name?: string;
}> = ({
  component: Component,
  children,
  params = {},
  navigation = fakeNavigation,
  props = {},
  name = 'MockedScreen',
}): JSX.Element => {
  // https://github.com/react-navigation/react-navigation/issues/8517#issuecomment-663838298
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={name} initialParams={params}>
          {(): JSX.Element => (
            <NavigationContext.Provider value={navigation}>
              {Component ? <Component {...props} /> : children}
            </NavigationContext.Provider>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MockedNavigator;

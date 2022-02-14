import {NavigationContainer} from '@react-navigation/native';
import {render} from '@testing-library/react-native';
import React from 'react';

import {fakeUser} from '../../hooks/__data__/mocks';
import * as hooks from '../../hooks/useAuth';
import StackNavigator from '../StackNavigator';

describe('Stack navigator', (): void => {
  test('should render login page if no user is authenticated', async (): Promise<void> => {
    const component = render(
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>,
    );

    expect(component.getByText('Sign in & get swapping')).toBeTruthy();
  });

  test('should render home page if there is a user', async (): Promise<void> => {
    jest.spyOn(hooks, 'default').mockReturnValue({user: fakeUser});
    const component = render(
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>,
    );

    expect(component.getByTestId('home-container')).toBeTruthy();
  });
});

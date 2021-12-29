import {render} from '@testing-library/react-native';
import React from 'react';

import MockedNavigator from '../../../navigation/__mocks__';
import LoginScreen from '../index';

describe('Login Screen', (): void => {
  test('should render', async (): Promise<void> => {
    const component = render(
      <MockedNavigator>
        <LoginScreen />
      </MockedNavigator>,
    );

    expect(component.getByText('Sign in & get swapping')).toBeTruthy();
  });
});

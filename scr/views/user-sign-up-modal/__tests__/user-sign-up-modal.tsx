import {render} from '@testing-library/react-native';
import React from 'react';

import MockedNavigator from '../../../navigation/__mocks__';
import UserSignUpModal from '../index';

describe('User sign up modal', (): void => {
  test('should render', async (): Promise<void> => {
    const component = render(
      <MockedNavigator>
        <UserSignUpModal />
      </MockedNavigator>,
    );

    expect(component.getByText('Step-1: Your Name')).toBeTruthy();
    expect(component.getByText('Step-2: Your email')).toBeTruthy();
    expect(component.getByText('Step-3: Your Password')).toBeTruthy();
  });
});

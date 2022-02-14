import {render} from '@testing-library/react-native';
import React from 'react';

import {fakeUser} from '../../../hooks/__data__/mocks';
import * as hooks from '../../../hooks/useAuth';
import MockedNavigator from '../../../navigation/__mocks__';
import UserInfoModal from '../index';

describe('User info modal', (): void => {
  test('should render', async (): Promise<void> => {
    jest.spyOn(hooks, 'default').mockReturnValue({user: fakeUser});
    const component = render(
      <MockedNavigator>
        <UserInfoModal />
      </MockedNavigator>,
    );

    expect(component.getByText('Welcome niko')).toBeTruthy();
    expect(component.getByText('Step-1: The profile Pic')).toBeTruthy();
    expect(component.getByText('Step-2: The Job')).toBeTruthy();
    expect(component.getByText('Step-3: The age')).toBeTruthy();
  });
});

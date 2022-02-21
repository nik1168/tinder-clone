import {render} from '@testing-library/react-native';
import React from 'react';

import {fakeUser} from '../../../hooks/__data__/mocks';
import * as hooks from '../../../hooks/useAuth';
import MockedNavigator from '../../../navigation/__mocks__';
import HomeScreen from '../index';

describe('Home Screen', (): void => {
  test('should render', async (): Promise<void> => {
    jest.spyOn(hooks, 'default').mockReturnValue({user: fakeUser});
    const component = render(
      <MockedNavigator>
        <HomeScreen />
      </MockedNavigator>,
    );

    expect(component).toBeTruthy();
  });
});

import {render} from '@testing-library/react-native';
import React from 'react';

import MockedNavigator from '../../../navigation/__mocks__';
import HomeScreen from '../index';

describe('Home Screen', (): void => {
  test('should render', async (): Promise<void> => {
    const component = render(
      <MockedNavigator>
        <HomeScreen />
      </MockedNavigator>,
    );

    expect(component).toBeTruthy();
  });
});

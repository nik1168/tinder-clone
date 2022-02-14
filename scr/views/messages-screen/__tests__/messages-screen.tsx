import {render} from '@testing-library/react-native';
import React from 'react';

import MockedNavigator from '../../../navigation/__mocks__';
import MessagesScreen from '../index';

describe('Message Screen', (): void => {
  test('should render', async (): Promise<void> => {
    const component = render(
      <MockedNavigator>
        <MessagesScreen />
      </MockedNavigator>,
    );

    expect(component).toBeTruthy();
  });
});

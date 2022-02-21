import {render} from '@testing-library/react-native';
import React from 'react';

import {fakeUser} from '../../../hooks/__data__/mocks';
import * as hooks from '../../../hooks/useAuth';
import MockedNavigator from '../../../navigation/__mocks__';
import ChatScreen from '../index';

describe('Chat Screen', (): void => {
  test('should render', async (): Promise<void> => {
    jest.spyOn(hooks, 'default').mockReturnValue({user: fakeUser});
    const component = render(
      <MockedNavigator>
        <ChatScreen />
      </MockedNavigator>,
    );

    expect(component.getByText('Chat')).toBeTruthy();
  });
});

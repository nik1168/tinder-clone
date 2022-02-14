import {render} from '@testing-library/react-native';
import React from 'react';

import {fakeUser} from '../../../../hooks/__data__/mocks';
import * as hooks from '../../../../hooks/useAuth';
import MockedNavigator from '../../../../navigation/__mocks__';
import {mockedUserNicole} from '../../../../views/home-screen/__data__/mocks';
import ChatItem from '..';

describe('Chat Item', (): void => {
  test('should render', async (): Promise<void> => {
    jest.spyOn(hooks, 'default').mockReturnValue({user: fakeUser});
    const component = render(
      <MockedNavigator>
        <ChatItem matchDetails={{6961154: mockedUserNicole}} />
      </MockedNavigator>,
    );

    expect(component.getByText('Say Hi')).toBeTruthy();
  });
});

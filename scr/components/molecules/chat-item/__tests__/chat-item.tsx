import {render} from '@testing-library/react-native';
import React from 'react';

import {fakeUser} from '../../../../hooks/__data__/mocks';
import * as hooks from '../../../../hooks/useAuth';
import MockedNavigator from '../../../../navigation/__mocks__';
import {mockedUserNicole} from '../../../../views/home-screen/__data__/mocks';
import {UserMatch} from '../../../organisms/chat-list/typings';
import ChatItem from '..';

describe('Chat Item', (): void => {
  test('should render', async (): Promise<void> => {
    jest.spyOn(hooks, 'default').mockReturnValue({user: fakeUser});
    const matchDetails: UserMatch = {
      id: '12',
      users: {6961154: mockedUserNicole},
    };
    const component = render(
      <MockedNavigator>
        <ChatItem matchDetails={matchDetails} />
      </MockedNavigator>,
    );

    expect(component.getByText('Say Hi')).toBeTruthy();
  });
});

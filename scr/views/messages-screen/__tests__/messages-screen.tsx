import {render} from '@testing-library/react-native';
import React from 'react';

import {UserMatch} from '../../../components/organisms/chat-list/typings';
import MockedNavigator from '../../../navigation/__mocks__';
import {mockedUserNicole} from '../../home-screen/__data__/mocks';
import MessagesScreen from '../index';

describe('Message Screen', (): void => {
  test('should render', async (): Promise<void> => {
    const userMatch: UserMatch = {
      id: '12',
      users: {6961154: mockedUserNicole},
    };
    const component = render(
      <MockedNavigator
        name="MessagesScreen"
        component={MessagesScreen}
        params={{userMatch}}
      />,
    );

    expect(component).toBeTruthy();
  });
});

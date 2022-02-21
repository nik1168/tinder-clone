import {render} from '@testing-library/react-native';
import React from 'react';

import {fakeReceiverMessage} from '../../../../views/messages-screen/__data__/mock';
import ReceiverMessage from '..';

describe('Receiver Message', (): void => {
  test('should render', async (): Promise<void> => {
    const component = render(<ReceiverMessage message={fakeReceiverMessage} />);

    expect(component.getByText('Hello Nik')).toBeTruthy();
  });
});

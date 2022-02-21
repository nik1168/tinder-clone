import {render} from '@testing-library/react-native';
import React from 'react';

import {fakeSenderMessage} from '../../../../views/messages-screen/__data__/mock';
import SenderMessage from '..';

describe('SenderMessage', (): void => {
  test('should render', async (): Promise<void> => {
    const component = render(<SenderMessage message={fakeSenderMessage} />);

    expect(component.getByText('Hi there')).toBeTruthy();
  });
});

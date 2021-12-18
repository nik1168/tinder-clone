import {render} from '@testing-library/react-native';
import React from 'react';

import ChatScreen from '../index';

describe('Chat Screen', (): void => {
  test('should render', async (): Promise<void> => {
    const component = render(<ChatScreen />);

    expect(component.getByText('I am the chat screen')).toBeTruthy();
  });
});

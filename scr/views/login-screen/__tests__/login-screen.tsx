import {render} from '@testing-library/react-native';
import React from 'react';

import LoginScreen from '../index';

describe('Login Screen', (): void => {
  test('should render', async (): Promise<void> => {
    const component = render(<LoginScreen />);

    expect(component.getByText('Login to the app')).toBeTruthy();
  });
});

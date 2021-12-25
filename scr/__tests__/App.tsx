import {render} from '@testing-library/react-native';
import React from 'react';

import App from '../App';

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    signIn: jest.fn().mockReturnValue({idToken: ''}),
  },
}));
describe('<App />', (): void => {
  it('renders', async (): Promise<void> => {
    const component = render(<App />);

    expect(component).toBeTruthy();
  });
});

import {render} from '@testing-library/react-native';
import React from 'react';

import {fakeUser} from '../../../hooks/__data__/mocks';
import * as hooks from '../../../hooks/useAuth';
import UserMatchModal from '../index';

describe('User match modal', (): void => {
  test('should render', async (): Promise<void> => {
    jest.spyOn(hooks, 'default').mockReturnValue({user: fakeUser});
    const component = render(<UserMatchModal />);

    expect(component).toBeTruthy();
  });
});

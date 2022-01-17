import {render} from '@testing-library/react-native';
import React from 'react';

import {mockedUserNik} from '../../../../views/home-screen/__data__/mocks';
import CardItem from '..';

describe('CardItem', (): void => {
  test('should render', async (): Promise<void> => {
    const component = render(<CardItem user={mockedUserNik} />);

    expect(component.getByText('Niklaus Geisser')).toBeTruthy();
  });
});

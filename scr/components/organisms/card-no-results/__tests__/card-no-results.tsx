import {render} from '@testing-library/react-native';
import React from 'react';

import CardNoResults from '..';

describe('CardNoResults', (): void => {
  test('should render', async (): Promise<void> => {
    const component = render(<CardNoResults />);

    expect(component.getByText('No More Profiles')).toBeTruthy();
  });
});

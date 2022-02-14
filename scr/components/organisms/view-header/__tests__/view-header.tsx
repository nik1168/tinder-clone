import {render} from '@testing-library/react-native';
import React from 'react';

import MockedNavigator from '../../../../navigation/__mocks__';
import Header from '..';

describe('View Header', (): void => {
  test('should render', async (): Promise<void> => {
    const component = render(
      <MockedNavigator>
        <Header title={'Header'} />
      </MockedNavigator>,
    );

    expect(component.getByText('Header')).toBeTruthy();
  });
});

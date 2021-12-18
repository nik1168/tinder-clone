import React from 'react';

// eslint-disable-next-line import/extensions
import fakeNavigation from '../../src/navigation/__mocks__/navigation';

module.exports = {
  withNavigation: Component => props =>
    <Component navigation={fakeNavigation} {...props} />,
  SafeAreaView: ({children}) => <>{children}</>,
};

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {AuthProvider} from './hooks/useAuth';
import StackNavigator from './navigation/StackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;

import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';

import ViewHeader from '../../components/organisms/view-header';
import {RootStackParams, RootStackRouteNames} from '../../navigation/typings';

const MessagesScreen = (): JSX.Element => {
  const {params} =
    useRoute<RouteProp<RootStackParams, RootStackRouteNames.Messaging>>();
  const {userMatch} = params;

  return (
    <SafeAreaView>
      <ViewHeader title={userMatch?.displayName} callEnabled />
    </SafeAreaView>
  );
};

export default MessagesScreen;

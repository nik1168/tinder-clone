import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-rn';

import {RootStackParams} from '../../../navigation/typings';
import {ViewHeaderProps} from './typings';

const ViewHeader: FC<ViewHeaderProps> = ({title, callEnabled}): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <View style={tw('flex-row p-2 items-center justify-between')}>
      <View style={tw('flex flex-row items-center')}>
        <TouchableOpacity style={tw('p-2')} onPress={onPressBack}>
          <Icon name={'chevron-back-outline'} size={34} color={'#FF5864'} />
        </TouchableOpacity>
        <Text style={tw('text-2xl font-bold pl-2')}>{title}</Text>
      </View>
      {callEnabled ? (
        <TouchableOpacity style={tw('rounded-full mr-4 p-3 bg-red-200')}>
          <Foundation name={'telephone'} size={20} color={'red'} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ViewHeader;

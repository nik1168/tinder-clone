import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import tw from 'tailwind-rn';

import {ActionCardBlockProps} from './typings';

const ActionCardBlock: FC<ActionCardBlockProps> = ({
  onPressPass,
  onPressMatch,
}): JSX.Element => {
  return (
    <View style={tw('flex flex-row justify-evenly')}>
      <TouchableOpacity
        style={tw(
          'items-center justify-center rounded-full w-16 h-16 bg-red-200',
        )}
        onPress={onPressPass}>
        <Entypo name={'cross'} size={24} color={'red'} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressMatch}
        style={tw(
          'items-center justify-center rounded-full w-16 h-16 bg-green-200',
        )}>
        <AntDesign name={'heart'} size={24} color={'green'} />
      </TouchableOpacity>
    </View>
  );
};

export default ActionCardBlock;

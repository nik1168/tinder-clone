import React, {FC} from 'react';
import {Text, View} from 'react-native';
import tw from 'tailwind-rn';

import {ReceiverMessageProps} from '../receiver-message/typings';

const SenderMessage: FC<ReceiverMessageProps> = ({message}): JSX.Element => {
  return (
    <View
      style={[
        tw('bg-purple-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2'),
        {alignSelf: 'flex-start', marginLeft: 'auto'},
      ]}>
      <Text style={tw('text-white')}>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;

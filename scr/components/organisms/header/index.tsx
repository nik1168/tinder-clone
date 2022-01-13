import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-rn';

import {
  RootStackParams,
  RootStackRouteNames,
} from '../../../navigation/typings';
import {HeaderProps} from './typings';

const Header: FC<HeaderProps> = ({photoUrl}): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const onPressChat = () => {
    navigation.navigate(RootStackRouteNames.Chat);
  };

  return (
    <View style={tw('flex-row items-center justify-between px-5')}>
      <TouchableOpacity>
        <Image
          style={tw('h-10 w-10 rounded-full')}
          source={{uri: photoUrl ?? ''}}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={tw('h-14 w-14')}
          source={require('../../../assets/images/tinder.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressChat}>
        <Icon name="chatbubbles-sharp" size={30} color={'#FF5864'} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

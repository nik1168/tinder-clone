import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-rn';

import useAuth from '../../hooks/useAuth';
import {RootStackParams, RootStackRouteNames} from '../../navigation/typings';

const HomeScreen = (): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {user} = useAuth();

  const onPressChat = () => {
    navigation.navigate(RootStackRouteNames.Chat);
  };

  return (
    <SafeAreaView>
      {/*Header*/}
      <View style={tw('flex-row items-center justify-between px-5')}>
        <TouchableOpacity>
          <Image
            style={tw('h-10 w-10 rounded-full')}
            source={{uri: user?.photoURL ?? ''}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={tw('h-14 w-14')}
            source={require('../../assets/images/tinder.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressChat}>
          <Icon name="chatbubbles-sharp" size={30} color={'#FF5864'} />
        </TouchableOpacity>
      </View>

      {/*Header*/}
      {/*<Text>I am the home screen</Text>*/}
      {/*<Button onPress={onPress} title={'go to chat screen'} />*/}
      {/*<Button onPress={signOut} title={'Sign out'} />*/}
    </SafeAreaView>
  );
};

export default HomeScreen;

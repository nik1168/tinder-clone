import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import tw from 'tailwind-rn';

const ChatScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={tw('flex-1')}>
      <View style={tw('flex-1 items-center justify-center')}>
        <Text>I am the chat screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

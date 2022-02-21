import React, {FC} from 'react';
import {FlatList, Text, View} from 'react-native';
import tw from 'tailwind-rn';

import ChatItem from '../../molecules/chat-item';
import {ChatListProps} from './typings';

const ChatList: FC<ChatListProps> = ({usersMatched}): JSX.Element => {
  return (
    <>
      {usersMatched ? (
        <>
          {usersMatched.length ? (
            <FlatList
              style={tw('h-full')}
              data={usersMatched}
              keyExtractor={item => item.id}
              renderItem={({item}) => <ChatItem matchDetails={item} />}
            />
          ) : (
            <View style={tw('p-5')}>
              <Text style={tw('text-center text-lg')}>
                No matches at the moment 😣
              </Text>
            </View>
          )}
        </>
      ) : null}
    </>
  );
};

export default ChatList;

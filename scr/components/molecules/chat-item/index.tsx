import {collection, onSnapshot, orderBy, query} from '@firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import tw from 'tailwind-rn';

import {db} from '../../../../firebase';
import useAuth from '../../../hooks/useAuth';
import {
  RootStackParams,
  RootStackRouteNames,
} from '../../../navigation/typings';
import {getMatchedUserInfo} from '../../../utils/match-utils';
import {User} from '../../../views/home-screen/typings';
import {Message} from '../../../views/messages-screen/typings';
import {ChatItemProps} from './typings';

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

const ChatItem: FC<ChatItemProps> = ({matchDetails}): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [matchedUserInfo, setMatchedUserInfo] = useState<User | null>(null);
  const [lastMessage, setLastMessage] = useState<string | undefined>(undefined);

  const {user} = useAuth();

  const onChatPress = (): void => {
    if (matchedUserInfo) {
      navigation.navigate(RootStackRouteNames.Messaging, {
        userMatch: matchDetails,
      });
    }
  };

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user?.uid ?? ''));
  }, [matchDetails, user?.uid]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'matches', matchDetails.id, 'messages'),
          orderBy('timestamp', 'desc'),
        ),
        snapshot => {
          const docs = snapshot.docs;

          if (docs.length > 0) {
            const message = docs[0].data() as Message;

            setLastMessage(message?.message);
          }
        },
      ),
    [matchDetails.id],
  );

  return (
    <TouchableOpacity
      onPress={onChatPress}
      style={[
        tw('flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg'),
        styles.cardShadow,
      ]}>
      <Image
        style={tw('rounded-full h-16 w-16 mr-4')}
        source={{uri: matchedUserInfo?.photoURL}}
      />
      <View>
        <Text style={tw('text-lg font-semibold')}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage ?? 'Say Hi'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;

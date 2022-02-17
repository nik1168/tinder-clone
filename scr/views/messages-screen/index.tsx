import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from '@firebase/firestore';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import tw from 'tailwind-rn';

import {db} from '../../../firebase';
import ReceiverMessage from '../../components/molecules/receiver-message';
import SenderMessage from '../../components/molecules/sender-message';
import ViewHeader from '../../components/organisms/view-header';
import useAuth from '../../hooks/useAuth';
import {RootStackParams, RootStackRouteNames} from '../../navigation/typings';
import {getMatchedUserInfo} from '../../utils/match-utils';
import {Message} from './typings';

const MessagesScreen = (): JSX.Element => {
  const {params} =
    useRoute<RouteProp<RootStackParams, RootStackRouteNames.Messaging>>();
  const {userMatch} = params;

  const {user} = useAuth();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'matches', userMatch.id, 'messages'),
          orderBy('timestamp', 'desc'),
        ),
        snapshot => {
          const messagesData: Message[] = snapshot.docs.map(doc => {
            const data = doc.data() as Message;

            return {
              id: doc.id,
              userId: data.userId,
              message: data.message,
              photoURL: data.photoURL,
            };
          });

          setMessages(messagesData);
        },
      ),
    [userMatch.id],
  );

  const sendMessage = async () => {
    await addDoc(collection(db, 'matches', userMatch.id, 'messages'), {
      timestamp: serverTimestamp(),
      userId: user?.uid,
      displayName: user?.displayName,
      photoURL: userMatch.users[user?.uid ?? '']?.photoURL,
      message: input,
    });
    setInput('');
  };

  return (
    <SafeAreaView style={tw('flex-1')}>
      <ViewHeader
        title={
          getMatchedUserInfo(userMatch.users, user?.uid ?? '')?.displayName
        }
        callEnabled
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw('flex-1')}
        keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
          <FlatList
            data={messages}
            style={tw('pl-4')}
            keyExtractor={item => item.id}
            renderItem={({item: message}) =>
              message.userId === user?.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
            inverted
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View
        style={tw(
          'flex-row justify-between items-center border-t border-gray-200 px-5 py-5',
        )}>
        <TextInput
          style={tw('h-10 text-lg')}
          placeholder={'Send Message'}
          onChangeText={setInput}
          value={input}
          onSubmitEditing={sendMessage}
        />
        <Button onPress={sendMessage} title={'send'} color={'#FF5864'} />
      </View>
    </SafeAreaView>
  );
};

export default MessagesScreen;

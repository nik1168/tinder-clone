import {collection, onSnapshot, query, where} from '@firebase/firestore';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';

import {db} from '../../../firebase';
import ChatList from '../../components/organisms/chat-list';
import {UserMatch} from '../../components/organisms/chat-list/typings';
import ViewHeader from '../../components/organisms/view-header';
import useAuth from '../../hooks/useAuth';

const ChatScreen = (): JSX.Element => {
  // we are going to fetch the matches here :)
  const [matches, setMatches] = useState<UserMatch[] | null>(null);

  const {user} = useAuth();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'matches'),
          where('usersMatched', 'array-contains', user?.uid),
        ),
        snapshot => {
          setMatches(
            snapshot.docs.map(doc => {
              const data = doc.data();

              return {
                id: doc.id,
                users: data.users,
              };
            }),
          );
        },
      ),
    [user?.uid],
  );

  return (
    <SafeAreaView>
      <ViewHeader title={'Chat'} />
      <ChatList usersMatched={matches} />
    </SafeAreaView>
  );
};

export default ChatScreen;

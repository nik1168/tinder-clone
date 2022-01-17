import {DocumentData, QueryDocumentSnapshot} from '@firebase/firestore';

import {MatchUser, User} from '../views/home-screen/typings';

export const mapUserToMatchUser = (
  document: QueryDocumentSnapshot<DocumentData>,
): MatchUser => {
  const mapUser: User = document.data() as User;
  const displayName = mapUser.displayName.split(' ');

  return {
    id: document.id,
    age: mapUser.age,
    firstName: displayName[0] ?? '',
    lastName: displayName[1] ?? '',
    photoUrl: mapUser.photoURL,
    occupation: mapUser.job,
  };
};

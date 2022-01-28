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

export const mapMatchUserToUser = (user: MatchUser): User => {
  return {
    id: user.id,
    displayName: user.firstName + user.lastName,
    age: user.age,
    job: user.occupation,
    photoURL: user.photoUrl,
  };
};

export const generateId = (id1: string, id2: string): string => {
  if (id1 > id2) {
    return id1 + id2;
  }

  return id2 + id1;
};

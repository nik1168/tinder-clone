import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const mockedUser = {
  email: 'niklaus@gmail.com',
  displayName: 'niko',
  uid: '1',
  providerId: '1',
  metadata: {},
};

export const fakeUser = mockedUser as unknown as FirebaseAuthTypes.User;

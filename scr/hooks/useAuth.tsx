import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {createContext, FC, useContext, useEffect} from 'react';

export interface AuthContextShape {
  user?: string | null;
  signInWithGoogle?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextShape>({});

export const AuthProvider: FC = ({children}): JSX.Element => {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '903015749708-mg00ffu80a3bb9jb3b4h4ua5itbptdsh.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);
  const signInWithGoogle = async () => {
    try {
      GoogleSignin.configure();
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(credential);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        // alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: null,
        signInWithGoogle,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export default function useAuth() {
  return useContext(AuthContext);
}

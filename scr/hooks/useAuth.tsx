import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Config from 'react-native-config';

export interface AuthContextShape {
  user?: FirebaseAuthTypes.User | null;
  signInWithGoogle?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextShape>({});

export const AuthProvider: FC = ({children}): JSX.Element => {
  const [errorAuth, setErrorAuth] = useState<string | null>(null);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  /* istanbul ignore next */
  const onAuthStateChanged = useCallback(
    (userAuth: FirebaseAuthTypes.User | null) => {
      if (userAuth) {
        setUser(userAuth);
      } else {
        // Not logged in
        setUser(null);
      }
      setLoadingInitial(false);
    },
    [],
  );
  const {FIRE_BASE_WEB_CLIENT_ID} = Config;

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId: FIRE_BASE_WEB_CLIENT_ID,
      offlineAccess: true,
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, [FIRE_BASE_WEB_CLIENT_ID, onAuthStateChanged]);

  /* istanbul ignore next */
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(credential);
    } catch (error: any) {
      setErrorAuth(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
      }}>
      {/*istanbul ignore next*/}
      {!loadingInitial ? children : null}
      {errorAuth ?? null}
    </AuthContext.Provider>
  );
};
export default function useAuth() {
  return useContext(AuthContext);
}

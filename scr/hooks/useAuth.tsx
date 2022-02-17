/* istanbul ignore file */
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Config from 'react-native-config';

export interface AuthContextShape {
  user?: FirebaseAuthTypes.User | null;
  signInWithGoogle?: () => Promise<void>;
  signInWithEmail?: (email: string, password: string) => Promise<void>;
  signOut?: () => Promise<void>;
  error?: string | null;
  loading?: boolean;
}

const AuthContext = createContext<AuthContextShape>({});

export const AuthProvider: FC = ({children}): JSX.Element => {
  const [errorAuth, setErrorAuth] = useState<string | null>(null);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onAuthStateChanged = useCallback(
    (userAuth: FirebaseAuthTypes.User | null) => {
      if (userAuth) {
        setUser(userAuth);
      } else {
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

    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  }, [FIRE_BASE_WEB_CLIENT_ID, onAuthStateChanged]);

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      setErrorAuth(error);
      throw new Error(error);
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(credential);
    } catch (error: any) {
      setErrorAuth(error);
    }
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => {});
    } catch (error: any) {
      setErrorAuth(error);
    }
    setLoading(false);
  };

  /**
   * We use useMemo here because if any of the values used in the context changes then the components that use the other ones
   * will have to rerender, that could be an expensive operation
   */
  const memoedContextState = useMemo(
    () => ({
      user,
      signInWithGoogle,
      error: errorAuth,
      loading,
      signOut,
      signInWithEmail,
    }),
    [errorAuth, user, loading],
  );

  return (
    <AuthContext.Provider value={memoedContextState}>
      {!loadingInitial ? children : null}
    </AuthContext.Provider>
  );
};
export default function useAuth() {
  return useContext(AuthContext);
}

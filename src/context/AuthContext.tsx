import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, provider, db, ref, set } from '../config/firebaseConfig.ts';

interface AuthContextType {
  user: User | null;
  signIn: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('No context');
  }
  return context;
};
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });
    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      throw error;
    }
  };

  const signUpWithEmail = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      const userRef = ref(db, 'users/' + userCredential.user.uid);
      await set(userRef, {
        uid: userCredential.user.uid,
        username: username,
        email: email,
      });

      console.log('Usuario registrado y datos guardados en Realtime Database');
    } catch (error) {
      throw error;
    }
  };

  const signIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const userRef = ref(db, 'users/' + userCredential.user.uid);
      await set(userRef, {
        uid: userCredential.user.uid,
        username: userCredential.user.email?.split('@')[0],
        email: userCredential.user.email,
      });
    } catch (error) {
      console.error('Error log in with Google', error);
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };
  return (
    <AuthContext.Provider
      value={{ user, signIn, signInWithEmail, signUpWithEmail, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

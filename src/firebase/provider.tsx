'use client';
import { createContext, useContext, ReactNode, useMemo } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { initializeFirebase } from './index';

interface FirebaseContextValue {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(undefined);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const { app, auth, firestore } = useMemo(initializeFirebase, []);

  return (
    <FirebaseContext.Provider value={{ app, auth, firestore }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = (): FirebaseContextValue => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useFirebaseApp = (): FirebaseApp | null => {
  return useFirebase().app;
};

export const useAuth = () => {
  return useFirebase();
};

export const useFirestore = () => {
  return useFirebase().firestore;
};

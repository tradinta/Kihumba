'use client';
import { useState, useEffect }from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useAuth } from '../provider';
import { useRouter } from 'next/navigation';

export function useUser() {
  const { auth } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const logout = async () => {
    if (!auth) return;
    await auth.signOut();
    router.push('/');
  };

  return { user, loading, logout };
}

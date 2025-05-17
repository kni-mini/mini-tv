'use client';

import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';
import React, { createContext, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>; // Updated login type
  logout: () => void;
  user: {
    email?: string | null;
    id?: string | null;
    name?: string | null;
    image?: string | null;
  } | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// New component to wrap AuthProvider logic that uses useSession
const AuthProviderContent = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== '/login') {
      // router.push('/login'); // Commented out to prevent premature redirection
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  const login = async (credentials: { email: string; password: string }) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    if (result?.error) {
      console.error('Login failed:', result.error);
      throw new Error(result.error);
    }

    if (result?.ok) {
      router.push('/admin');
    }
  };

  const logout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user: session?.user ?? null, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <AuthProviderContent>{children}</AuthProviderContent>
    </SessionProvider>
  );
};

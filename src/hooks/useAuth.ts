'use client';

import { useContext, useEffect } from 'react'; // Added useEffect
import { AuthContext } from '../context/AuthProvider';
import { useRouter } from 'next/navigation'; // Changed from redirect to useRouter

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useRequireAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  return { isAuthenticated, isLoading };
};

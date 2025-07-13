'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/sign-in?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
    }
  }, [status, router]);

  return {
    session,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
  };
}

'use client';

import { SignUpForm } from '@/components/auth/sign-up-form';
import { SessionProvider } from 'next-auth/react';
import { Suspense } from 'react';

export default function SignUpPage() {
  return (
    <div className="auth-container">
      <SessionProvider>
        <Suspense fallback={<div className="loading-text">Loading...</div>}>
          <SignUpForm />
        </Suspense>
      </SessionProvider>
    </div>
  );
}

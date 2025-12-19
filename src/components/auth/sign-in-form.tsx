'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export function SignInForm({ className, ...props }: React.ComponentProps<'form'>) {
  const { status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl');
  // Store the callbackUrl in state to prevent it from changing during navigation
  const [redirectUrl] = useState(callbackUrl || '/');

  useEffect(() => {
    // Only redirect if already authenticated
    if (status === 'authenticated') {
      console.log('Already authenticated, redirecting to:', redirectUrl);
      router.push(redirectUrl);
    }
  }, [status, router, redirectUrl]);

  useEffect(() => {
    if (callbackUrl) {
      const timer = setTimeout(() => {
        toast.info('You must be signed in to access this page');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    console.log('Attempting sign in with callback URL:', redirectUrl);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid email or password');
      } else {
        toast.success('Successfully logged in!');
        console.log('Sign-in successful, redirecting to:', redirectUrl);
        // Force redirect to the callbackUrl we stored
        router.push(redirectUrl);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/auth/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}

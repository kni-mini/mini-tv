'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { checkPasswordStrength } from '@/lib/validators/password-strength';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export function SignUpForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl');
  // Store the callbackUrl in state to prevent it from changing
  const [redirectUrl] = useState(callbackUrl || '/');

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('Already authenticated, redirecting to:', redirectUrl);
      router.push(redirectUrl);
    }
  }, [status, router, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const passwordValidation = checkPasswordStrength(password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.error!);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    console.log('Attempting registration with callback URL:', redirectUrl);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Registration failed');
        setIsLoading(false);
        return;
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Account created but login failed.');
      } else {
        toast.success('Account created and logged in!');
        console.log('Sign-up successful, redirecting to:', redirectUrl);
        // Force redirect to the stored callbackUrl
        router.push(redirectUrl);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create your account
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
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
            minLength={6}
          />
          {!checkPasswordStrength(password).isValid && password.length > 0 && (
            <p className="text-xs text-red-500">
              Password must be at least 6 characters long, contain one uppercase letter, one
              lowercase letter, and one special character.
            </p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            minLength={6}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/auth/sign-in" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </form>
  );
}

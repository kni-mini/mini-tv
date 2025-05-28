'use client';

import { AuthProvider } from '@/context/AuthProvider';
import React from 'react';

export default function MainGroupLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

// src/app/(admin)/page.tsx
'use client';

import React from 'react';
import { useRequireAuth, useAuth } from '../../../hooks/useAuth';
import Link from 'next/link';

export default function AdminPage() {
  useRequireAuth();
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        {user && <p className="text-gray-700">Welcome, {user.email}!</p>}
        <p className="text-gray-600">This is a protected admin page.</p>

        <div className="flex justify-center space-x-4">
          <Link
            href="/admin/scheduled-content"
            className="inline-block px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          >
            View Scheduled Content
          </Link>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

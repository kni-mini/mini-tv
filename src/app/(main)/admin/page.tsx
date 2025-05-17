'use client';

import React from 'react';
import { useRequireAuth, useAuth } from '../../../hooks/useAuth';

export default function AdminPage() {
  useRequireAuth(); // Protects this page
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>; // Or a proper loading spinner
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Admin Dashboard</h1>
        {user && <p className="text-gray-700 mb-2">Welcome, {user.email}!</p>}
        <p className="text-gray-600 mb-6">This is a protected admin page.</p>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

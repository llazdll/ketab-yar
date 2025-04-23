'use client'

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({
        callbackUrl: '/',
        redirect: true,
      })}
      className="mt-2 px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
    >
      Sign Out
    </button>
  );
}
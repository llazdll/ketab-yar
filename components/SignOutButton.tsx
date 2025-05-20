'use client'

import { signOut } from 'next-auth/react';
import { ReactNode } from 'react';

interface SignOutButtonProps {
  children?: ReactNode;
  callbackUrl?: string;
  className?: string;
}

export default function SignOutButton({
  children,
  callbackUrl = '/',
  className = 'mt-2 px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors'
}: SignOutButtonProps) {
  return (
    <button
      onClick={() => signOut({
        callbackUrl,
        redirect: true,
      })}
      className={className}
    >
      {children || 'Sign Out'} 
    </button>
  );
}
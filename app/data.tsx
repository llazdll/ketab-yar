import { auth, signOut } from '@/auth';
import Image from 'next/image';
import React from 'react';
import { SignOutButton } from './SignOutButton';
const Info = async () => {
  const session = await auth();


  return (
    <div className="p-4">
      <h2>{session?.user?.email}</h2>
      <h2>{session?.user?.id}</h2>
      <h2>{session?.user?.name}</h2>
      {session?.user?.image && (
        <Image 
          src={session.user.image} 
          alt="Profile picture" 
          width={72} 
          height={72} 
          className="rounded-full"
        />
      )}
      <button 
        onClick={SignOutButton}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Info
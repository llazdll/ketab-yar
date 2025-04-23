
import { auth } from '@/auth';
import Image from 'next/image';

import SignInButtons from '@/components/SignInButtons';
import  SignOutButton  from '@/components/SignOutButton';

async function userData() {

  const session = await auth();

  if (!session?.user) {
    return <SignInButtons />;
  }

  return (
    <div className="flex flex-col items-center mt-4 p-2">
      <Image
        src={session?.user?.image ?? '/default-avatar.png'}
        alt="User Profile"
        className="w-10 h-10 rounded-full"
        width={40}
        height={40}
      />
      <span className="mt-2 text-sm">{session.user.name}</span>
      <SignOutButton />
    </div>
    )
}
export default userData;
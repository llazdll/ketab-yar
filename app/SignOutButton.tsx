'use server';
import { signOut } from '@/auth';

export async function SignOutButton() {
    await signOut();
}
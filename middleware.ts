import { NextResponse } from "next/server";
import { auth } from "./auth";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  
  if (!session?.user) {
    const signInUrl = new URL('/api/auth/signin', request.url);
    // Add callback URL so user returns to the page they tried to access after signing in
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher:['/']
};
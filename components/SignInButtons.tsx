'use client'
import { doSocialLogin } from "@/app/action";
export default function SignInButtons() {
  return (
    <form action={doSocialLogin} className="flex flex-col gap-2 p-2">
      <button type="submit" value="google" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
        ثبت نام
      </button>
    </form>
  );
}
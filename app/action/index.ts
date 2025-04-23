'use server'
import { signIn,signOut } from "@/auth"
export async function doSocialLogin(formData: FormData) {
//   const email = formData.get('email') as string
//   const password = formData.get('password') as string
//   const result = await signIn({ email, password })
//   return result
const action = formData.get('action') as string
await signIn(action,{redirectTo:'/bookRequest'})
}
export async function doLogout() {
    await signOut({redirectTo:'/'})
}
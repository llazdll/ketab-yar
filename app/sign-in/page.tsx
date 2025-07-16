"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import img from '@/public/login.png'

const loginSchema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
})

const registerSchema = loginSchema.extend({
  name: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
  address: z.string().min(5, "آدرس باید حداقل ۵ کاراکتر باشد"),
  phone: z.string().regex(/^\d{11}$/, "شماره تلفن باید دقیقاً ۱۱ رقم باشد"),
  confirmPassword: z.string().min(6, "تأیید رمز عبور باید حداقل ۶ کاراکتر باشد"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "تأیید رمز عبور با رمز عبور مطابقت ندارد",
  path: ["confirmPassword"],
})

// Utility to filter phone input
const handlePhoneInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (value: string) => void
) => {
  const numericValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 11)
  onChange(numericValue)
}

// Login Form Component
function LoginForm({
  form,
  onSubmit,
}: {
  form: ReturnType<typeof useForm<any>>
  onSubmit: (data: any) => void
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit(onSubmit)(e)
          console.log("Submitting form...")
          console.log(e);
          
        }}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ایمیل</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رمز عبور</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="current-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-sm text-gray-500 underline cursor-pointer hover:text-primary">
          رمز عبور خود را فراموش کردم
        </p>
        <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
          ورود به حساب کاربری
        </Button>
      </form>
    </Form>
  )
}

// Register Form Component
function RegisterForm({
  form,
  onSubmit,
}: {
  form: ReturnType<typeof useForm<any>>
  onSubmit: (data: any) => void
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام کامل</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>آدرس</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  {...field}
                  onChange={(e) => handlePhoneInput(e, field.onChange)}
                  placeholder="09123456789"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رمز عبور</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تأیید رمز عبور</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-sm text-gray-500 underline cursor-pointer hover:text-primary">
          رمز عبور خود را فراموش کردم
        </p>
        <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
          ثبت‌نام
        </Button>
      </form>
    </Form>
  )
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", address: "", phone: "", confirmPassword: "" },
  })

  const onLogin = (data: any) => {
    console.log("Login:", data)
  }

  const onRegister = (data: any) => {
    console.log("Register:", data)
  }

  // Reset forms when toggling mode
  const toggleMode = () => {
    setIsLogin(!isLogin)
    if (isLogin) {
      registerForm.reset()
    } else {
      loginForm.reset()
    }
  }

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-[#f0faf8] p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
        {/* Image section */}
        <div className="relative hidden md:block">
          <Image
            src={img}
            alt="تصویر ورود کاربر"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form section */}
        <div className="p-8 w-full bg-[#f8e9d320] flex justify-between flex-col">
          <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
            <a href="/" className="underline hover:text-primary"> ⟵ بازگشت به صفحه اصلی </a>
            <button
              type="button"
              className="underline hover:text-primary"
              onClick={toggleMode}
            >
              {isLogin ? "حساب ندارید؟ ثبت‌نام" : "حساب دارید؟ ورود"}
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            {isLogin ? "ورود به حساب کاربری" : "ساخت حساب کاربری"}
          </h2>

          {isLogin ? (
            <LoginForm form={loginForm} onSubmit={onLogin} />
          ) : (
            <RegisterForm form={registerForm} onSubmit={onRegister} />
          )}
        </div>
      </div>
    </div>
  )
}
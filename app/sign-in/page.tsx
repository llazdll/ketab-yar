'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

// Zod schema with validations
const formSchema = z.object({
  firstName: z.string()
    .min(1, 'نام اجباری است')
    .regex(/^[^\d]+$/, 'نام نباید شامل عدد باشد'),
  lastName: z.string()
    .min(1, 'نام خانوادگی اجباری است')
    .regex(/^[^\d]+$/, 'نام خانوادگی نباید شامل عدد باشد'),
  age: z.string()
    .min(1, 'سن اجباری است')
    .regex(/^\d+$/, 'سن باید فقط شامل عدد باشد'),
  phone: z.string()
    .min(1, 'شماره تلفن اجباری است')
    .regex(/^\d+$/, 'شماره تلفن باید فقط شامل عدد باشد'),
  email: z.string()
    .email('ایمیل معتبر نیست'),
  address: z.string()
    .min(1, 'آدرس اجباری است'),
  city: z.string()
    .min(1, 'شهر اجباری است'),
  zip: z.string()
    .min(1, 'کد پستی اجباری است')
    .regex(/^\d+$/, 'کد پستی باید فقط شامل عدد باشد'),
  notify: z.boolean().optional()
})

type FormSchemaType = z.infer<typeof formSchema>

export default function UserForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      age: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      zip: '',
      notify: true
    }
  })

  const onSubmit = (data: FormSchemaType) => {
    console.log('Submitted values:', data)
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-red-600 mb-4 text-right">اطلاعات شخصی</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel className="text-red-500">نام *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="اسمت چیه؟"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[0-9]/g, '')
                      field.onChange(value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel className="text-red-500">نام خانوادگی *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="فامیلیت"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[0-9]/g, '')
                      field.onChange(value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Age */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel className="text-red-500">سن *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="چند سالته؟"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      field.onChange(value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel className="text-red-500">شماره تلفن *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="با چی بهت زنگ بزنیم"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      field.onChange(value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-full text-right">
                <FormLabel className="text-red-500">ایمیل *</FormLabel>
                <FormControl><Input {...field} placeholder="ایمیلی که توش @ داره..." /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-full text-right">
                <FormLabel className="text-red-500">آدرس *</FormLabel>
                <FormControl><Input {...field} placeholder="کجا بفرستیم کتاب رو؟" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Zip */}
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel className="text-red-500">کد پستی *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="کدی بزن"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      field.onChange(value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel className="text-red-500">شهر *</FormLabel>
                <FormControl><Input {...field} placeholder="محل سکونت" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Notify */}
          <FormField
            control={form.control}
            name="notify"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 col-span-full text-right">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>اگه می‌خوای از کتاب‌های جدیدمون با خبر بشی</FormLabel>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="col-span-full flex justify-end">
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded"
            >
              ثبت نهایی
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

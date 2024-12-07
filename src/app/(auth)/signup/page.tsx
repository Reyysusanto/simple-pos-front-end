"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthFooter, AuthHeader } from '@/app/component/Auth/Auth';
import React from 'react'
import { Form, FormItem, FormField, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { LoginSchema } from "../../../../schemas";
import Button from "@/app/component/Element/Button";
import { useRouter } from "next/navigation";


const SignUpPage = () => {
  const Router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>(
    {
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    }
  )

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log(data);
  }

  return (
    <div className='flex flex-col bg-white h-screen px-20 items-center justify-center'>
      <div className="flex flex-col bg-background px-9 py-8 rounded-xl border-2 border-gray-200 gap-y-4">
        <AuthHeader
          titleCard="Sign Up"
          description="Regist your account to start ordering"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        placeholder="johndoe@gmail.com"
                        {...field}
                        className="border border-gray-300 rounded-md p-2 w-full"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        placeholder="********"
                        {...field}
                        className="border border-gray-300 rounded-md p-2 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              customClass="text-white bg-green-500 hover:bg-green-600 border-2 border-green-500 w-full"
              buttonName="Sign Up"
              click={() => {
                Router.push('/menu_and_order')}}
            />
          </form>
        </Form>
        <AuthFooter
          Description="Already have an account?" 
          NavigateTo="signup"
          LinkTo="Login"
          linkToNavigate="login"
        />
      </div>
    </div>
  );
}
export default SignUpPage;
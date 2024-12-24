"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthFooter, AuthHeader } from "@/app/component/Auth/Auth";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Button from "@/app/component/Element/Button";
import { useRouter } from "next/navigation";
import { LoginSchema } from "../lib/schema";


interface User {
  email: string;
  password: string;
  [key: string]: unknown;
}

const Page = () => {
  const Router = useRouter();
  const [user, setUser] = useState<User[]>([]);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/users");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setUser(data);
      } catch(error) {
        console.error(error);
      }
    }
    fetchUser();
  }, [])

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    const matchingUser = user.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (matchingUser) {
      Router.push("/menu_and_order");
    } else {
      alert("Login Failed: Incorrect email or password");
    }
  };

  return (
    console.log(user),
    <div className="flex flex-col bg-white h-screen px-20 items-center justify-center">
      <div className="flex flex-col bg-background px-9 py-8 rounded-xl border-2 border-gray-200 gap-y-4">
        <AuthHeader
          titleCard="Login"
          description="Please login to your account"
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              buttonName="Login"
            />
          </form>
        </Form>
        <AuthFooter
          Description="Don't have an account?"
          NavigateTo="login"
          LinkTo="Sign Up"
          linkToNavigate="signup"
        />
      </div>
    </div>
  );
};
export default Page;

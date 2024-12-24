"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ActionResult } from "@/types";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useActionState } from "react";
import { Login } from "../lib/actions";
import Link from "next/link";

const initialState: ActionResult = {
  error: "",
};

const LoginForm = () => {
  const [state, formAction] = useActionState(Login, initialState);

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending} className="bg-green-500 w-full hover:bg-green-600">
        {pending ? "Loading..." : "Login"}
      </Button>
    );
  };

  return (
    <form action={formAction}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-green-500 text-3xl">Login</CardTitle>
          <CardDescription className="text-gray-600">
            Login to your account to access website
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {state.error !== '' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                { state.error }
              </AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="john@gmail.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="*******"
            />
          </div>
          <p className="text-sm text-gray-700">Dont have an account? <Link className="text-green-500" href={'/signup'}>Sign Up</Link> here</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
};

export default LoginForm;

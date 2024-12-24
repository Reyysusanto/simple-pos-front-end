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
import { SignUp } from "../lib/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useActionState } from "react";

const initialState: ActionResult = {
  error: "",
};

const SignUpForm = () => {
  const [stateSignUp, formActionSignUp] = useActionState(SignUp, initialState);

  const SubmitButtonSignUp = () => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending}>
        {pending ? "Loading..." : "Sign Up"}
      </Button>
    );
  };

  return (
    <form action={formActionSignUp}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Regist your account here</CardDescription>
        </CardHeader>
        <CardContent>
          {stateSignUp.error !== "" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{stateSignUp.error}</AlertDescription>
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
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="*******"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <SubmitButtonSignUp />
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignUpForm;

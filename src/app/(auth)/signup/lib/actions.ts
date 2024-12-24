import { SignUpSchema } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import prisma from "../../../../../lib/prisma";

export async function SignUp(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const validationSignUp = SignUpSchema.safeParse({
    email,
    password,
    confirmPassword,
  });

  if (!validationSignUp.success) {
    return {
      error: validationSignUp.error.errors[0].message,
    };
  }

  const existingUserSignUp = await prisma.user.findFirst({
    where: {
      email: validationSignUp.data.email,
    },
  });

  if (existingUserSignUp) {
    return {
      error: "Email already taken",
    };
  }

  if (
    validationSignUp.data.password !== validationSignUp.data.confirmPassword
  ) {
    return {
      error: "Passwords do not match",
    };
  }

  const hashedPassword = await bcrypt.hash(validationSignUp.data.password, 10);

  await prisma.user.create({
    data: {
      name,
      email: validationSignUp.data.email,
      password: hashedPassword,
    },
  });

  return redirect("/dashboard");
}

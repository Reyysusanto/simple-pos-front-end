"use server"

import { LoginSchema } from "@/lib/schema"
import { ActionResult } from "@/types"
import { redirect } from "next/navigation"
import bcrypt from 'bcrypt';
import prisma from "../../../../../lib/prisma";

export async function Login(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {
    const validasi = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validasi.success) {
        return {
            error: validasi.error.errors[0].message
        }
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email: validasi.data.email,
            type: 'admin'
        }
    })

    if(!existingUser) {
        return{
            error: 'Email not found'
        }
    }

    const comparePassword = bcrypt.compareSync(validasi.data.password, existingUser.password)

    if(!comparePassword) {
        return {
            error: 'email or password incorrect'
        }
    }

    return redirect('/menu_and_order')
}
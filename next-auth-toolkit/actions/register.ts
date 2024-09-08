"use server";

import { z } from "zod";
import bcrypt from "bcrypt";

import prisma from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassowrd = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  const user = prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassowrd,
    },
  });

  //todo: send verification token email

  return { success: "User created" };
};

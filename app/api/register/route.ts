import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import Email from "next-auth/providers/email";
import { registerSchema } from "@/app/validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = registerSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (user)
    return NextResponse.json({ error: "user already exists" }, { status: 400 });
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword,
    },
  });

  return NextResponse.json({ email: newUser.email });
}

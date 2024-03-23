import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email", placeholder: "email" },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials.password) return null;
    //     const user = await prisma.user.findUnique({
    //       where: { email: credentials?.email },
    //     });
    //     if (!user) return null;
    //     const passwordsMatch = await bcrypt.compare(
    //       credentials.password,
    //       user.hashedPassword!
    //     );
    //     if (passwordsMatch) return user as any;
    //   },
    // }),

    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
  ],

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

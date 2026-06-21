import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import type { Role } from "@/types";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "schoolkit-demo-secret-key-2024",
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email" },
        password: { label: "Password", type: "password" },
        role:     { label: "Role",     type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        const requestedRole = credentials.role as Role | undefined;

        // Try exact email match first
        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
        }) as any;

        // Demo bypass: if no exact match, grab the first active user for the selected role
        if ((!user || !user.active) && requestedRole) {
          user = await prisma.user.findFirst({
            where: { role: requestedRole, active: true },
          }) as any;
        }

        if (!user) return null;

        return {
          id:     user.id,
          email:  user.email,
          name:   user.name,
          role:   user.role as Role,
          avatar: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role   = (user as any).role;
        token.avatar = (user as any).avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id     = token.sub!;
        session.user.role   = token.role as Role;
        session.user.avatar = token.avatar as string | undefined;
      }
      return session;
    },
  },
};

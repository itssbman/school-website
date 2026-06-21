import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Role } from "@/types";

const DEMO_USERS: Record<string, { id: string; name: string; role: Role; avatar?: string }> = {
  parent:  { id: "demo-parent-1",  name: "Demo Parent",  role: "parent"  },
  student: { id: "demo-student-1", name: "Demo Student", role: "student" },
  teacher: { id: "demo-teacher-1", name: "Demo Teacher", role: "teacher" },
  admin:   { id: "demo-admin-1",   name: "Demo Admin",   role: "admin"   },
};

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "schoolkit-demo-secret-2024",
  pages: {
    signIn: "/login",
    error:  "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
        role:     { label: "Role",     type: "text"     },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (credentials.password.length < 8) return null;

        const role = (credentials.role || "student") as string;
        const demo = DEMO_USERS[role] ?? DEMO_USERS.student;

        return {
          id:    demo.id,
          email: credentials.email,
          name:  demo.name,
          role:  demo.role,
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

import { DefaultSession } from "next-auth";
import { Role } from "@/types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      avatar?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
    avatar?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
    avatar?: string;
  }
}

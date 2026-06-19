import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import MessagingPageClient from "./MessagingPageClient";

export default async function ParentMessagesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "parent") redirect("/login");

  return <MessagingPageClient />;
}

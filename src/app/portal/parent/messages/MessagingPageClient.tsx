"use client";

import MessagingPanel from "@/components/portal/MessagingPanel";

export default function MessagingPageClient() {
  return (
    <div className="h-[calc(100vh-120px)] bg-white border border-[#E5E3DF]">
      <MessagingPanel height={undefined as any} />
    </div>
  );
}

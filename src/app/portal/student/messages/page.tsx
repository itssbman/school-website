import MessagingPanel from "@/components/portal/MessagingPanel";

export const dynamic = "force-dynamic";

export default function StudentMessagesPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Messages</h2>
        <p className="text-[14px] text-[#6B7280]">Communicate with your teachers</p>
      </div>
      <div className="bg-white border border-[#E5E3DF]">
        <MessagingPanel height={560} />
      </div>
    </div>
  );
}

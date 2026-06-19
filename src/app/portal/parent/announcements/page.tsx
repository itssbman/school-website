import { demoAnnouncements } from "@/lib/demo-data";
import { format } from "date-fns";
import { Bell } from "lucide-react";

export default function ParentAnnouncementsPage() {
  const items = demoAnnouncements.parent;

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Announcements</h2>
        <p className="text-[14px] text-[#6B7280]">Latest notices from the school</p>
      </div>

      <div className="space-y-4">
        {items.map((a) => (
          <div key={a.id} className="bg-white border border-[#E5E3DF] p-5">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 bg-[#F9F8F7] border border-[#E5E3DF] flex items-center justify-center flex-shrink-0">
                <Bell size={16} className="text-[#C2593F]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1A2B49] text-[15px]">{a.title}</p>
                <p className="text-[12px] text-[#6B7280] mt-0.5">
                  {format(new Date(a.createdAt), "d MMM yyyy")}
                </p>
                <p className="text-[13px] text-[#6B7280] mt-3 leading-relaxed">{a.body}</p>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-12 text-[#6B7280] text-[14px]">No announcements at this time.</div>
        )}
      </div>
    </div>
  );
}

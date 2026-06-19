import { demoAnnouncements } from "@/lib/demo-data";
import { format } from "date-fns";
import { Bell } from "lucide-react";

export default function TeacherAnnouncementsPage() {
  const items = demoAnnouncements.teacher;

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Staff Announcements</h2>
        <p className="text-[14px] text-[#6B7280]">Notices from the school administration</p>
      </div>

      <div className="space-y-4">
        {items.map((a) => (
          <div key={a.id} className="bg-white border border-[#E5E3DF] p-5">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 bg-[#FEF3EF] border border-[#F5D0C5] flex items-center justify-center flex-shrink-0">
                <Bell size={16} className="text-[#C2593F]" />
              </div>
              <div>
                <p className="font-medium text-[#1A2B49] text-[15px]">{a.title}</p>
                <p className="text-[12px] text-[#6B7280] mt-0.5">{format(new Date(a.createdAt), "d MMMM yyyy")}</p>
                <p className="text-[13px] text-[#6B7280] mt-3 leading-relaxed">{a.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

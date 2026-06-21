import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Bell } from "lucide-react";

export default async function ParentAnnouncementsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "parent") redirect("/login");

  const announcements = await prisma.announcement.findMany({
    where: { targetRole: { in: ["parent", "all"] } },
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Announcements</h2>
        <p className="text-[14px] text-[#6B7280]">{announcements.length} notice{announcements.length !== 1 ? "s" : ""}</p>
      </div>

      {announcements.length === 0 ? (
        <div className="bg-white border border-[#E5E3DF] p-12 text-center">
          <Bell size={32} className="text-[#E5E3DF] mx-auto mb-3" />
          <p className="text-[#6B7280]">No announcements at this time.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {(announcements as any[]).map((ann: any) => (
            <div key={ann.id} className="bg-white border border-[#E5E3DF] p-5">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-[#F9F8F7] border border-[#E5E3DF] flex items-center justify-center flex-shrink-0">
                  <Bell size={16} className="text-[#C2593F]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-medium text-[#1A2B49] text-[15px]">{ann.title}</p>
                    <time className="text-[11px] text-[#9CA3AF] flex-shrink-0">
                      {format(new Date(ann.createdAt), "d MMM yyyy")}
                    </time>
                  </div>
                  <p className="text-[13px] text-[#6B7280] mt-3 leading-relaxed">{ann.body}</p>
                  <p className="text-[11px] text-[#9CA3AF] mt-2">Posted by {ann.author.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

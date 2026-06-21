import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default async function StudentTimetablePage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "student") redirect("/login");

  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) redirect("/login");

  const slots = await prisma.timetable.findMany({
    where: { class: student.class },
    orderBy: [{ day: "asc" }, { period: "asc" }],
  });

  const slotList = slots as any[];
  const byDay = DAY_ORDER.reduce<Record<string, any[]>>((acc, day) => {
    acc[day] = slotList.filter((s: any) => s.day === day);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Timetable</h2>
        <p className="text-[14px] text-[#6B7280]">Class {student.class} · Weekly schedule</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {DAY_ORDER.map((day) => (
          <div key={day} className="bg-white border border-[#E5E3DF]">
            <div className="px-4 py-3 bg-[#1A2B49] text-white text-[13px] font-semibold">{day}</div>
            <div className="divide-y divide-[#E5E3DF]">
              {byDay[day].length === 0 ? (
                <p className="px-4 py-3 text-[12px] text-[#9CA3AF]">No classes</p>
              ) : byDay[day].map((slot) => (
                <div key={slot.id} className="px-4 py-3">
                  <p className="text-[13px] font-medium text-[#1A2B49]">{slot.subject}</p>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">{slot.startTime} – {slot.endTime}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

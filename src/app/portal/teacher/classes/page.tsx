import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Users } from "lucide-react";

export default async function TeacherClassesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "teacher") redirect("/login");

  const teacher = await prisma.teacher.findUnique({ where: { userId: session.user.id } });
  if (!teacher) redirect("/login");

  const studentsByClass = await Promise.all(
    teacher.classes.map(async (cls: string) => {
      const students = await prisma.student.findMany({
        where: { class: cls },
        include: { user: { select: { name: true } } },
        orderBy: { user: { name: "asc" } },
      });
      return { class: cls, students };
    })
  );

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">My Classes</h2>
        <p className="text-[14px] text-[#6B7280]">
          {teacher.classes.length} {teacher.classes.length === 1 ? "class" : "classes"} · {teacher.subjects.join(", ")}
        </p>
      </div>

      {studentsByClass.map(({ class: className, students }) => (
        <div key={className} className="bg-white border border-[#E5E3DF]">
          <div className="px-6 py-4 border-b border-[#E5E3DF] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1A2B49] flex items-center justify-center">
                <Users size={16} className="text-white" />
              </div>
              <div>
                <p className="font-heading text-[16px] font-bold text-[#1A2B49]">Class {className}</p>
                <p className="text-[12px] text-[#6B7280]">
                  {students.length} student{students.length !== 1 ? "s" : ""} · {teacher.subjects.join(", ")}
                </p>
              </div>
            </div>
            <span className="text-[12px] font-medium bg-[#F9F8F7] border border-[#E5E3DF] px-3 py-1 text-[#6B7280]">
              {teacher.subjects[0]}
            </span>
          </div>

          {students.length === 0 ? (
            <p className="px-6 py-8 text-center text-[14px] text-[#6B7280]">No students enrolled in this class yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Class</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s: any, i: number) => (
                    <tr key={s.id}>
                      <td className="text-[#6B7280] font-mono text-[13px]">{String(i + 1).padStart(2, "0")}</td>
                      <td className="font-medium text-[#1A2B49]">{s.user.name}</td>
                      <td className="text-[#6B7280]">{s.class}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

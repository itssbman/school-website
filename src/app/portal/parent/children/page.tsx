import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Badge from "@/components/ui/Badge";

function attendanceRate(records: { status: string }[]) {
  if (!records.length) return 0;
  return Math.round((records.filter((r) => r.status === "present").length / records.length) * 100);
}

function avgScore(grades: { score: number; term: string }[]) {
  if (!grades.length) return null;
  return Math.round(grades.reduce((s, g) => s + g.score, 0) / grades.length);
}

function feeStatusVariant(records: { status: string }[]): "success" | "warning" | "danger" {
  if (!records.length) return "warning";
  if (records.some((r) => r.status === "overdue")) return "danger";
  if (records.every((r) => r.status === "paid")) return "success";
  return "warning";
}

function feeStatusLabel(records: { status: string }[]) {
  if (!records.length) return "No Records";
  if (records.some((r) => r.status === "overdue")) return "Overdue";
  if (records.every((r) => r.status === "paid")) return "Fees Paid";
  return "Pending";
}

export default async function ParentChildrenPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "parent") redirect("/login");

  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    include: {
      children: {
        include: {
          user: { select: { name: true, email: true, avatar: true } },
          grades: { orderBy: { createdAt: "desc" } },
          attendance: { orderBy: { date: "desc" }, take: 60 },
          feeRecords: { orderBy: { dueDate: "desc" } },
        },
      },
    },
  });

  if (!parent) redirect("/login");
  const children = parent.children;

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">My Children</h2>
        <p className="text-[14px] text-[#6B7280]">
          {children.length} {children.length === 1 ? "child" : "children"} linked to your account
        </p>
      </div>

      {children.length === 0 && (
        <div className="bg-white border border-[#E5E3DF] p-12 text-center">
          <p className="text-[#6B7280]">No children linked to your account. Contact the school office.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(children as any[]).map((child: any) => {
          const rate = attendanceRate(child.attendance);
          const avg  = avgScore(child.grades);

          return (
            <div key={child.id} className="bg-white border border-[#E5E3DF] overflow-hidden">
              <div className="bg-[#1A2B49] px-6 py-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#C2593F] flex items-center justify-center text-white text-[22px] font-bold flex-shrink-0">
                  {child.user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-heading text-[18px] font-bold">{child.user.name}</p>
                  <p className="text-white/70 text-[13px]">Class {child.class} · {child.admissionNumber}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-[#F9F8F7] p-3 border border-[#E5E3DF]">
                    <p className="text-[22px] font-bold text-[#1A2B49]">{rate}%</p>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">Attendance</p>
                  </div>
                  <div className="bg-[#F9F8F7] p-3 border border-[#E5E3DF]">
                    <p className="text-[22px] font-bold text-[#1A2B49]">{avg ?? "—"}</p>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">Avg Score</p>
                  </div>
                  <div className="bg-[#F9F8F7] p-3 border border-[#E5E3DF]">
                    <p className="text-[22px] font-bold text-[#1A2B49]">{child.grades.length}</p>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">Grades</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#6B7280]">Fee status</span>
                  <Badge variant={feeStatusVariant(child.feeRecords)} size="sm">
                    {feeStatusLabel(child.feeRecords)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#6B7280]">Email</span>
                  <span className="font-medium text-[#1A2B49] font-mono text-[12px]">{child.user.email}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { demoParent } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";

function attendanceRate(records: { status: string }[]) {
  if (!records.length) return 0;
  return Math.round(records.filter((r) => r.status === "present").length / records.length * 100);
}

function avgScore(grades: { score: number; term: string }[], term: string) {
  const t = grades.filter((g) => g.term === term);
  if (!t.length) return null;
  return Math.round(t.reduce((s, g) => s + g.score, 0) / t.length);
}

function feeStatusVariant(records: { status: string }[]): "success" | "warning" | "danger" {
  if (records.every((r) => r.status === "paid")) return "success";
  if (records.some((r) => r.status === "overdue")) return "danger";
  return "warning";
}

function feeStatusLabel(records: { status: string }[]) {
  if (records.every((r) => r.status === "paid")) return "Fees Paid";
  if (records.some((r) => r.status === "overdue")) return "Overdue";
  return "Pending";
}

export default function ParentChildrenPage() {
  const { children } = demoParent;
  const latestTerm = "Term 1 2025/26";

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">My Children</h2>
        <p className="text-[14px] text-[#6B7280]">Profile and quick stats for each child</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children.map((child) => {
          const rate = attendanceRate(child.attendance);
          const avg  = avgScore(child.grades, latestTerm);
          const feeBadgeVariant = feeStatusVariant(child.feeRecords);
          const feeBadgeLabel   = feeStatusLabel(child.feeRecords);

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
                    <p className="text-[22px] font-bold text-[#1A2B49]">{avg ?? "—"}{avg ? "%" : ""}</p>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">Avg Grade</p>
                  </div>
                  <div className="bg-[#F9F8F7] p-3 border border-[#E5E3DF]">
                    <p className="text-[22px] font-bold text-[#1A2B49]">{child.grades.filter((g) => g.term === latestTerm).length}</p>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">Subjects</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#6B7280]">Fee status</span>
                  <Badge variant={feeBadgeVariant} size="sm">{feeBadgeLabel}</Badge>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#6B7280]">Current session</span>
                  <span className="font-medium text-[#1A2B49]">2025/2026</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#6B7280]">Latest term</span>
                  <span className="font-medium text-[#1A2B49]">{latestTerm}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

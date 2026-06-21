import { demoTermFees, demoAdminStudents } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

function fmt(n: number) { return "₦" + n.toLocaleString("en-NG"); }
function feeVariant(s: string): "success" | "warning" | "danger" {
  if (s === "paid") return "success";
  if (s === "overdue") return "danger";
  return "warning";
}

const feeList = demoTermFees;
const paid    = feeList.filter((f) => f.status === "paid");
const pending = feeList.filter((f) => f.status === "pending");
const overdue = feeList.filter((f) => f.status === "overdue");

const amtPaid    = paid.reduce((s, f) => s + f.amount, 0);
const amtPending = pending.reduce((s, f) => s + f.amount, 0);
const amtOverdue = overdue.reduce((s, f) => s + f.amount, 0);
const amtTotal   = feeList.reduce((s, f) => s + f.amount, 0);
const paidPct    = feeList.length > 0 ? Math.round((paid.length / feeList.length) * 100) : 0;
const pendingPct = feeList.length > 0 ? Math.round((pending.length / feeList.length) * 100) : 0;
const overduePct = 100 - paidPct - pendingPct;

const detailedFees = demoAdminStudents.map((s, i) => ({
  id: `fee-detail-${i}`,
  amount: 750000,
  status: s.feeStatus,
  term: "Term 1 2025/26",
  student: { class: s.class, user: { name: s.name } },
}));

export default function AdminFeesPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Fee Management</h2>
        <p className="text-[14px] text-[#6B7280]">Current term · {detailedFees.length} records</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Billed",  value: fmt(amtTotal),   color: "text-[#1A2B49]" },
          { label: "Collected",     value: fmt(amtPaid),    color: "text-[#3D5A45]" },
          { label: "Pending",       value: fmt(amtPending), color: "text-[#D97706]" },
          { label: "Overdue",       value: fmt(amtOverdue), color: "text-[#C2593F]" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#E5E3DF] p-5">
            <p className={`text-[22px] font-bold font-heading ${s.color}`}>{s.value}</p>
            <p className="text-[12px] text-[#6B7280] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#E5E3DF] p-5">
        <p className="text-[13px] font-semibold text-[#1A2B49] mb-3">Collection Breakdown</p>
        <div className="flex h-4 overflow-hidden border border-[#E5E3DF]">
          <div className="bg-[#3D5A45]" style={{ width: `${paidPct}%` }} />
          <div className="bg-[#D97706]" style={{ width: `${pendingPct}%` }} />
          <div className="bg-[#C2593F]" style={{ width: `${overduePct}%` }} />
        </div>
        <div className="flex gap-4 mt-3 text-[12px] text-[#6B7280]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#3D5A45] inline-block" />Paid {paidPct}%</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#D97706] inline-block" />Pending {pendingPct}%</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#C2593F] inline-block" />Overdue {overduePct}%</span>
        </div>
      </div>

      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <div className="px-5 py-3 border-b border-[#E5E3DF] bg-[#F9F8F7]">
          <p className="text-[13px] font-semibold text-[#1A2B49]">Fee Records ({detailedFees.length})</p>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th><th>Class</th><th>Term</th>
              <th className="text-right">Amount</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {detailedFees.map((f) => (
              <tr key={f.id}>
                <td className="font-medium text-[#1A2B49]">{f.student.user.name}</td>
                <td className="text-[#6B7280]">{f.student.class}</td>
                <td className="text-[#6B7280] text-[13px]">{f.term}</td>
                <td className="text-right font-mono text-[13px] text-[#1A2B49]">{fmt(f.amount)}</td>
                <td><Badge variant={feeVariant(f.status)} size="sm" className="capitalize">{f.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

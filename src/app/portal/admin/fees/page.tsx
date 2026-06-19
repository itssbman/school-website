import { demoTermFees, demoAdminStudents } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";

function fmt(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default function AdminFeesPage() {
  const paid    = demoTermFees.filter((f) => f.status === "paid").length;
  const pending = demoTermFees.filter((f) => f.status === "pending").length;
  const overdue = demoTermFees.filter((f) => f.status === "overdue").length;

  const amtPaid    = paid    * 750000;
  const amtPending = pending * 750000;
  const amtOverdue = overdue * 750000;
  const amtTotal   = demoTermFees.length * 750000;

  // Simple bar widths
  const paidPct    = Math.round((paid    / demoTermFees.length) * 100);
  const pendingPct = Math.round((pending / demoTermFees.length) * 100);
  const overduePct = 100 - paidPct - pendingPct;

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Fee Management</h2>
        <p className="text-[14px] text-[#6B7280]">Term 1 2025/26 · {demoTermFees.length} records</p>
      </div>

      {/* Summary cards */}
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

      {/* Collection progress bar */}
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

      {/* Sample student fee records */}
      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <div className="px-5 py-3 border-b border-[#E5E3DF] bg-[#F9F8F7] flex items-center justify-between">
          <p className="text-[13px] font-semibold text-[#1A2B49]">Student Fee Records (Sample)</p>
          <button disabled title="Available in full version" className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#9CA3AF] cursor-not-allowed opacity-60 bg-white">
            Export
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Term</th>
              <th className="text-right">Amount</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {demoAdminStudents.slice(0, 8).map((s) => (
              <tr key={s.id}>
                <td className="font-medium text-[#1A2B49]">{s.name}</td>
                <td className="text-[#6B7280]">{s.class}</td>
                <td className="text-[#6B7280] text-[13px]">Term 1 2025/26</td>
                <td className="text-right font-mono text-[13px] text-[#1A2B49]">{fmt(750000)}</td>
                <td>
                  <Badge
                    variant={s.feeStatus === "paid" ? "success" : s.feeStatus === "overdue" ? "danger" : "warning"}
                    size="sm"
                    className="capitalize"
                  >
                    {s.feeStatus}
                  </Badge>
                </td>
                <td className="text-center">
                  <button disabled title="Available in full version" className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]">
                    Record
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

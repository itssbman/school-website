import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Badge from "@/components/ui/Badge";

function fmt(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

function feeVariant(s: string): "success" | "warning" | "danger" {
  if (s === "paid") return "success";
  if (s === "overdue") return "danger";
  return "warning";
}

export default async function AdminFeesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  const fees = await prisma.feeRecord.findMany({
    orderBy: { dueDate: "desc" },
    include: {
      student: {
        include: { user: { select: { name: true } } },
      },
    },
  });

  const feeList = fees as any[];
  const paid    = feeList.filter((f: any) => f.status === "paid");
  const pending = feeList.filter((f: any) => f.status === "pending");
  const overdue = feeList.filter((f: any) => f.status === "overdue");

  const amtPaid    = paid.reduce((s: number, f: any) => s + f.amount, 0);
  const amtPending = pending.reduce((s: number, f: any) => s + f.amount, 0);
  const amtOverdue = overdue.reduce((s: number, f: any) => s + f.amount, 0);
  const amtTotal   = feeList.reduce((s: number, f: any) => s + f.amount, 0);

  const paidPct    = feeList.length > 0 ? Math.round((paid.length / feeList.length) * 100) : 0;
  const pendingPct = fees.length > 0 ? Math.round((pending.length / fees.length) * 100) : 0;
  const overduePct = 100 - paidPct - pendingPct;

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Fee Management</h2>
        <p className="text-[14px] text-[#6B7280]">Current term · {feeList.length} records</p>
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
          <p className="text-[13px] font-semibold text-[#1A2B49]">Fee Records ({fees.length})</p>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Term</th>
              <th className="text-right">Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {feeList.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-[#6B7280]">No fee records yet.</td>
              </tr>
            ) : (
              feeList.map((f: any) => (
                <tr key={f.id}>
                  <td className="font-medium text-[#1A2B49]">{f.student?.user?.name ?? "—"}</td>
                  <td className="text-[#6B7280]">{f.student?.class ?? "—"}</td>
                  <td className="text-[#6B7280] text-[13px]">{f.term ?? "Current Term"}</td>
                  <td className="text-right font-mono text-[13px] text-[#1A2B49]">{fmt(f.amount)}</td>
                  <td>
                    <Badge variant={feeVariant(f.status)} size="sm" className="capitalize">{f.status}</Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

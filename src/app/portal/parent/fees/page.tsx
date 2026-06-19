import { demoParent } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";
import { format } from "date-fns";

function fmt(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

function statusVariant(s: string): "success" | "warning" | "danger" {
  if (s === "paid")    return "success";
  if (s === "overdue") return "danger";
  return "warning";
}

export default function ParentFeesPage() {
  const { children } = demoParent;
  const allRecords = children.flatMap((c) =>
    c.feeRecords.map((r) => ({ ...r, studentName: c.user.name, class: c.class }))
  );

  const totalBilled  = allRecords.reduce((s, r) => s + r.amount, 0);
  const totalPaid    = allRecords.filter((r) => r.status === "paid").reduce((s, r) => s + r.amount, 0);
  const totalBalance = totalBilled - totalPaid;

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Fee Records</h2>
        <p className="text-[14px] text-[#6B7280]">School fee payment status for your children</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Billed",   value: fmt(totalBilled),  color: "text-[#1A2B49]" },
          { label: "Amount Paid",    value: fmt(totalPaid),    color: "text-[#3D5A45]" },
          { label: "Balance Due",    value: fmt(totalBalance), color: totalBalance > 0 ? "text-[#C2593F]" : "text-[#3D5A45]" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#E5E3DF] p-5">
            <p className={`text-[24px] font-bold font-heading ${s.color}`}>{s.value}</p>
            <p className="text-[12px] text-[#6B7280] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Term</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allRecords.map((r) => (
              <tr key={r.id}>
                <td>
                  <div>
                    <p className="font-medium text-[#1A2B49]">{r.studentName}</p>
                    <p className="text-[11px] text-[#6B7280]">Class {r.class}</p>
                  </div>
                </td>
                <td className="text-[#6B7280]">{r.term}</td>
                <td className="font-mono text-[13px] font-medium text-[#1A2B49]">{fmt(r.amount)}</td>
                <td className="text-[#6B7280]">{format(new Date(r.dueDate), "d MMM yyyy")}</td>
                <td>
                  <Badge variant={statusVariant(r.status)} size="sm" className="capitalize">{r.status}</Badge>
                </td>
                <td>
                  {r.status !== "paid" ? (
                    <button
                      disabled
                      title="Available in full version"
                      className="px-3 py-1.5 text-[12px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
                    >
                      Pay Now
                    </button>
                  ) : (
                    <button
                      disabled
                      title="Available in full version"
                      className="px-3 py-1.5 text-[12px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
                    >
                      Receipt
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[12px] text-[#9CA3AF] text-center">
        Online payment available in the full version · Contact the bursary for assistance
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import { format } from "date-fns";
import { useToast } from "@/components/ui/Toast";

interface FeeRecord { id: string; term: string; amount: number; status: string; dueDate: string; paidAt: string | null; }
interface Child { id: string; class: string; user: { name: string }; feeRecords: FeeRecord[]; }

function fmt(n: number) { return "₦" + n.toLocaleString("en-NG"); }
function sv(s: string): "success" | "warning" | "danger" {
  return s === "paid" ? "success" : s === "overdue" ? "danger" : "warning";
}

export default function ParentFeesClient({ children, userEmail }: { children: Child[]; userEmail: string }) {
  const { toast } = useToast();
  const [records, setRecords] = useState<(FeeRecord & { studentName: string; class: string })[]>(
    children.flatMap((c) => c.feeRecords.map((r) => ({ ...r, studentName: c.user.name, class: c.class })))
  );

  const totalBilled  = records.reduce((s, r) => s + r.amount, 0);
  const totalPaid    = records.filter((r) => r.status === "paid").reduce((s, r) => s + r.amount, 0);
  const totalBalance = totalBilled - totalPaid;

  const handlePay = (record: typeof records[0]) => {
    if (typeof window === "undefined" || !(window as any).PaystackPop) {
      toast("Paystack is not available in this environment", "error");
      return;
    }
    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: userEmail,
      amount: record.amount * 100,
      currency: "NGN",
      ref: `fee_${record.id}_${Date.now()}`,
      callback: async (response: any) => {
        try {
          const res = await fetch("/api/fees/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: response.reference, feeId: record.id }),
          });
          if (res.ok) {
            setRecords((prev) =>
              prev.map((r) => r.id === record.id ? { ...r, status: "paid", paidAt: new Date().toISOString() } : r)
            );
            toast("Payment successful!", "success");
          } else {
            toast("Payment verification failed", "error");
          }
        } catch {
          toast("Payment verification error", "error");
        }
      },
      onClose: () => toast("Payment window closed", "info"),
    });
    handler.openIframe();
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Fee Records</h2>
        <p className="text-[14px] text-[#6B7280]">School fee payment status for your children</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Billed",  value: fmt(totalBilled),  color: "text-[#1A2B49]" },
          { label: "Amount Paid",   value: fmt(totalPaid),    color: "text-[#3D5A45]" },
          { label: "Balance Due",   value: fmt(totalBalance), color: totalBalance > 0 ? "text-[#C2593F]" : "text-[#3D5A45]" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#E5E3DF] p-5">
            <p className={`text-[24px] font-bold font-heading ${s.color}`}>{s.value}</p>
            <p className="text-[12px] text-[#6B7280] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th><th>Term</th><th>Amount</th>
              <th>Due Date</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-[#6B7280]">No fee records found.</td></tr>
            ) : records.map((r) => (
              <tr key={r.id}>
                <td>
                  <p className="font-medium text-[#1A2B49]">{r.studentName}</p>
                  <p className="text-[11px] text-[#6B7280]">Class {r.class}</p>
                </td>
                <td className="text-[#6B7280]">{r.term}</td>
                <td className="font-mono text-[13px] font-medium text-[#1A2B49]">{fmt(r.amount)}</td>
                <td className="text-[#6B7280]">{format(new Date(r.dueDate), "d MMM yyyy")}</td>
                <td><Badge variant={sv(r.status)} size="sm" className="capitalize">{r.status}</Badge></td>
                <td>
                  {r.status !== "paid" ? (
                    <button
                      onClick={() => handlePay(r)}
                      className="px-3 py-1.5 text-[12px] font-medium bg-[#C2593F] text-white hover:bg-[#A8482F] transition-colors"
                    >
                      Pay Now
                    </button>
                  ) : (
                    <span className="text-[12px] text-[#3D5A45]">
                      Paid {r.paidAt ? format(new Date(r.paidAt), "d MMM") : ""}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

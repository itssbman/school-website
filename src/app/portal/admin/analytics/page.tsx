import { demoAdminStats, demoApplications, demoTermFees } from "@/lib/demo-data";
import { TrendingUp, Users, GraduationCap, DollarSign, BookOpen, Bell } from "lucide-react";

export const dynamic = "force-dynamic";

function fmt(n: number) { return "₦" + n.toLocaleString("en-NG"); }

const totalFees = demoTermFees.reduce((s, f) => s + f.amount, 0);
const paidFees  = demoTermFees.filter((f) => f.status === "paid").reduce((s, f) => s + f.amount, 0);
const collectionRate = totalFees > 0 ? Math.round((paidFees / totalFees) * 100) : 0;

const admissionsByStatus = demoApplications.reduce<Record<string, number>>((acc, a) => {
  acc[a.status] = (acc[a.status] ?? 0) + 1;
  return acc;
}, {});
const totalApplications = demoApplications.length;
const admittedCount = admissionsByStatus["admitted"] ?? 0;

const attendanceCounts = { present: 51, absent: 7, late: 2 };
const totalAttendance = 60;
const attendanceRate = Math.round((attendanceCounts.present / totalAttendance) * 100);

const kpis = [
  { icon: GraduationCap, label: "Total Students",    value: demoAdminStats.totalStudents.toLocaleString(), sub: `${demoAdminStats.totalStaff} teachers`, color: "bg-[#1A2B49]" },
  { icon: TrendingUp,    label: "Attendance Rate",   value: `${attendanceRate}%`, sub: "Last 60 records", color: "bg-[#3D5A45]" },
  { icon: DollarSign,    label: "Fees Collected",    value: fmt(paidFees), sub: `${collectionRate}% collection rate`, color: "bg-[#C2593F]" },
  { icon: BookOpen,      label: "Avg. Grade",        value: "79/100", sub: "Current term", color: "bg-[#3D5A45]" },
  { icon: Users,         label: "Applications",      value: totalApplications.toString(), sub: `${admittedCount} admitted`, color: "bg-[#D97706]" },
  { icon: Bell,          label: "Content Published", value: "10", sub: "4 news · 3 events", color: "bg-[#6B7280]" },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Analytics Overview</h2>
        <p className="text-[14px] text-[#6B7280]">School-wide metrics and performance data</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="bg-white border border-[#E5E3DF] p-5 flex items-start gap-4">
            <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${color}`}>
              <Icon size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#6B7280] uppercase tracking-wider">{label}</p>
              <p className="font-heading text-[28px] font-bold text-[#1A2B49] mt-0.5">{value}</p>
              {sub && <p className="text-[12px] text-[#6B7280] mt-0.5">{sub}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E5E3DF] p-6">
          <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4">Admissions Pipeline</h3>
          <div className="space-y-3">
            {[
              { label: "Applied",     key: "applied",     color: "bg-[#4F46E5]" },
              { label: "Shortlisted", key: "shortlisted", color: "bg-[#D97706]" },
              { label: "Admitted",    key: "admitted",    color: "bg-[#3D5A45]" },
              { label: "Rejected",    key: "rejected",    color: "bg-[#C2593F]" },
            ].map(({ label, key, color }) => {
              const count = admissionsByStatus[key] ?? 0;
              const pct = totalApplications > 0 ? Math.round((count / totalApplications) * 100) : 0;
              return (
                <div key={key}>
                  <div className="flex justify-between text-[13px] mb-1">
                    <span className="text-[#1A2B49] capitalize">{label}</span>
                    <span className="text-[#6B7280]">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-[#F5F4F2] overflow-hidden">
                    <div className={`h-full ${color} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-[#E5E3DF] p-6">
          <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4">Attendance Summary</h3>
          <div className="space-y-3">
            {[
              { label: "Present", count: attendanceCounts.present, color: "bg-[#3D5A45]" },
              { label: "Absent",  count: attendanceCounts.absent,  color: "bg-[#C2593F]" },
              { label: "Late",    count: attendanceCounts.late,    color: "bg-[#D97706]" },
            ].map(({ label, count, color }) => {
              const pct = Math.round((count / totalAttendance) * 100);
              return (
                <div key={label}>
                  <div className="flex justify-between text-[13px] mb-1">
                    <span className="text-[#1A2B49]">{label}</span>
                    <span className="text-[#6B7280]">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-[#F5F4F2] overflow-hidden">
                    <div className={`h-full ${color} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[12px] text-[#9CA3AF] mt-4">{totalAttendance} total records (demo)</p>
        </div>
      </div>
    </div>
  );
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { TrendingUp, Users, GraduationCap, DollarSign, BookOpen, Bell } from "lucide-react";

function fmt(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default async function AdminAnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalStudents,
    totalTeachers,
    totalUsers,
    totalAssignments,
    totalSubmissions,
    totalAnnouncements,
    totalNews,
    totalEvents,
    fees,
    attendance,
    admissions,
    grades,
  ] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.user.count(),
    prisma.assignment.count(),
    prisma.submission.count(),
    prisma.announcement.count(),
    prisma.newsArticle.count(),
    prisma.event.count(),
    prisma.feeRecord.findMany({ select: { amount: true, status: true } }),
    prisma.attendance.groupBy({ by: ["status"], _count: { status: true } }),
    prisma.admissionApplication.groupBy({ by: ["status"], _count: { status: true } }),
    prisma.grade.aggregate({ _avg: { score: true }, _count: { id: true } }),
  ]);

  const feeList = fees as any[];
  const totalFees = feeList.reduce((s: number, f: any) => s + f.amount, 0);
  const paidFees = feeList.filter((f: any) => f.status === "paid").reduce((s: number, f: any) => s + f.amount, 0);
  const collectionRate = totalFees > 0 ? Math.round((paidFees / totalFees) * 100) : 0;

  const presentCount = (attendance as any[]).find((a) => a.status === "present")?._count?.status ?? 0;
  const totalAttendance = (attendance as any[]).reduce((s: number, a: any) => s + a._count.status, 0);
  const attendanceRate = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0;

  const admittedCount = (admissions as any[]).find((a) => a.status === "admitted")?._count?.status ?? 0;
  const totalApplications = (admissions as any[]).reduce((s, a) => s + a._count.status, 0);

  const avgGrade = grades._avg.score ? Math.round(grades._avg.score) : 0;
  const submissionRate = totalAssignments > 0 ? Math.round((totalSubmissions / (totalStudents * Math.max(1, totalAssignments))) * 100) : 0;

  const kpis = [
    { icon: GraduationCap, label: "Total Students", value: totalStudents.toLocaleString(), sub: `${totalTeachers} teachers`, color: "bg-[#1A2B49]" },
    { icon: TrendingUp, label: "Attendance Rate", value: `${attendanceRate}%`, sub: `${totalAttendance.toLocaleString()} records`, color: attendanceRate >= 80 ? "bg-[#3D5A45]" : "bg-[#C2593F]" },
    { icon: DollarSign, label: "Fees Collected", value: fmt(paidFees), sub: `${collectionRate}% collection rate`, color: "bg-[#C2593F]" },
    { icon: BookOpen, label: "Avg. Grade", value: `${avgGrade}/100`, sub: `${(grades._count.id ?? 0).toLocaleString()} grades recorded`, color: "bg-[#3D5A45]" },
    { icon: Users, label: "Applications", value: totalApplications.toString(), sub: `${admittedCount} admitted`, color: "bg-[#D97706]" },
    { icon: Bell, label: "Content Published", value: (totalNews + totalEvents + totalAnnouncements).toString(), sub: `${totalNews} news · ${totalEvents} events`, color: "bg-[#6B7280]" },
  ];

  const admissionsByStatus = (admissions as any[]).reduce((acc: Record<string, number>, a) => {
    acc[a.status] = a._count.status;
    return acc;
  }, {});

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
        {/* Admissions funnel */}
        <div className="bg-white border border-[#E5E3DF] p-6">
          <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4">Admissions Pipeline</h3>
          <div className="space-y-3">
            {[
              { label: "Applied", key: "applied", color: "bg-[#4F46E5]" },
              { label: "Shortlisted", key: "shortlisted", color: "bg-[#D97706]" },
              { label: "Admitted", key: "admitted", color: "bg-[#3D5A45]" },
              { label: "Rejected", key: "rejected", color: "bg-[#C2593F]" },
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

        {/* Attendance breakdown */}
        <div className="bg-white border border-[#E5E3DF] p-6">
          <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4">Attendance Summary</h3>
          <div className="space-y-3">
            {[
              { label: "Present", key: "present", color: "bg-[#3D5A45]" },
              { label: "Absent", key: "absent", color: "bg-[#C2593F]" },
              { label: "Late", key: "late", color: "bg-[#D97706]" },
            ].map(({ label, key, color }) => {
              const count = (attendance as any[]).find((a) => a.status === key)?._count?.status ?? 0;
              const pct = totalAttendance > 0 ? Math.round((count / totalAttendance) * 100) : 0;
              return (
                <div key={key}>
                  <div className="flex justify-between text-[13px] mb-1">
                    <span className="text-[#1A2B49]">{label}</span>
                    <span className="text-[#6B7280]">{count.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-[#F5F4F2] overflow-hidden">
                    <div className={`h-full ${color} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[12px] text-[#9CA3AF] mt-4">{totalAttendance.toLocaleString()} total records</p>
        </div>
      </div>

      {/* System summary */}
      <div className="bg-white border border-[#E5E3DF] p-6">
        <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4">System Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: totalUsers },
            { label: "Assignments", value: totalAssignments },
            { label: "Submissions", value: totalSubmissions },
            { label: "Grade Records", value: grades._count.id ?? 0 },
          ].map(({ label, value }) => (
            <div key={label} className="text-center p-4 bg-[#F9F8F7] border border-[#E5E3DF]">
              <p className="font-heading text-[24px] font-bold text-[#1A2B49]">{value.toLocaleString()}</p>
              <p className="text-[12px] text-[#6B7280] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

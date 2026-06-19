"use client";

import { useState } from "react";
import {
  RadialBarChart, RadialBar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from "recharts";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { format } from "date-fns";
import { DollarSign, FileText, Bell, CheckCircle2, Clock } from "lucide-react";
import MessagingPanel from "@/components/portal/MessagingPanel";
import schoolConfig from "../../../../school.config";

interface Props {
  parent: any;
  announcements: any[];
}

function AttendanceRing({ percentage }: { percentage: number }) {
  const color = percentage >= 80 ? "#3D5A45" : schoolConfig.brand.accentColor;
  const data = [{ value: percentage, fill: color }, { value: 100 - percentage, fill: "#F5F4F2" }];

  return (
    <div className="stat-card">
      <p className="text-[12px] font-medium text-[#6B7280] uppercase tracking-wider mb-4">
        Attendance Rate
      </p>
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="60%"
              outerRadius="100%"
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar dataKey="value" cornerRadius={4} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-[20px] font-bold" style={{ color }}>
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#1A2B49]">
            {percentage >= 80 ? "Good Standing" : "Needs Attention"}
          </p>
          <p className="text-[12px] text-[#6B7280] mt-0.5">Current term</p>
        </div>
      </div>
    </div>
  );
}

function GradeChart({ grades }: { grades: any[] }) {
  const subjectMap: Record<string, number[]> = {};
  grades.forEach((g) => {
    if (!subjectMap[g.subject]) subjectMap[g.subject] = [];
    subjectMap[g.subject].push(g.score);
  });
  const data = Object.entries(subjectMap).map(([subject, scores]) => ({
    subject: subject.substring(0, 6),
    score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
  }));

  const getBarColor = (score: number) => {
    if (score >= 70) return "#3D5A45";
    if (score >= 50) return "#1A2B49";
    return schoolConfig.brand.accentColor;
  };

  return (
    <div className="stat-card">
      <p className="text-[12px] font-medium text-[#6B7280] uppercase tracking-wider mb-4">
        Grade Summary
      </p>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <XAxis dataKey="subject" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ border: "1px solid #E5E3DF", borderRadius: 4, fontSize: 13 }}
            formatter={(val: any) => [`${val}%`, "Score"]}
          />
          <Bar dataKey="score" radius={[2, 2, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={getBarColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function FeeStatusPanel({ feeRecords }: { feeRecords: any[] }) {
  const latest = feeRecords[0];
  const statusVariant: Record<string, any> = {
    paid: "success",
    pending: "warning",
    overdue: "danger",
  };

  const initializePaystack = () => {
    if (typeof window !== "undefined" && (window as any).PaystackPop) {
      const handler = (window as any).PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: "parent@example.com",
        amount: latest?.amount * 100,
        currency: schoolConfig.currency.code,
        callback: (response: any) => {
          fetch("/api/fees/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: response.reference, feeId: latest?.id }),
          });
        },
      });
      handler.openIframe();
    }
  };

  if (!latest) {
    return (
      <div className="stat-card">
        <p className="text-[12px] font-medium text-[#6B7280] uppercase tracking-wider mb-4">
          Fee Status
        </p>
        <p className="text-[14px] text-[#6B7280]">No fee records found.</p>
      </div>
    );
  }

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[12px] font-medium text-[#6B7280] uppercase tracking-wider">
          Fee Status
        </p>
        <Badge variant={statusVariant[latest.status] || "default"} size="md">
          {latest.status.charAt(0).toUpperCase() + latest.status.slice(1)}
        </Badge>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-[14px]">
          <span className="text-[#6B7280]">Term Fee</span>
          <span className="font-medium text-[#1A2B49]">{schoolConfig.currency.symbol}{latest.amount.toLocaleString(schoolConfig.currency.locale)}</span>
        </div>
        <div className="flex justify-between text-[14px]">
          <span className="text-[#6B7280]">Due Date</span>
          <span className="text-[#1A2B49]">{format(new Date(latest.dueDate), "d MMM yyyy")}</span>
        </div>
        <div className="flex justify-between text-[14px]">
          <span className="text-[#6B7280]">Term</span>
          <span className="text-[#1A2B49]">{latest.term}</span>
        </div>
      </div>
      {latest.status !== "paid" && (
        <Button
          variant="primary"
          size="sm"
          onClick={initializePaystack}
          className="w-full"
        >
          <DollarSign size={14} className="mr-1" />
          Pay Now via Paystack
        </Button>
      )}
    </div>
  );
}

export default function ParentDashboardClient({ parent, announcements }: Props) {
  const [activeChild, setActiveChild] = useState(0);

  const child = parent.children[activeChild];
  if (!child) {
    return (
      <div className="py-12 text-center text-[#6B7280]">
        No children linked to this account. Please contact the school office.
      </div>
    );
  }

  const attendanceStats = (() => {
    const total = child.attendance.length;
    const present = child.attendance.filter((a: any) => a.status === "present").length;
    return total > 0 ? Math.round((present / total) * 100) : 0;
  })();

  const pendingAssignments = child.submissions
    ? child.submissions.filter((s: any) => !s.submittedAt).length
    : 0;

  return (
    <div className="space-y-6">
      {parent.children.length > 1 && (
        <div className="bg-white border border-[#E5E3DF] p-1 inline-flex gap-1">
          {parent.children.map((c: any, i: number) => (
            <button
              key={c.id}
              onClick={() => setActiveChild(i)}
              className={`flex items-center gap-2 px-4 py-2 text-[13px] font-medium transition-colors ${
                activeChild === i
                  ? "bg-[#1A2B49] text-white"
                  : "text-[#6B7280] hover:text-[#1A2B49]"
              }`}
            >
              <Avatar src={c.user.avatar} name={c.user.name} size="sm" />
              <span>{c.user.name}</span>
              <span className="text-[11px] opacity-70">{c.class}</span>
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 pb-2 border-b border-[#E5E3DF]">
        <Avatar src={child.user.avatar} name={child.user.name} size="lg" />
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">{child.user.name}</h2>
          <p className="text-[14px] text-[#6B7280]">
            {child.class} · Admission No: {child.admissionNumber}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AttendanceRing percentage={attendanceStats} />
        <GradeChart grades={child.grades} />
        <FeeStatusPanel feeRecords={child.feeRecords} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-[#E5E3DF] p-6">
          <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4">
            Recent Submissions
          </h3>
          {child.submissions?.length > 0 ? (
            <ul className="space-y-3">
              {child.submissions.slice(0, 5).map((sub: any) => (
                <li
                  key={sub.id}
                  className="flex items-center justify-between py-2 border-b border-[#E5E3DF] last:border-0"
                >
                  <div>
                    <p className="text-[14px] font-medium text-[#1A2B49]">
                      {sub.assignment.title}
                    </p>
                    <p className="text-[12px] text-[#6B7280]">
                      Due: {format(new Date(sub.assignment.dueDate), "d MMM")}
                    </p>
                  </div>
                  <Badge variant="success" size="sm">
                    <CheckCircle2 size={11} className="mr-1" />
                    Submitted
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[14px] text-[#6B7280]">No submissions yet.</p>
          )}
        </div>

        <div className="bg-white border border-[#E5E3DF] p-6">
          <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4 flex items-center gap-2">
            <Bell size={16} />
            Announcements
          </h3>
          {announcements.length > 0 ? (
            <ul className="space-y-3">
              {announcements.map((ann: any) => (
                <li
                  key={ann.id}
                  className="py-2 border-b border-[#E5E3DF] last:border-0"
                >
                  <p className="text-[14px] font-medium text-[#1A2B49]">{ann.title}</p>
                  <p className="text-[13px] text-[#6B7280] mt-0.5 line-clamp-2">{ann.body}</p>
                  <time className="text-[11px] text-[#6B7280]/70 mt-1 block">
                    {format(new Date(ann.createdAt), "d MMM yyyy")}
                  </time>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[14px] text-[#6B7280]">No new announcements.</p>
          )}
        </div>
      </div>

      <div className="bg-white border border-[#E5E3DF]">
        <div className="px-6 py-4 border-b border-[#E5E3DF]">
          <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49]">Messages</h3>
        </div>
        <MessagingPanel height={400} />
      </div>
    </div>
  );
}

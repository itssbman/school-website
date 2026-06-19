"use client";

import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";
import { format } from "date-fns";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import schoolConfig from "../../../../school.config";
import {
  Users, GraduationCap, TrendingUp, DollarSign,
  ChevronDown, CheckCircle2, XCircle, Clock,
  Newspaper, Image as ImageIcon, Bell, Calendar,
} from "lucide-react";

interface Props {
  stats: {
    totalStudents: number;
    totalStaff: number;
    attendanceRateToday: number;
    feesCollectedThisTerm: number;
  };
  attendanceTrend: any[];
  termFees: any[];
  applications: any[];
  recentUsers: any[];
}

function KPICard({ icon: Icon, label, value, sub, color }: any) {
  return (
    <div className="stat-card flex items-start gap-4">
      <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <p className="text-[12px] font-medium text-[#6B7280] uppercase tracking-wider">{label}</p>
        <p className="font-heading text-[28px] font-bold text-[#1A2B49] mt-0.5">{value}</p>
        {sub && <p className="text-[12px] text-[#6B7280] mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function AttendanceTrendChart({ data }: { data: any[] }) {
  const chartData = data.map((d) => ({
    date: format(new Date(d.date), "d MMM"),
    rate: d._count?.status || 0,
  }));

  return (
    <div className="bg-white border border-[#E5E3DF] p-6">
      <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4">
        Attendance Trend (30 days)
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ fontSize: 13, border: "1px solid #E5E3DF", borderRadius: 4 }} />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#1A2B49"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: schoolConfig.brand.accentColor }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function FinancialSummary({ fees }: { fees: any[] }) {
  const byStatus = {
    paid: fees.filter((f) => f.status === "paid").reduce((s, f) => s + f.amount, 0),
    pending: fees.filter((f) => f.status === "pending").reduce((s, f) => s + f.amount, 0),
    overdue: fees.filter((f) => f.status === "overdue").reduce((s, f) => s + f.amount, 0),
  };

  const data = [
    { name: "Collected", value: byStatus.paid, fill: "#3D5A45" },
    { name: "Pending", value: byStatus.pending, fill: "#1A2B49" },
    { name: "Overdue", value: byStatus.overdue, fill: schoolConfig.brand.accentColor },
  ];

  return (
    <div className="bg-white border border-[#E5E3DF] p-6">
      <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4">
        Fee Collection Summary
      </h3>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
          <XAxis type="number" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `${schoolConfig.currency.symbol}${(v / 1000).toFixed(0)}k`} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#1A2B49" }} axisLine={false} tickLine={false} width={60} />
          <Tooltip formatter={(v: any) => [`${schoolConfig.currency.symbol}${Number(v).toLocaleString(schoolConfig.currency.locale)}`, "Amount"]} contentStyle={{ fontSize: 13, border: "1px solid #E5E3DF", borderRadius: 4 }} />
          <Bar dataKey="value" radius={[0, 2, 2, 0]}>
            {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function EnrollmentPipeline({ applications }: { applications: any[] }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const statusMap: Record<string, any> = {
    applied: "info",
    shortlisted: "warning",
    admitted: "success",
    rejected: "danger",
  };

  const filtered = statusFilter === "all"
    ? applications
    : applications.filter((a) => a.status === statusFilter);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  return (
    <div className="bg-white border border-[#E5E3DF] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49]">Admissions Pipeline</h3>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-[13px] border border-[#E5E3DF] px-2 py-1 rounded focus:outline-none text-[#1A2B49]"
        >
          <option value="all">All</option>
          <option value="applied">Applied</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="admitted">Admitted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Applied</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <tr key={app.id}>
                <td className="font-medium">{app.firstName} {app.lastName}</td>
                <td>{app.class}</td>
                <td>{format(new Date(app.appliedAt), "d MMM yyyy")}</td>
                <td>
                  <Badge variant={statusMap[app.status] || "default"} size="sm">
                    {app.status}
                  </Badge>
                </td>
                <td>
                  <select
                    defaultValue={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                    className="text-[12px] border border-[#E5E3DF] px-1.5 py-1 rounded focus:outline-none text-[#1A2B49]"
                  >
                    <option value="applied">Applied</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="admitted">Admitted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserManagement({ users }: { users: any[] }) {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = async (id: string, active: boolean) => {
    await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
  };

  return (
    <div className="bg-white border border-[#E5E3DF] p-6">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] flex-1">User Management</h3>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="px-3 py-1.5 text-[13px] border border-[#E5E3DF] rounded focus:outline-none focus:border-[#1A2B49] text-[#1A2B49] placeholder:text-[#9CA3AF]"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id}>
                <td className="font-medium">{user.name}</td>
                <td className="text-[#6B7280]">{user.email}</td>
                <td>
                  <Badge variant="outline" size="sm" className="capitalize">{user.role}</Badge>
                </td>
                <td>
                  <Badge variant={user.active ? "success" : "danger"} size="sm">
                    {user.active ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td>
                  <button
                    onClick={() => toggleActive(user.id, user.active)}
                    className="text-[12px] text-terracotta hover:underline"
                  >
                    {user.active ? "Deactivate" : "Activate"}
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

function ContentManagement() {
  const [tab, setTab] = useState<"news" | "announcement" | "event">("announcement");
  const [form, setForm] = useState({ title: "", body: "", type: "", targetRole: "all", startDate: "", endDate: "" });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const endpoint = tab === "news" ? "/api/news" : tab === "event" ? "/api/events" : "/api/announcements";
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ title: "", body: "", type: "", targetRole: "all", startDate: "", endDate: "" });
    } catch {}
    setSaving(false);
  };

  return (
    <div className="bg-white border border-[#E5E3DF] p-6">
      <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4 flex items-center gap-2">
        <Newspaper size={16} /> Content Management
      </h3>
      <div className="flex border border-[#E5E3DF] rounded mb-4 inline-flex">
        {(["announcement", "news", "event"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-[13px] font-medium capitalize transition-colors ${
              tab === t ? "bg-[#1A2B49] text-white" : "text-[#6B7280] hover:text-[#1A2B49]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <Textarea label="Content" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={4} />
        {tab === "announcement" && (
          <div>
            <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Target Audience</label>
            <select value={form.targetRole} onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
              className="w-full px-3 py-2.5 text-[14px] border border-[#E5E3DF] rounded focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]">
              <option value="all">Everyone</option>
              <option value="parent">Parents</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
              <option value="public">Public</option>
            </select>
          </div>
        )}
        {tab === "event" && (
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start Date" type="datetime-local" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            <Input label="End Date" type="datetime-local" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          </div>
        )}
        <Button variant="primary" size="md" onClick={handleSave} loading={saving}>
          Publish {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </Button>
      </div>
    </div>
  );
}

export default function AdminDashboardClient({ stats, attendanceTrend, termFees, applications, recentUsers }: Props) {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Admin Dashboard</h2>
        <p className="text-[14px] text-[#6B7280]">{format(new Date(), "EEEE, d MMMM yyyy")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={GraduationCap} label="Total Students" value={stats.totalStudents.toLocaleString()} color="bg-[#1A2B49]" />
        <KPICard icon={Users} label="Teaching Staff" value={stats.totalStaff} color="bg-[#3D5A45]" />
        <KPICard
          icon={TrendingUp}
          label="Attendance Today"
          value={`${stats.attendanceRateToday}%`}
          sub={stats.attendanceRateToday >= 80 ? "On track" : "Below target"}
          color={stats.attendanceRateToday >= 80 ? "bg-[#3D5A45]" : "bg-terracotta"}
        />
        <KPICard
          icon={DollarSign}
          label="Fees Collected"
          value={`${schoolConfig.currency.symbol}${(stats.feesCollectedThisTerm / 1000000).toFixed(1)}M`}
          sub="Current term"
          color="bg-terracotta"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AttendanceTrendChart data={attendanceTrend} />
        <FinancialSummary fees={termFees} />
      </div>

      <EnrollmentPipeline applications={applications} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ContentManagement />
        <UserManagement users={recentUsers} />
      </div>
    </div>
  );
}

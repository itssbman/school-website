"use client";

import { useState } from "react";
import { demoRecentUsers } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { format } from "date-fns";
import { Plus, Search } from "lucide-react";

function roleVariant(r: string): "danger" | "info" | "warning" | "outline" {
  if (r === "admin")   return "danger";
  if (r === "teacher") return "info";
  if (r === "parent")  return "warning";
  return "outline";
}

export default function AdminUsersPage() {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? demoRecentUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.email.toLowerCase().includes(query.toLowerCase())
      )
    : demoRecentUsers;

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">User Management</h2>
          <p className="text-[14px] text-[#6B7280]">{demoRecentUsers.length} users · {demoRecentUsers.filter((u) => u.active).length} active</p>
        </div>
        <button
          disabled
          title="Available in full version"
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7] flex-shrink-0"
        >
          <Plus size={14} />
          Invite User
        </button>
      </div>

      {/* Live search */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email…"
          className="w-full pl-9 pr-4 py-2.5 text-[13px] border border-[#E5E3DF] bg-white text-[#1A2B49] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1A2B49]"
        />
      </div>

      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-[#6B7280]">No users match your search.</td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={u.name} size="sm" />
                      <div>
                        <p className="font-medium text-[#1A2B49]">{u.name}</p>
                        <p className="text-[11px] text-[#6B7280] font-mono">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge variant={roleVariant(u.role)} size="sm" className="capitalize">{u.role}</Badge>
                  </td>
                  <td>
                    <Badge variant={u.active ? "success" : "danger"} size="sm">
                      {u.active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="text-[#6B7280] text-[13px]">{format(new Date(u.createdAt), "d MMM yyyy")}</td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button disabled title="Available in full version" className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]">Edit</button>
                      <button disabled title="Available in full version" className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]">Disable</button>
                    </div>
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

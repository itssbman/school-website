"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { useToast } from "@/components/ui/Toast";
import { format } from "date-fns";
import { Search } from "lucide-react";

function roleVariant(r: string): "danger" | "info" | "warning" | "outline" {
  if (r === "admin")   return "danger";
  if (r === "teacher") return "info";
  if (r === "parent")  return "warning";
  return "outline";
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: string;
}

interface Props {
  initialUsers: User[];
}

export default function UsersClient({ initialUsers }: Props) {
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [resetting, setResetting] = useState<string | null>(null);

  const filtered = query.trim()
    ? users.filter((u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase()) ||
        u.role.toLowerCase().includes(query.toLowerCase())
      )
    : users;

  async function handleToggle(id: string, active: boolean, name: string) {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      });
      if (!res.ok) throw new Error();
      setUsers((prev) => prev.map((u) => u.id === id ? { ...u, active: !active } : u));
      toast(`${name} ${!active ? "activated" : "deactivated"}.`, "success");
    } catch {
      toast("Failed to update user status.", "error");
    }
  }

  async function handleResetPassword(id: string, name: string) {
    const newPassword = prompt(`Enter new password for ${name}:`);
    if (!newPassword || newPassword.length < 8) {
      toast("Password must be at least 8 characters.", "error");
      return;
    }
    setResetting(id);
    try {
      const res = await fetch(`/api/users/${id}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      if (!res.ok) throw new Error();
      toast(`Password reset for ${name}.`, "success");
    } catch {
      toast("Failed to reset password.", "error");
    } finally {
      setResetting(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">User Management</h2>
          <p className="text-[14px] text-[#6B7280]">
            {users.length} users · {users.filter((u) => u.active).length} active
          </p>
        </div>
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, or role…"
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
                      <button
                        onClick={() => handleToggle(u.id, u.active, u.name)}
                        className={`text-[12px] border border-[#E5E3DF] px-3 py-1 bg-[#F9F8F7] transition-colors ${
                          u.active ? "text-[#C2593F] hover:border-[#C2593F]" : "text-[#3D5A45] hover:border-[#3D5A45]"
                        }`}
                      >
                        {u.active ? "Disable" : "Enable"}
                      </button>
                      <button
                        onClick={() => handleResetPassword(u.id, u.name)}
                        disabled={resetting === u.id}
                        className="text-[12px] border border-[#E5E3DF] px-3 py-1 bg-[#F9F8F7] text-[#1A2B49] hover:border-[#1A2B49] transition-colors disabled:opacity-50"
                      >
                        {resetting === u.id ? "…" : "Reset PW"}
                      </button>
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

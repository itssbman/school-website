import { demoStaff } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { Plus } from "lucide-react";

export default function AdminStaffPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Staff</h2>
          <p className="text-[14px] text-[#6B7280]">{demoStaff.length} staff members · {demoStaff.filter((s) => s.active).length} active</p>
        </div>
        <button
          disabled
          title="Available in full version"
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
        >
          <Plus size={14} />
          Add Staff
        </button>
      </div>

      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Subjects</th>
              <th>Email</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demoStaff.map((s) => (
              <tr key={s.id}>
                <td>
                  <div className="flex items-center gap-2.5">
                    <Avatar name={s.name} size="sm" />
                    <span className="font-medium text-[#1A2B49]">{s.name}</span>
                  </div>
                </td>
                <td>
                  <Badge variant={s.role === "admin" ? "info" : "outline"} size="sm" className="capitalize">
                    {s.role}
                  </Badge>
                </td>
                <td className="text-[#6B7280] text-[13px]">
                  {s.subjects.length > 0 ? s.subjects.join(", ") : <span className="text-[#9CA3AF]">—</span>}
                </td>
                <td className="font-mono text-[12px] text-[#6B7280]">{s.email}</td>
                <td className="text-center">
                  <Badge variant={s.active ? "success" : "danger"} size="sm">
                    {s.active ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="text-center">
                  <button
                    disabled
                    title="Available in full version"
                    className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
                  >
                    Edit
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

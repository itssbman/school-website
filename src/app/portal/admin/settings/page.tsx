import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import schoolConfig from "../../../../../school.config";

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Settings</h2>
        <p className="text-[14px] text-[#6B7280]">School configuration and system preferences</p>
      </div>

      {/* School info (read-only from school.config) */}
      <div className="bg-white border border-[#E5E3DF]">
        <div className="px-5 py-4 border-b border-[#E5E3DF] bg-[#F9F8F7]">
          <p className="text-[13px] font-semibold text-[#1A2B49]">School Information</p>
          <p className="text-[12px] text-[#6B7280] mt-0.5">Configured in school.config.ts</p>
        </div>
        <div className="divide-y divide-[#E5E3DF]">
          {[
            { label: "School Name", value: schoolConfig.name },
            { label: "Tagline", value: schoolConfig.tagline },
            { label: "Established", value: schoolConfig.established },
            { label: "Location", value: schoolConfig.location },
            { label: "Address", value: schoolConfig.contact.address.full },
            { label: "Phone", value: schoolConfig.contact.phone[0] },
            { label: "Email", value: schoolConfig.contact.email.info },
            { label: "Currency", value: `${schoolConfig.currency.code} (${schoolConfig.currency.symbol})` },
          ].map(({ label, value }) => (
            <div key={label} className="px-5 py-4 flex items-center justify-between gap-4">
              <span className="text-[13px] font-medium text-[#6B7280] w-40 flex-shrink-0">{label}</span>
              <span className="text-[13px] text-[#1A2B49]">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Demo accounts */}
      <div className="bg-white border border-[#E5E3DF]">
        <div className="px-5 py-4 border-b border-[#E5E3DF] bg-[#F9F8F7]">
          <p className="text-[13px] font-semibold text-[#1A2B49]">Demo Accounts</p>
          <p className="text-[12px] text-[#6B7280] mt-0.5">
            All use password: <span className="font-mono font-medium">Demo1234!</span>
          </p>
        </div>
        <div className="divide-y divide-[#E5E3DF]">
          {[
            { role: "Admin",   email: "admin@demo.schoolkit.ng" },
            { role: "Teacher", email: "teacher@demo.schoolkit.ng" },
            { role: "Parent",  email: "parent@demo.schoolkit.ng" },
            { role: "Student", email: "student@demo.schoolkit.ng" },
          ].map(({ role, email }) => (
            <div key={role} className="px-5 py-4 flex items-center justify-between gap-4">
              <span className="text-[13px] font-medium text-[#6B7280] w-24 flex-shrink-0">{role}</span>
              <span className="text-[13px] font-mono text-[#1A2B49]">{email}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#FEF3EF] border border-[#F5D0C5] p-4">
        <p className="text-[13px] text-[#C2593F] font-medium">Configuration Note</p>
        <p className="text-[12px] text-[#C2593F] mt-1">
          To update school branding, name, or contact details, edit{" "}
          <span className="font-mono">school.config.ts</span> in the project root.
          Environment variables are managed via <span className="font-mono">.env.local</span>.
        </p>
      </div>
    </div>
  );
}

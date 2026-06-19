"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, GraduationCap, BookOpen, Settings, ArrowRight } from "lucide-react";
import schoolConfig from "../../../school.config";

const roles = [
  {
    id: "parent" as const,
    label: "Parent",
    emoji: "👨‍👩‍👧",
    icon: Users,
    href: "/portal/parent",
    description: "View your children's grades, attendance records, fee status, and send messages to teachers.",
    accent: "#1A2B49",
  },
  {
    id: "student" as const,
    label: "Student",
    emoji: "👨‍🎓",
    icon: GraduationCap,
    href: "/portal/student",
    description: "Check your timetable, submit assignments, review grades, and stay on top of school events.",
    accent: "#3D5A45",
  },
  {
    id: "teacher" as const,
    label: "Teacher",
    emoji: "👩‍🏫",
    icon: BookOpen,
    href: "/portal/teacher",
    description: "Mark daily attendance, create and grade assignments, upload lesson plans, and message parents.",
    accent: "#C2593F",
  },
  {
    id: "admin" as const,
    label: "Admin",
    emoji: "⚙️",
    icon: Settings,
    href: "/portal/admin",
    description: "Manage users, admissions pipeline, analytics, fee collection, and all school content.",
    accent: "#6B7280",
  },
];

export default function LoginForm() {
  const router = useRouter();

  const enterDemo = (roleId: string, href: string) => {
    document.cookie = `demo_role=${roleId}; path=/; max-age=86400; SameSite=Lax`;
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="mb-10 text-center">
        <h1 className="font-heading text-[26px] font-bold text-[#1A2B49]">{schoolConfig.name}</h1>
        <p className="text-[13px] text-[#6B7280] mt-0.5">Student &amp; Staff Portal</p>
      </Link>

      {/* Header */}
      <div className="w-full max-w-[600px] mb-6 text-center">
        <div className="inline-block bg-terracotta/10 text-terracotta text-[11px] font-semibold uppercase tracking-widest px-3 py-1 mb-4">
          Demo Mode
        </div>
        <h2 className="font-heading text-[28px] font-bold text-[#1A2B49] mb-2">View Demo As</h2>
        <p className="text-[15px] text-[#6B7280]">
          Choose a role to explore the portal. No login required.
        </p>
      </div>

      {/* Role cards */}
      <div className="w-full max-w-[600px] grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roles.map(({ id, label, emoji, href, description, accent }) => (
          <button
            key={id}
            onClick={() => enterDemo(id, href)}
            className="group text-left bg-white border border-[#E5E3DF] p-6 hover:border-[#1A2B49] hover:shadow-card transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A2B49]"
          >
            {/* Icon row */}
            <div
              className="w-12 h-12 flex items-center justify-center text-[24px] mb-4"
              style={{ backgroundColor: `${accent}15` }}
            >
              <span role="img" aria-label={label}>{emoji}</span>
            </div>

            {/* Content */}
            <h3 className="font-heading text-[18px] font-semibold text-[#1A2B49] mb-1">
              {label}
            </h3>
            <p className="text-[13px] text-[#6B7280] leading-relaxed mb-5">{description}</p>

            {/* CTA */}
            <span
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold group-hover:gap-2.5 transition-all"
              style={{ color: accent }}
            >
              Enter as {label}
              <ArrowRight size={14} />
            </span>
          </button>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-8 text-center space-y-2">
        <p className="text-[12px] text-[#9CA3AF]">
          All data shown is fictional demo content — no real student information.
        </p>
        <Link href="/" className="text-[13px] text-[#6B7280] hover:text-[#1A2B49] transition-colors">
          ← Back to school website
        </Link>
      </div>
    </div>
  );
}

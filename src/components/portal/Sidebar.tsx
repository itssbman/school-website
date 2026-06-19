"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Avatar from "@/components/ui/Avatar";
import schoolConfig from "../../../school.config";
import {
  LayoutDashboard, Users, BookOpen, Calendar, MessageSquare,
  Bell, FileText, DollarSign, ClipboardList, Library,
  Upload, Settings, LogOut, GraduationCap,
  BarChart3, UserCheck, Newspaper, Image as ImageIcon,
  ClipboardCheck, BookMarked,
} from "lucide-react";

function getNavItems(role: string) {
  switch (role) {
    case "parent":
      return [
        { label: "Dashboard", href: "/portal/parent", icon: LayoutDashboard },
        { label: "My Children", href: "/portal/parent/children", icon: Users },
        { label: "Grades", href: "/portal/parent/grades", icon: BookOpen },
        { label: "Attendance", href: "/portal/parent/attendance", icon: ClipboardCheck },
        { label: "Assignments", href: "/portal/parent/assignments", icon: ClipboardList },
        { label: "Fee Records", href: "/portal/parent/fees", icon: DollarSign },
        { label: "Messages", href: "/portal/parent/messages", icon: MessageSquare },
        { label: "Announcements", href: "/portal/parent/announcements", icon: Bell },
        { label: "Report Cards", href: "/portal/parent/reports", icon: FileText },
      ];
    case "student":
      return [
        { label: "Dashboard", href: "/portal/student", icon: LayoutDashboard },
        { label: "Timetable", href: "/portal/student/timetable", icon: Calendar },
        { label: "Assignments", href: "/portal/student/assignments", icon: ClipboardList },
        { label: "Grades", href: "/portal/student/grades", icon: BookOpen },
        { label: "Resources", href: "/portal/student/resources", icon: Library },
        { label: "Library", href: "/portal/student/library", icon: BookMarked },
        { label: "Events", href: "/portal/student/events", icon: Calendar },
        { label: "Messages", href: "/portal/student/messages", icon: MessageSquare },
      ];
    case "teacher":
      return [
        { label: "Dashboard", href: "/portal/teacher", icon: LayoutDashboard },
        { label: "My Classes", href: "/portal/teacher/classes", icon: Users },
        { label: "Attendance", href: "/portal/teacher/attendance", icon: ClipboardCheck },
        { label: "Grade Entry", href: "/portal/teacher/grades", icon: BookOpen },
        { label: "Assignments", href: "/portal/teacher/assignments", icon: ClipboardList },
        { label: "Lesson Plans", href: "/portal/teacher/lesson-plans", icon: Upload },
        { label: "Announcements", href: "/portal/teacher/announcements", icon: Bell },
        { label: "Messages", href: "/portal/teacher/messages", icon: MessageSquare },
      ];
    case "admin":
      return [
        { label: "Dashboard", href: "/portal/admin", icon: LayoutDashboard },
        { label: "Analytics", href: "/portal/admin/analytics", icon: BarChart3 },
        { label: "Users", href: "/portal/admin/users", icon: Users },
        { label: "Students", href: "/portal/admin/students", icon: GraduationCap },
        { label: "Admissions", href: "/portal/admin/admissions", icon: UserCheck },
        { label: "Fee Management", href: "/portal/admin/fees", icon: DollarSign },
        { label: "Announcements", href: "/portal/admin/announcements", icon: Bell },
        { label: "Events", href: "/portal/admin/events", icon: Calendar },
        { label: "News", href: "/portal/admin/news", icon: Newspaper },
        { label: "Gallery", href: "/portal/admin/gallery", icon: ImageIcon },
        { label: "Exam Schedule", href: "/portal/admin/exams", icon: ClipboardList },
        { label: "Settings", href: "/portal/admin/settings", icon: Settings },
      ];
    default:
      return [];
  }
}

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role || "student";
  const navItems = getNavItems(role);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-4 py-5 border-b border-[#E5E3DF]">
        <Link href="/" className="block">
          <span className="font-heading text-[16px] font-bold text-[#1A2B49]">{schoolConfig.name}</span>
          <p className="text-[11px] text-[#6B7280] mt-0.5 capitalize">{role} Portal</p>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (pathname.startsWith(item.href + "/") && item.href !== "/portal/" + role);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onMobileClose}
                  className={`portal-nav-link ${isActive ? "active" : ""}`}
                >
                  <Icon size={16} className="flex-shrink-0" />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1 h-4 bg-terracotta rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-[#E5E3DF]">
        <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
          <Avatar
            src={session?.user?.avatar}
            name={session?.user?.name || "User"}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-[#1A2B49] truncate">
              {session?.user?.name || "User"}
            </p>
            <p className="text-[11px] text-[#6B7280] truncate capitalize">{role}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="portal-nav-link w-full text-left text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex w-[240px] flex-shrink-0 bg-white border-r border-[#E5E3DF] h-screen sticky top-0 flex-col overflow-hidden">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 md:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-[240px] bg-white border-r border-[#E5E3DF] md:hidden overflow-y-auto"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

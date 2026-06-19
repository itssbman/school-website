export type Role = "parent" | "student" | "teacher" | "admin";
export type AttendanceStatus = "present" | "absent" | "late";
export type FeeStatus = "paid" | "pending" | "overdue";
export type ApplicationStatus = "applied" | "shortlisted" | "admitted" | "rejected";

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface DashboardStats {
  totalStudents: number;
  totalStaff: number;
  attendanceRateToday: number;
  feesCollectedThisTerm: number;
}

export interface AttendanceSummary {
  present: number;
  absent: number;
  late: number;
  total: number;
  percentage: number;
}

export interface GradeEntry {
  subject: string;
  score: number;
  term: string;
}

export interface FeeInfo {
  amount: number;
  paid: number;
  balance: number;
  status: FeeStatus;
  dueDate: string;
}

export interface MessageThread {
  id: string;
  otherUser: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
  };
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
}

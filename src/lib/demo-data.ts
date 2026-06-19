// Static mock data for demo mode — no database required.
// All 4 portal dashboards read from this file.

export const demoUsers = {
  parent:  { name: "Demo Parent One",   role: "parent"  as const, avatar: undefined },
  student: { name: "Ada Sample",        role: "student" as const, avatar: undefined },
  teacher: { name: "Mr. Alex Demo",     role: "teacher" as const, avatar: undefined },
  admin:   { name: "Demo Admin",        role: "admin"   as const, avatar: undefined },
};

// ── Grades ─────────────────────────────────────────────────────────────────

const adaGrades = [
  // Term 1 2024/25
  { id: "g1",  subject: "Mathematics",      score: 82, term: "Term 1 2024/25", createdAt: "2024-12-01T00:00:00.000Z" },
  { id: "g2",  subject: "English Language", score: 75, term: "Term 1 2024/25", createdAt: "2024-12-01T00:00:00.000Z" },
  { id: "g3",  subject: "Physics",          score: 68, term: "Term 1 2024/25", createdAt: "2024-12-01T00:00:00.000Z" },
  { id: "g4",  subject: "Chemistry",        score: 71, term: "Term 1 2024/25", createdAt: "2024-12-01T00:00:00.000Z" },
  { id: "g5",  subject: "Biology",          score: 78, term: "Term 1 2024/25", createdAt: "2024-12-01T00:00:00.000Z" },
  { id: "g6",  subject: "History",          score: 65, term: "Term 1 2024/25", createdAt: "2024-12-01T00:00:00.000Z" },
  // Term 2 2024/25
  { id: "g7",  subject: "Mathematics",      score: 85, term: "Term 2 2024/25", createdAt: "2025-04-01T00:00:00.000Z" },
  { id: "g8",  subject: "English Language", score: 79, term: "Term 2 2024/25", createdAt: "2025-04-01T00:00:00.000Z" },
  { id: "g9",  subject: "Physics",          score: 72, term: "Term 2 2024/25", createdAt: "2025-04-01T00:00:00.000Z" },
  { id: "g10", subject: "Chemistry",        score: 74, term: "Term 2 2024/25", createdAt: "2025-04-01T00:00:00.000Z" },
  { id: "g11", subject: "Biology",          score: 80, term: "Term 2 2024/25", createdAt: "2025-04-01T00:00:00.000Z" },
  { id: "g12", subject: "History",          score: 69, term: "Term 2 2024/25", createdAt: "2025-04-01T00:00:00.000Z" },
  // Term 1 2025/26
  { id: "g13", subject: "Mathematics",      score: 88, term: "Term 1 2025/26", createdAt: "2025-12-01T00:00:00.000Z" },
  { id: "g14", subject: "English Language", score: 82, term: "Term 1 2025/26", createdAt: "2025-12-01T00:00:00.000Z" },
  { id: "g15", subject: "Physics",          score: 76, term: "Term 1 2025/26", createdAt: "2025-12-01T00:00:00.000Z" },
  { id: "g16", subject: "Chemistry",        score: 79, term: "Term 1 2025/26", createdAt: "2025-12-01T00:00:00.000Z" },
  { id: "g17", subject: "Biology",          score: 83, term: "Term 1 2025/26", createdAt: "2025-12-01T00:00:00.000Z" },
  { id: "g18", subject: "History",          score: 71, term: "Term 1 2025/26", createdAt: "2025-12-01T00:00:00.000Z" },
];

const benGrades = [
  { id: "bg1",  subject: "Mathematics",      score: 65, term: "Term 1 2024/25", createdAt: "2024-12-01T00:00:00.000Z" },
  { id: "bg2",  subject: "English Language", score: 70, term: "Term 1 2024/25", createdAt: "2024-12-01T00:00:00.000Z" },
  { id: "bg3",  subject: "Physics",          score: 58, term: "Term 1 2024/25", createdAt: "2024-12-01T00:00:00.000Z" },
  { id: "bg4",  subject: "Chemistry",        score: 62, term: "Term 1 2024/25", createdAt: "2024-12-01T00:00:00.000Z" },
  { id: "bg5",  subject: "Biology",          score: 69, term: "Term 1 2024/25", createdAt: "2024-12-01T00:00:00.000Z" },
  { id: "bg6",  subject: "History",          score: 72, term: "Term 1 2024/25", createdAt: "2024-12-01T00:00:00.000Z" },
  { id: "bg7",  subject: "Mathematics",      score: 68, term: "Term 2 2024/25", createdAt: "2025-04-01T00:00:00.000Z" },
  { id: "bg8",  subject: "English Language", score: 73, term: "Term 2 2024/25", createdAt: "2025-04-01T00:00:00.000Z" },
  { id: "bg9",  subject: "Physics",          score: 61, term: "Term 2 2024/25", createdAt: "2025-04-01T00:00:00.000Z" },
  { id: "bg10", subject: "Chemistry",        score: 65, term: "Term 2 2024/25", createdAt: "2025-04-01T00:00:00.000Z" },
  { id: "bg11", subject: "Biology",          score: 71, term: "Term 2 2024/25", createdAt: "2025-04-01T00:00:00.000Z" },
  { id: "bg12", subject: "History",          score: 74, term: "Term 2 2024/25", createdAt: "2025-04-01T00:00:00.000Z" },
];

// ── Attendance ──────────────────────────────────────────────────────────────

function makeAttendance(id: string, statuses: string[]) {
  return statuses.map((status, i) => {
    const d = new Date("2026-06-19T00:00:00.000Z");
    d.setDate(d.getDate() - (statuses.length - 1 - i));
    return { id: `${id}-${i}`, status, date: d.toISOString() };
  });
}

// 60 entries, ~85% present
const adaStatuses = [
  "present","present","present","present","present","present","present","present","late","present",
  "present","present","present","present","present","absent","present","present","present","present",
  "present","present","present","present","late","present","present","present","present","present",
  "present","absent","present","present","present","present","present","present","present","present",
  "present","present","late","present","present","present","present","present","absent","present",
  "present","present","present","present","present","present","present","present","late","present",
];

// 60 entries, ~78% present
const benStatuses = [
  "present","present","absent","present","present","present","late","present","present","present",
  "absent","present","present","present","present","late","present","absent","present","present",
  "present","present","present","absent","present","present","present","late","present","present",
  "present","present","absent","present","present","present","present","late","present","present",
  "present","absent","present","present","present","late","present","present","present","absent",
  "present","present","present","present","late","present","present","present","absent","present",
];

const adaAttendance  = makeAttendance("ada", adaStatuses);
const benAttendance  = makeAttendance("ben", benStatuses);

// ── Fee Records ─────────────────────────────────────────────────────────────

const adaFeeRecords = [
  { id: "fee-ada-1", amount: 750000, status: "paid",    term: "Term 1 2025/26", dueDate: "2025-09-30T00:00:00.000Z", paidAt: "2025-09-25T00:00:00.000Z" },
  { id: "fee-ada-2", amount: 750000, status: "pending", term: "Term 2 2025/26", dueDate: "2026-01-31T00:00:00.000Z", paidAt: null },
];

const benFeeRecords = [
  { id: "fee-ben-1", amount: 750000, status: "paid",    term: "Term 1 2025/26", dueDate: "2025-09-30T00:00:00.000Z", paidAt: "2025-09-28T00:00:00.000Z" },
  { id: "fee-ben-2", amount: 750000, status: "overdue", term: "Term 2 2025/26", dueDate: "2026-01-31T00:00:00.000Z", paidAt: null },
];

// ── Assignments ─────────────────────────────────────────────────────────────

export const demoAssignments = [
  { id: "assign-1", title: "Mathematics Assignment — Term 2",    dueDate: "2026-06-25T23:59:00.000Z", classId: "JSS1A", submissions: [{ id: "sub-x1" }, { id: "sub-x2" }] },
  { id: "assign-2", title: "English Essay — My Ideal Community", dueDate: "2026-07-05T23:59:00.000Z", classId: "JSS1A", submissions: [{ id: "sub-x3" }] },
  { id: "assign-3", title: "Physics Lab Report",                 dueDate: "2026-06-30T23:59:00.000Z", classId: "JSS1A", submissions: [] },
];

// Ada has submitted assign-2; assign-1 and assign-3 are still pending for her
const adaSubmissions = [
  {
    id: "sub-ada-1",
    assignmentId: "assign-2",
    submittedAt: "2026-06-20T10:30:00.000Z",
    assignment: { title: "English Essay — My Ideal Community", dueDate: "2026-07-05T23:59:00.000Z" },
  },
];

// ── Student ─────────────────────────────────────────────────────────────────

export const demoStudent = {
  id: "student-1",
  class: "JSS1A",
  admissionNumber: "DS/2024/0001",
  user: { name: "Ada Sample", avatar: undefined },
  grades: adaGrades,
  attendance: adaAttendance,
  submissions: adaSubmissions,
};

// ── Parent (with two children) ───────────────────────────────────────────────

export const demoParent = {
  id: "parent-1",
  children: [
    {
      id: "student-1",
      class: "JSS1A",
      admissionNumber: "DS/2024/0001",
      user: { name: "Ada Sample", avatar: undefined },
      grades: adaGrades,
      attendance: adaAttendance,
      feeRecords: adaFeeRecords,
      submissions: adaSubmissions,
    },
    {
      id: "student-2",
      class: "JSS2A",
      admissionNumber: "DS/2023/0002",
      user: { name: "Ben Sample", avatar: undefined },
      grades: benGrades,
      attendance: benAttendance,
      feeRecords: benFeeRecords,
      submissions: [],
    },
  ],
};

// ── Teacher ──────────────────────────────────────────────────────────────────

export const demoTeacher = {
  id: "teacher-1",
  classes: ["JSS1A", "SS1A"],
  subjects: ["Mathematics", "Physics"],
  user: { name: "Mr. Alex Demo", avatar: undefined },
  assignments: demoAssignments,
};

export const demoStudentsByClass = [
  {
    class: "JSS1A",
    students: Array.from({ length: 8 }, (_, i) => ({
      id: `stu-jss1a-${i}`,
      class: "JSS1A",
      user: { name: `Demo Student ${String(i + 1).padStart(2, "0")}`, avatar: undefined },
    })),
  },
  {
    class: "SS1A",
    students: Array.from({ length: 6 }, (_, i) => ({
      id: `stu-ss1a-${i}`,
      class: "SS1A",
      user: { name: `Demo Student ${String(i + 11).padStart(2, "0")}`, avatar: undefined },
    })),
  },
];

// ── Timetable (all days, JSS1A) ───────────────────────────────────────────────

export const demoTimetableAll = [
  { id: "tt-1",  day: "Monday",    class: "JSS1A", subject: "Mathematics",      period: 1, startTime: "08:00", endTime: "09:00" },
  { id: "tt-2",  day: "Monday",    class: "JSS1A", subject: "English Language", period: 2, startTime: "09:00", endTime: "10:00" },
  { id: "tt-3",  day: "Monday",    class: "JSS1A", subject: "Physics",          period: 3, startTime: "10:30", endTime: "11:30" },
  { id: "tt-4",  day: "Tuesday",   class: "JSS1A", subject: "Economics",        period: 1, startTime: "08:00", endTime: "09:00" },
  { id: "tt-5",  day: "Tuesday",   class: "JSS1A", subject: "Biology",          period: 2, startTime: "09:00", endTime: "10:00" },
  { id: "tt-6",  day: "Tuesday",   class: "JSS1A", subject: "Chemistry",        period: 3, startTime: "10:30", endTime: "11:30" },
  { id: "tt-7",  day: "Wednesday", class: "JSS1A", subject: "History",          period: 1, startTime: "08:00", endTime: "09:00" },
  { id: "tt-8",  day: "Wednesday", class: "JSS1A", subject: "Mathematics",      period: 2, startTime: "09:00", endTime: "10:00" },
  { id: "tt-9",  day: "Wednesday", class: "JSS1A", subject: "Civic Education",  period: 3, startTime: "10:30", endTime: "11:30" },
  { id: "tt-10", day: "Thursday",  class: "JSS1A", subject: "English Language", period: 1, startTime: "08:00", endTime: "09:00" },
  { id: "tt-11", day: "Thursday",  class: "JSS1A", subject: "Physics",          period: 2, startTime: "09:00", endTime: "10:00" },
  { id: "tt-12", day: "Thursday",  class: "JSS1A", subject: "Biology",          period: 3, startTime: "10:30", endTime: "11:30" },
  { id: "tt-13", day: "Friday",    class: "JSS1A", subject: "Mathematics",      period: 1, startTime: "08:00", endTime: "09:00" },
  { id: "tt-14", day: "Friday",    class: "JSS1A", subject: "Creative Arts",    period: 2, startTime: "09:00", endTime: "10:00" },
  { id: "tt-15", day: "Friday",    class: "JSS1A", subject: "Physical Ed.",     period: 3, startTime: "10:30", endTime: "11:30" },
];

// ── Events ───────────────────────────────────────────────────────────────────

export const demoEvents = [
  { id: "evt-1", title: "Parents-Teachers Forum",      type: "Meeting",  startDate: "2026-07-03T09:00:00.000Z" },
  { id: "evt-2", title: "End-of-Term Examinations",   type: "Academic", startDate: "2026-07-07T08:00:00.000Z" },
  { id: "evt-3", title: "Annual Sports Day",           type: "Sports",   startDate: "2026-07-18T09:00:00.000Z" },
];

// ── Announcements ─────────────────────────────────────────────────────────────

export const demoAnnouncements = {
  parent: [
    { id: "ann-p1", title: "Term 2 Fee Payment Reminder",  body: "Parents are reminded that Term 2 school fees are due by 31st January 2026. Please ensure prompt payment to avoid late charges.", createdAt: "2026-06-01T09:00:00.000Z" },
    { id: "ann-p2", title: "Sports Day 2026 — Save the Date", body: "The Annual Inter-House Sports Day will be held on 18th July 2026. Parents are warmly invited to attend and cheer on their children.", createdAt: "2026-05-15T09:00:00.000Z" },
  ],
  student: [
    { id: "ann-s1", title: "Library Hours Extended",        body: "The school library will remain open until 6:00 PM on weekdays to support students during exam preparation season.", createdAt: "2026-06-10T09:00:00.000Z" },
    { id: "ann-s2", title: "End-of-Term Examination Schedule", body: "End-of-term exams begin 7th July 2026. Collect your timetable from the school office before 30th June.", createdAt: "2026-06-05T09:00:00.000Z" },
  ],
  teacher: [
    { id: "ann-t1", title: "Staff Professional Development Day", body: "A mandatory CPD session has been scheduled for 1st July 2026. All teaching staff must attend. Details via email.", createdAt: "2026-06-12T09:00:00.000Z" },
    { id: "ann-t2", title: "Report Card Submission Deadline", body: "All subject scores must be entered into the portal by 10th July 2026. Late submissions will not be processed.", createdAt: "2026-06-08T09:00:00.000Z" },
  ],
};

// ── Admin ─────────────────────────────────────────────────────────────────────

export const demoAdminStats = {
  totalStudents: 1247,
  totalStaff: 84,
  attendanceRateToday: 87,
  feesCollectedThisTerm: 9_000_000,
};

// Last 30 days of attendance records
const attendanceCounts = [22,25,23,28,24,26,22,27,25,24,26,28,23,25,27,24,26,25,28,22,24,27,25,26,23,28,24,25,27,26];
export const demoAttendanceTrend = attendanceCounts.map((count, i) => {
  const d = new Date("2026-05-20T00:00:00.000Z");
  d.setDate(d.getDate() + i);
  return { date: d.toISOString(), _count: { status: count } };
});

export const demoTermFees = [
  ...Array.from({ length: 12 }, (_, i) => ({ id: `tf-p-${i}`,    amount: 750000, status: "paid"    as const, term: "Term 1 2025/26" })),
  ...Array.from({ length: 8  }, (_, i) => ({ id: `tf-pend-${i}`, amount: 750000, status: "pending" as const, term: "Term 1 2025/26" })),
  ...Array.from({ length: 5  }, (_, i) => ({ id: `tf-ov-${i}`,   amount: 750000, status: "overdue" as const, term: "Term 1 2025/26" })),
];

export const demoApplications = [
  { id: "app-1", firstName: "Demo", lastName: "Applicant One",   email: "applicant1@example.com", phone: "+234 800 000 0001", class: "JSS1", status: "applied",     appliedAt: "2026-05-10T00:00:00.000Z" },
  { id: "app-2", firstName: "Demo", lastName: "Applicant Two",   email: "applicant2@example.com", phone: "+234 800 000 0002", class: "SS1",  status: "shortlisted", appliedAt: "2026-05-12T00:00:00.000Z" },
  { id: "app-3", firstName: "Demo", lastName: "Applicant Three", email: "applicant3@example.com", phone: "+234 800 000 0003", class: "JSS2", status: "admitted",    appliedAt: "2026-05-05T00:00:00.000Z" },
  { id: "app-4", firstName: "Demo", lastName: "Applicant Four",  email: "applicant4@example.com", phone: "+234 800 000 0004", class: "JSS1", status: "rejected",    appliedAt: "2026-05-08T00:00:00.000Z" },
  { id: "app-5", firstName: "Demo", lastName: "Applicant Five",  email: "applicant5@example.com", phone: "+234 800 000 0005", class: "SS2",  status: "applied",     appliedAt: "2026-06-01T00:00:00.000Z" },
];

export const demoRecentUsers = [
  { id: "u1", name: "Demo Admin",        email: "admin@yourschool.edu.ng",    role: "admin",   active: true,  createdAt: "2024-01-01T00:00:00.000Z" },
  { id: "u2", name: "Mr. Alex Demo",     email: "teacher1@yourschool.edu.ng", role: "teacher", active: true,  createdAt: "2024-01-15T00:00:00.000Z" },
  { id: "u3", name: "Mrs. Beth Demo",    email: "teacher2@yourschool.edu.ng", role: "teacher", active: true,  createdAt: "2024-01-15T00:00:00.000Z" },
  { id: "u4", name: "Demo Parent One",   email: "parent1@example.com",        role: "parent",  active: true,  createdAt: "2024-02-01T00:00:00.000Z" },
  { id: "u5", name: "Demo Parent Two",   email: "parent2@example.com",        role: "parent",  active: true,  createdAt: "2024-02-01T00:00:00.000Z" },
  { id: "u6", name: "Ada Sample",        email: "student1@yourschool.edu.ng", role: "student", active: true,  createdAt: "2024-02-15T00:00:00.000Z" },
  { id: "u7", name: "Ben Sample",        email: "student2@yourschool.edu.ng", role: "student", active: true,  createdAt: "2024-02-15T00:00:00.000Z" },
  { id: "u8", name: "Demo Student 03",   email: "student3@yourschool.edu.ng", role: "student", active: false, createdAt: "2024-02-20T00:00:00.000Z" },
];

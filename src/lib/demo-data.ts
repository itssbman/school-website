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

// ── Library Books ─────────────────────────────────────────────────────────────

export const demoLibraryBooks = [
  { id: "lib-1", title: "New General Mathematics JSS1",                author: "M.F. Macrae",       category: "Mathematics", available: true  },
  { id: "lib-2", title: "Macmillan English Grammar in Context",        author: "John Stratton",     category: "English",     available: false },
  { id: "lib-3", title: "Evans Biology for Senior Secondary Schools",  author: "C.O. Agba",         category: "Biology",     available: true  },
  { id: "lib-4", title: "Exam Focus Chemistry",                        author: "O.Y. Ababio",       category: "Chemistry",   available: true  },
  { id: "lib-5", title: "New School Physics",                          author: "M.W. Anyakoha",     category: "Physics",     available: false },
  { id: "lib-6", title: "Essential Economics for Senior Schools",      author: "C.E. Eze",          category: "Economics",   available: true  },
  { id: "lib-7", title: "Things Fall Apart",                           author: "Chinua Achebe",     category: "Literature",  available: true  },
  { id: "lib-8", title: "Purple Hibiscus",                             author: "Chimamanda Adichie", category: "Literature", available: false },
  { id: "lib-9", title: "Success in History: West Africa",             author: "O.A. Obafemi",      category: "History",     available: true  },
  { id: "lib-10", title: "Civic Education for Nigerian Schools",       author: "S.A. Bello",        category: "Civic Ed.",   available: true  },
];

// ── Student Resources ─────────────────────────────────────────────────────────

export const demoResources: Record<string, { id: string; name: string; type: "PDF" | "Link" | "Video"; size?: string }[]> = {
  Mathematics: [
    { id: "res-m1", name: "Algebra Revision Notes — Term 1",       type: "PDF",   size: "1.2 MB" },
    { id: "res-m2", name: "Past Questions 2019–2024 (WAEC Maths)", type: "PDF",   size: "3.8 MB" },
    { id: "res-m3", name: "Khan Academy — Quadratic Equations",    type: "Link" },
  ],
  "English Language": [
    { id: "res-e1", name: "Comprehension Practice Pack",           type: "PDF",   size: "980 KB" },
    { id: "res-e2", name: "Essay Writing Framework",               type: "PDF",   size: "540 KB" },
  ],
  Physics: [
    { id: "res-p1", name: "Motion & Forces — Summary Notes",       type: "PDF",   size: "1.5 MB" },
    { id: "res-p2", name: "Lab Safety Guidelines",                 type: "PDF",   size: "320 KB" },
    { id: "res-p3", name: "PhET Simulations (External)",           type: "Link" },
  ],
  Biology: [
    { id: "res-b1", name: "Cell Biology Diagrams",                 type: "PDF",   size: "2.1 MB" },
    { id: "res-b2", name: "Ecology Field Study Notes",             type: "PDF",   size: "870 KB" },
  ],
  Chemistry: [
    { id: "res-c1", name: "Periodic Table Reference Sheet",        type: "PDF",   size: "410 KB" },
    { id: "res-c2", name: "Organic Chemistry — Reaction Pathways", type: "PDF",   size: "1.3 MB" },
  ],
};

// ── Lesson Plans ──────────────────────────────────────────────────────────────

export const demoLessonPlans = [
  { id: "lp-1", title: "Week 1 — Introduction to Algebra.pdf",       uploadedAt: "2026-01-13T08:00:00.000Z", size: "420 KB", subject: "Mathematics" },
  { id: "lp-2", title: "Week 2 — Quadratic Equations.pdf",           uploadedAt: "2026-01-20T08:00:00.000Z", size: "380 KB", subject: "Mathematics" },
  { id: "lp-3", title: "Week 3 — Introduction to Trigonometry.pdf",  uploadedAt: "2026-01-27T08:00:00.000Z", size: "510 KB", subject: "Mathematics" },
  { id: "lp-4", title: "Week 4 — Statistics & Data Handling.pdf",    uploadedAt: "2026-02-03T08:00:00.000Z", size: "290 KB", subject: "Mathematics" },
  { id: "lp-5", title: "Week 5 — Motion & Linear Equations.pdf",     uploadedAt: "2026-02-10T08:00:00.000Z", size: "475 KB", subject: "Physics" },
  { id: "lp-6", title: "Week 6 — Forces & Newton's Laws.pdf",        uploadedAt: "2026-02-17T08:00:00.000Z", size: "530 KB", subject: "Physics" },
];

// ── Message Threads ───────────────────────────────────────────────────────────

export interface DemoMessage { id: string; senderId: string; body: string; createdAt: string; }
export interface DemoThread  { userId: string; name: string; unread: number; lastMessage: string; lastAt: string; messages: DemoMessage[]; }

export const demoMessageThreads: { parent: DemoThread[]; teacher: DemoThread[] } = {
  parent: [
    {
      userId: "teacher-1",
      name: "Mr. Alex Demo (Mathematics)",
      unread: 0,
      lastMessage: "Ada's algebra performance has improved significantly.",
      lastAt: "2026-06-18T14:30:00.000Z",
      messages: [
        { id: "pm-1", senderId: "teacher-1", body: "Good afternoon. I wanted to update you on Ada's progress in Mathematics.", createdAt: "2026-06-15T09:00:00.000Z" },
        { id: "pm-2", senderId: "parent-1",  body: "Thank you Mr. Demo. How is she doing with algebra?",                       createdAt: "2026-06-15T09:10:00.000Z" },
        { id: "pm-3", senderId: "teacher-1", body: "Ada's algebra performance has improved significantly. She scored 88% on the last assignment. Please keep encouraging her at home.", createdAt: "2026-06-18T14:30:00.000Z" },
      ],
    },
    {
      userId: "teacher-2",
      name: "Mrs. Beth Demo (Form Teacher)",
      unread: 1,
      lastMessage: "Ada was a star performer at the Cultural Day celebration.",
      lastAt: "2026-06-12T11:00:00.000Z",
      messages: [
        { id: "pm-4", senderId: "teacher-2", body: "Dear Parent, Ada was a star performer at today's Cultural Day celebration. The drama group was wonderful!", createdAt: "2026-06-12T11:00:00.000Z" },
        { id: "pm-5", senderId: "parent-1",  body: "Thank you for letting us know! She has been practising very hard.",                                          createdAt: "2026-06-12T18:00:00.000Z" },
      ],
    },
  ],
  teacher: [
    {
      userId: "parent-1",
      name: "Demo Parent One (Ada's parent)",
      unread: 0,
      lastMessage: "Thank you for the update on the assignment.",
      lastAt: "2026-06-18T10:00:00.000Z",
      messages: [
        { id: "tm-1", senderId: "parent-1",  body: "Good morning Mr. Demo, I wanted to ask about Ada's upcoming Mathematics assignment.", createdAt: "2026-06-17T08:30:00.000Z" },
        { id: "tm-2", senderId: "teacher-1", body: "Good morning! The assignment is due 25th June. It covers chapters 5–7: quadratic equations and graphs.", createdAt: "2026-06-17T09:00:00.000Z" },
        { id: "tm-3", senderId: "parent-1",  body: "Thank you for the update on the assignment.",                                                              createdAt: "2026-06-18T10:00:00.000Z" },
      ],
    },
    {
      userId: "parent-2",
      name: "Demo Parent Two (Ben's parent)",
      unread: 2,
      lastMessage: "Will Ben receive extra support for Physics?",
      lastAt: "2026-06-16T15:00:00.000Z",
      messages: [
        { id: "tm-4", senderId: "parent-2",  body: "Hello Mr. Demo, Ben has been struggling with Physics lately. Will he receive any extra support?", createdAt: "2026-06-16T14:30:00.000Z" },
        { id: "tm-5", senderId: "parent-2",  body: "Will Ben receive extra support for Physics?",                                                    createdAt: "2026-06-16T15:00:00.000Z" },
      ],
    },
  ],
};

// ── Staff ─────────────────────────────────────────────────────────────────────

export const demoStaff = [
  { id: "s1", name: "Demo Admin",             role: "admin",   subjects: [],                              email: "admin@yourschool.edu.ng",    active: true,  joinedAt: "2020-01-01T00:00:00.000Z" },
  { id: "s2", name: "Mr. Alex Demo",          role: "teacher", subjects: ["Mathematics", "Physics"],      email: "teacher1@yourschool.edu.ng", active: true,  joinedAt: "2021-09-01T00:00:00.000Z" },
  { id: "s3", name: "Mrs. Beth Demo",         role: "teacher", subjects: ["English Language", "History"], email: "teacher2@yourschool.edu.ng", active: true,  joinedAt: "2021-09-01T00:00:00.000Z" },
  { id: "s4", name: "Mr. Demo Teacher Three", role: "teacher", subjects: ["Chemistry", "Biology"],        email: "teacher3@yourschool.edu.ng", active: true,  joinedAt: "2022-09-01T00:00:00.000Z" },
  { id: "s5", name: "Ms. Demo Teacher Four",  role: "teacher", subjects: ["Economics", "Civic Education"],email: "teacher4@yourschool.edu.ng", active: true,  joinedAt: "2022-09-01T00:00:00.000Z" },
  { id: "s6", name: "Mr. Demo Teacher Five",  role: "teacher", subjects: ["Creative Arts"],              email: "teacher5@yourschool.edu.ng", active: false, joinedAt: "2023-01-15T00:00:00.000Z" },
  { id: "s7", name: "Ms. Demo Teacher Six",   role: "teacher", subjects: ["Physical Ed."],               email: "teacher6@yourschool.edu.ng", active: true,  joinedAt: "2023-09-01T00:00:00.000Z" },
];

// ── Exam Timetable ────────────────────────────────────────────────────────────

export const demoExamTimetable = [
  { id: "ex-1", subject: "Mathematics",      class: "JSS1A", date: "2026-07-15", time: "9:00 AM",  duration: "2 hrs",     venue: "Hall A" },
  { id: "ex-2", subject: "English Language", class: "JSS1A", date: "2026-07-16", time: "9:00 AM",  duration: "2 hrs",     venue: "Hall A" },
  { id: "ex-3", subject: "Physics",          class: "JSS2A", date: "2026-07-15", time: "11:00 AM", duration: "2 hrs",     venue: "Hall B" },
  { id: "ex-4", subject: "Chemistry",        class: "SS1A",  date: "2026-07-16", time: "11:00 AM", duration: "2 hrs",     venue: "Hall B" },
  { id: "ex-5", subject: "Biology",          class: "SS1A",  date: "2026-07-17", time: "9:00 AM",  duration: "2 hrs",     venue: "Hall A" },
  { id: "ex-6", subject: "Economics",        class: "JSS2A", date: "2026-07-17", time: "11:00 AM", duration: "2 hrs",     venue: "Hall B" },
  { id: "ex-7", subject: "History",          class: "JSS1A", date: "2026-07-18", time: "9:00 AM",  duration: "1.5 hrs",   venue: "Hall A" },
  { id: "ex-8", subject: "Civic Education",  class: "JSS2A", date: "2026-07-18", time: "11:00 AM", duration: "1.5 hrs",   venue: "Hall B" },
];

// ── Report Cards ──────────────────────────────────────────────────────────────

export const demoReportCards = [
  { id: "rc-ada-1", term: "Term 1 2024/25", studentId: "student-1", studentName: "Ada Sample", generatedAt: "2025-01-10T00:00:00.000Z" },
  { id: "rc-ada-2", term: "Term 2 2024/25", studentId: "student-1", studentName: "Ada Sample", generatedAt: "2025-05-20T00:00:00.000Z" },
  { id: "rc-ada-3", term: "Term 1 2025/26", studentId: "student-1", studentName: "Ada Sample", generatedAt: "2026-01-15T00:00:00.000Z" },
  { id: "rc-ben-1", term: "Term 1 2024/25", studentId: "student-2", studentName: "Ben Sample", generatedAt: "2025-01-10T00:00:00.000Z" },
  { id: "rc-ben-2", term: "Term 2 2024/25", studentId: "student-2", studentName: "Ben Sample", generatedAt: "2025-05-20T00:00:00.000Z" },
  { id: "rc-ben-3", term: "Term 1 2025/26", studentId: "student-2", studentName: "Ben Sample", generatedAt: "2026-01-15T00:00:00.000Z" },
];

// ── News Articles (for Admin Content page) ────────────────────────────────────

export const demoNewsArticles = [
  { id: "news-1", title: "Students Win Regional Science Competition",   category: "Achievement", publishedAt: "2026-06-10T09:00:00.000Z", draft: false },
  { id: "news-2", title: "New STEM Innovation Lab Now Open",            category: "Facilities",  publishedAt: "2026-05-20T09:00:00.000Z", draft: false },
  { id: "news-3", title: "Class of 2025 Achieves Record WAEC Results", category: "Academic",    publishedAt: "2025-08-15T09:00:00.000Z", draft: false },
  { id: "news-4", title: "School Partnership with State University",    category: "News",        publishedAt: "2026-04-01T09:00:00.000Z", draft: true  },
];

// ── Teacher Grade Sheet (spreadsheet page) ────────────────────────────────────

export const demoTeacherGrades = {
  JSS1A: {
    columns: ["Assignment 1", "Assignment 2", "Quiz 1"],
    students: [
      { name: "Demo Student 01", scores: [82, 75, 88] },
      { name: "Demo Student 02", scores: [65, 70, 58] },
      { name: "Demo Student 03", scores: [91, 88, 95] },
      { name: "Demo Student 04", scores: [74, 68, 72] },
      { name: "Demo Student 05", scores: [55, 62, 48] },
      { name: "Demo Student 06", scores: [88, 79, 84] },
      { name: "Demo Student 07", scores: [70, 66, 73] },
      { name: "Demo Student 08", scores: [45, 52, 49] },
    ],
  },
  SS1A: {
    columns: ["Assignment 1", "Assignment 2", "Quiz 1"],
    students: [
      { name: "Demo Student 11", scores: [90, 85, 92] },
      { name: "Demo Student 12", scores: [60, 55, 63] },
      { name: "Demo Student 13", scores: [78, 82, 80] },
      { name: "Demo Student 14", scores: [72, 68, 75] },
      { name: "Demo Student 15", scores: [85, 88, 82] },
      { name: "Demo Student 16", scores: [50, 48, 55] },
    ],
  },
};

// ── Admin Student Table ───────────────────────────────────────────────────────

export const demoAdminStudents = [
  { id: "student-1",    name: "Ada Sample",         class: "JSS1A", admissionNumber: "DS/2024/0001", attendancePct: 85, feeStatus: "pending" as const },
  { id: "student-2",    name: "Ben Sample",         class: "JSS2A", admissionNumber: "DS/2023/0002", attendancePct: 78, feeStatus: "overdue" as const },
  { id: "stu-jss1a-1",  name: "Demo Student 02",    class: "JSS1A", admissionNumber: "DS/2024/0002", attendancePct: 92, feeStatus: "paid"    as const },
  { id: "stu-jss1a-2",  name: "Demo Student 03",    class: "JSS1A", admissionNumber: "DS/2024/0003", attendancePct: 88, feeStatus: "paid"    as const },
  { id: "stu-jss1a-3",  name: "Demo Student 04",    class: "JSS1A", admissionNumber: "DS/2024/0004", attendancePct: 75, feeStatus: "pending" as const },
  { id: "stu-jss1a-4",  name: "Demo Student 05",    class: "JSS1A", admissionNumber: "DS/2024/0005", attendancePct: 83, feeStatus: "paid"    as const },
  { id: "stu-jss2a-0",  name: "Demo Student 08",    class: "JSS2A", admissionNumber: "DS/2023/0003", attendancePct: 81, feeStatus: "paid"    as const },
  { id: "stu-jss2a-1",  name: "Demo Student 09",    class: "JSS2A", admissionNumber: "DS/2023/0004", attendancePct: 69, feeStatus: "overdue" as const },
  { id: "stu-ss1a-0",   name: "Demo Student 11",    class: "SS1A",  admissionNumber: "DS/2022/0001", attendancePct: 90, feeStatus: "paid"    as const },
  { id: "stu-ss1a-1",   name: "Demo Student 12",    class: "SS1A",  admissionNumber: "DS/2022/0002", attendancePct: 67, feeStatus: "overdue" as const },
  { id: "stu-ss1a-2",   name: "Demo Student 13",    class: "SS1A",  admissionNumber: "DS/2022/0003", attendancePct: 95, feeStatus: "paid"    as const },
  { id: "stu-ss1a-3",   name: "Demo Student 14",    class: "SS1A",  admissionNumber: "DS/2022/0004", attendancePct: 73, feeStatus: "pending" as const },
];

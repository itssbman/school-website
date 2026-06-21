/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const rawConfig = require("../school.config");
const schoolConfig = rawConfig.default ?? rawConfig;

import bcrypt from "bcryptjs";
import { subDays, addDays, startOfDay } from "date-fns";

type AttendanceStatus = "present" | "absent" | "late";
type FeeStatus = "paid" | "pending" | "overdue";

const prisma = new PrismaClient();

const HASH = (pwd: string) => bcrypt.hashSync(pwd, 10);
const DEMO_PASS = "Demo1234!";

const DOMAIN: string = schoolConfig.seed?.staffEmailDomain ?? "yourschool.edu.ng";

const CLASSES = ["JSS1A", "JSS2A", "SS1A"];
const SUBJECTS = ["Mathematics", "English Language", "Physics", "Chemistry", "Biology", "History"];

// ── Demo users (used by the login form) ──────────────────────────────────────
const DEMO_ADMIN    = { name: "Demo Admin",           email: "admin@demo.schoolkit.ng" };
const DEMO_TEACHER  = { name: "Mr. Babatunde Adeyemi",email: "teacher@demo.schoolkit.ng", subjects: ["Mathematics", "Physics"], classes: ["JSS1A", "SS1A"] };
const DEMO_PARENT   = { name: "Mrs. Ngozi Okonkwo",   email: "parent@demo.schoolkit.ng" };
const DEMO_STUDENT  = { name: "Chukwuemeka Okonkwo",  email: "student@demo.schoolkit.ng", class: "JSS1A" };

// ── Extra bulk teachers ───────────────────────────────────────────────────────
const TEACHER_DATA = [
  { name: "Mrs. Amaka Obi",      email: `teacher2@${DOMAIN}`, subjects: ["English Language", "History"],          classes: ["JSS2A"] },
  { name: "Mr. Emeka Eze",       email: `teacher3@${DOMAIN}`, subjects: ["Chemistry", "Biology"],                  classes: ["SS1A"] },
  { name: "Miss Fatimah Bello",  email: `teacher4@${DOMAIN}`, subjects: ["Economics", "Civic Education"],          classes: ["JSS1A", "JSS2A"] },
  { name: "Mr. Tunde Oladele",   email: `teacher5@${DOMAIN}`, subjects: ["Physics", "Mathematics"],               classes: ["JSS2A", "SS1A"] },
];

// ── Extra bulk parents ────────────────────────────────────────────────────────
const PARENT_DATA = [
  { name: "Mr. Emeka Obiora",    email: "parent2@example.com" },
  { name: "Mrs. Aisha Ibrahim",  email: "parent3@example.com" },
  { name: "Mr. Taiwo Adebayo",   email: "parent4@example.com" },
  { name: "Mrs. Chioma Nwosu",   email: "parent5@example.com" },
];

// ── 15 students with Nigerian names (student 0 = demo student) ────────────────
const STUDENT_DATA = [
  { name: "Adaeze Okonkwo",      class: "JSS2A", parentIdx: -1 },  // demo parent's second child (parentIdx -1 = demo parent)
  { name: "Oluwaseun Adeyemi",   class: "SS1A",  parentIdx: 0 },
  { name: "Amaka Obiora",        class: "JSS1A", parentIdx: 0 },
  { name: "Emeka Eze",           class: "JSS2A", parentIdx: 1 },
  { name: "Chiamaka Nwosu",      class: "SS1A",  parentIdx: 1 },
  { name: "Babatunde Oladele",   class: "JSS1A", parentIdx: 2 },
  { name: "Nneka Ikenna",        class: "JSS2A", parentIdx: 2 },
  { name: "Tochukwu Onwuegbu",  class: "SS1A",  parentIdx: 3 },
  { name: "Fatimah Abdullahi",   class: "JSS1A", parentIdx: 3 },
  { name: "Musa Ibrahim",        class: "JSS2A", parentIdx: 0 },
  { name: "Chisom Obi",          class: "SS1A",  parentIdx: 1 },
  { name: "Blessing Uchenna",    class: "JSS1A", parentIdx: 2 },
  { name: "David Taiwo",         class: "JSS2A", parentIdx: 3 },
  { name: "Grace Nwosu",         class: "SS1A",  parentIdx: 0 },
];

const TIMETABLE_DATA = [
  { day: "Monday",    class: "JSS1A", subject: "Mathematics",    teacherIdx: "demo", period: 1, startTime: "08:00", endTime: "09:00" },
  { day: "Monday",    class: "JSS1A", subject: "English Language",teacherIdx: 0,     period: 2, startTime: "09:00", endTime: "10:00" },
  { day: "Monday",    class: "JSS1A", subject: "Physics",         teacherIdx: "demo", period: 3, startTime: "10:30", endTime: "11:30" },
  { day: "Monday",    class: "JSS2A", subject: "Chemistry",       teacherIdx: 1,     period: 1, startTime: "08:00", endTime: "09:00" },
  { day: "Monday",    class: "JSS2A", subject: "Mathematics",     teacherIdx: 3,     period: 2, startTime: "09:00", endTime: "10:00" },
  { day: "Tuesday",   class: "JSS1A", subject: "Biology",         teacherIdx: 1,     period: 1, startTime: "08:00", endTime: "09:00" },
  { day: "Tuesday",   class: "JSS1A", subject: "History",         teacherIdx: 0,     period: 2, startTime: "09:00", endTime: "10:00" },
  { day: "Tuesday",   class: "SS1A",  subject: "Physics",         teacherIdx: "demo", period: 1, startTime: "08:00", endTime: "09:00" },
  { day: "Tuesday",   class: "SS1A",  subject: "Chemistry",       teacherIdx: 1,     period: 2, startTime: "09:00", endTime: "10:00" },
  { day: "Wednesday", class: "JSS2A", subject: "History",         teacherIdx: 0,     period: 1, startTime: "08:00", endTime: "09:00" },
  { day: "Wednesday", class: "JSS1A", subject: "Mathematics",     teacherIdx: "demo", period: 1, startTime: "08:00", endTime: "09:00" },
  { day: "Thursday",  class: "SS1A",  subject: "Mathematics",     teacherIdx: "demo", period: 1, startTime: "08:00", endTime: "09:00" },
  { day: "Thursday",  class: "JSS1A", subject: "Chemistry",       teacherIdx: 1,     period: 2, startTime: "09:00", endTime: "10:00" },
  { day: "Friday",    class: "JSS1A", subject: "English Language",teacherIdx: 0,     period: 1, startTime: "08:00", endTime: "09:00" },
  { day: "Friday",    class: "JSS2A", subject: "Physics",         teacherIdx: 3,     period: 1, startTime: "08:00", endTime: "09:00" },
];

const EXAM_DATA = [
  { subject: "Mathematics",     class: "JSS1A", date: new Date("2026-07-07"), startTime: "09:00", duration: "2 hrs", venue: "Hall A", term: "Term 3 2025/26" },
  { subject: "English Language",class: "JSS1A", date: new Date("2026-07-08"), startTime: "09:00", duration: "2 hrs", venue: "Hall A", term: "Term 3 2025/26" },
  { subject: "Physics",         class: "JSS1A", date: new Date("2026-07-09"), startTime: "09:00", duration: "1.5 hrs",venue:"Hall B",term:"Term 3 2025/26"},
  { subject: "Mathematics",     class: "JSS2A", date: new Date("2026-07-07"), startTime: "11:00", duration: "2 hrs", venue: "Hall B", term: "Term 3 2025/26" },
  { subject: "Chemistry",       class: "JSS2A", date: new Date("2026-07-08"), startTime: "11:00", duration: "1.5 hrs",venue:"Hall C",term:"Term 3 2025/26"},
  { subject: "Mathematics",     class: "SS1A",  date: new Date("2026-07-10"), startTime: "09:00", duration: "2 hrs", venue: "Hall A", term: "Term 3 2025/26" },
  { subject: "Physics",         class: "SS1A",  date: new Date("2026-07-11"), startTime: "09:00", duration: "2 hrs", venue: "Hall B", term: "Term 3 2025/26" },
  { subject: "Chemistry",       class: "SS1A",  date: new Date("2026-07-11"), startTime: "11:00", duration: "2 hrs", venue: "Hall C", term: "Term 3 2025/26" },
];

async function main() {
  console.log("🌱 Seeding database…");

  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "User", "Student", "Parent", "Teacher", "Admin",
    "Grade", "Attendance", "Assignment", "Submission", "FeeRecord",
    "Announcement", "Event", "Message", "NewsArticle", "GalleryItem",
    "LessonPlan", "AdmissionApplication", "LibraryBook", "Timetable", "Exam"
    CASCADE
  `).catch(() => {});

  // ── Admin ─────────────────────────────────────────────────────────────────
  const adminUser = await prisma.user.create({
    data: {
      name: DEMO_ADMIN.name,
      email: DEMO_ADMIN.email,
      password: HASH(DEMO_PASS),
      role: "admin",
      admin: { create: {} },
    },
  });

  // Also create a domain admin
  const domainAdminUser = await prisma.user.create({
    data: {
      name: "School Admin",
      email: `admin@${DOMAIN}`,
      password: HASH(DEMO_PASS),
      role: "admin",
      admin: { create: {} },
    },
  });
  void domainAdminUser;
  console.log("✅ Admins created");

  // ── Demo teacher ──────────────────────────────────────────────────────────
  const demoTeacherUser = await prisma.user.create({
    data: {
      name: DEMO_TEACHER.name,
      email: DEMO_TEACHER.email,
      password: HASH(DEMO_PASS),
      role: "teacher",
      teacher: { create: { subjects: DEMO_TEACHER.subjects, classes: DEMO_TEACHER.classes } },
    },
    include: { teacher: true },
  });

  // ── Bulk teachers ─────────────────────────────────────────────────────────
  const bulkTeacherUsers = await Promise.all(
    TEACHER_DATA.map((t) =>
      prisma.user.create({
        data: {
          name: t.name,
          email: t.email,
          password: HASH(DEMO_PASS),
          role: "teacher",
          teacher: { create: { subjects: t.subjects, classes: t.classes } },
        },
        include: { teacher: true },
      })
    )
  );
  const allTeacherUsers = [demoTeacherUser, ...bulkTeacherUsers];
  console.log("✅ Teachers created");

  // ── Demo parent ───────────────────────────────────────────────────────────
  const demoParentUser = await prisma.user.create({
    data: {
      name: DEMO_PARENT.name,
      email: DEMO_PARENT.email,
      password: HASH(DEMO_PASS),
      role: "parent",
      parent: { create: {} },
    },
    include: { parent: true },
  });

  // ── Bulk parents ──────────────────────────────────────────────────────────
  const bulkParentUsers = await Promise.all(
    PARENT_DATA.map((p) =>
      prisma.user.create({
        data: {
          name: p.name,
          email: p.email,
          password: HASH(DEMO_PASS),
          role: "parent",
          parent: { create: {} },
        },
        include: { parent: true },
      })
    )
  );
  const allParentUsers = [demoParentUser, ...bulkParentUsers];
  console.log("✅ Parents created");

  // ── Demo student ──────────────────────────────────────────────────────────
  const demoStudentUser = await prisma.user.create({
    data: {
      name: DEMO_STUDENT.name,
      email: DEMO_STUDENT.email,
      password: HASH(DEMO_PASS),
      role: "student",
      student: {
        create: {
          class: DEMO_STUDENT.class,
          admissionNumber: "DS/2024/0001",
          parentId: demoParentUser.parent!.id,
        },
      },
    },
    include: { student: true },
  });

  // ── Bulk students ─────────────────────────────────────────────────────────
  const bulkStudentUsers = await Promise.all(
    STUDENT_DATA.map(async (s, i) => {
      const parentUser = s.parentIdx === -1 ? demoParentUser : allParentUsers[s.parentIdx + 1];
      return prisma.user.create({
        data: {
          name: s.name,
          email: `student${i + 2}@${DOMAIN}`,
          password: HASH(DEMO_PASS),
          role: "student",
          student: {
            create: {
              class: s.class,
              admissionNumber: `DS/2024/${String(i + 2).padStart(4, "0")}`,
              parentId: parentUser.parent!.id,
            },
          },
        },
        include: { student: true },
      });
    })
  );
  const allStudentUsers = [demoStudentUser, ...bulkStudentUsers];
  console.log("✅ Students created");

  // ── Grades ────────────────────────────────────────────────────────────────
  const terms = ["Term 1 2024/25", "Term 2 2024/25", "Term 3 2024/25"];
  await Promise.all(
    allStudentUsers.map(async (su: any) => {
      for (const term of terms) {
        for (const subject of SUBJECTS) {
          await prisma.grade.create({
            data: {
              studentId: su.student!.id,
              subject,
              score: Math.round(40 + Math.random() * 55),
              term,
            },
          });
        }
      }
    })
  );
  console.log("✅ Grades created");

  // ── Attendance (last 60 school days) ─────────────────────────────────────
  await Promise.all(
    allStudentUsers.map(async (su: any) => {
      for (let i = 0; i < 90; i++) {
        const date = startOfDay(subDays(new Date(), i));
        if ([0, 6].includes(date.getDay())) continue;
        const roll = Math.random();
        const status: AttendanceStatus = roll > 0.08 ? "present" : roll > 0.04 ? "late" : "absent";
        await prisma.attendance.upsert({
          where: { studentId_date: { studentId: su.student!.id, date } },
          update: {},
          create: { studentId: su.student!.id, date, status },
        }).catch(() => {});
      }
    })
  );
  console.log("✅ Attendance created");

  // ── Fee records ───────────────────────────────────────────────────────────
  const feeTerms = [
    { term: "Term 1 2024/25", amount: 750000, dueDate: new Date("2024-09-30") },
    { term: "Term 2 2024/25", amount: 750000, dueDate: new Date("2025-01-31") },
    { term: "Term 3 2024/25", amount: 750000, dueDate: new Date("2025-05-31") },
  ];
  const feeStatuses: FeeStatus[] = ["paid", "pending", "overdue"];

  await Promise.all(
    allStudentUsers.map(async (su: any, i: number) => {
      for (const feeTerm of feeTerms) {
        const status: FeeStatus = feeStatuses[i % 3];
        await prisma.feeRecord.create({
          data: {
            studentId: su.student!.id,
            amount: feeTerm.amount,
            status,
            term: feeTerm.term,
            dueDate: feeTerm.dueDate,
            paidAt: status === "paid" ? subDays(feeTerm.dueDate, 5) : null,
          },
        });
      }
    })
  );
  console.log("✅ Fee records created");

  // ── Assignments ───────────────────────────────────────────────────────────
  const demoTeacher = demoTeacherUser.teacher!;
  await prisma.assignment.createMany({
    data: [
      {
        title: "Mathematics — Quadratic Equations",
        description: "Solve exercises 1–20 on pages 45–52. Show all working.",
        subject: "Mathematics",
        dueDate: addDays(new Date(), 7),
        classId: "JSS1A",
        teacherId: demoTeacher.id,
      },
      {
        title: "Physics — Newton's Laws",
        description: "Write a 2-page essay explaining Newton's three laws with everyday examples.",
        subject: "Physics",
        dueDate: addDays(new Date(), 14),
        classId: "JSS1A",
        teacherId: demoTeacher.id,
      },
      {
        title: "Mathematics — Differentiation",
        description: "Complete tutorial questions on basic differentiation.",
        subject: "Mathematics",
        dueDate: addDays(new Date(), 5),
        classId: "SS1A",
        teacherId: demoTeacher.id,
      },
    ],
  });

  // Assignments from bulk teachers
  await Promise.all(
    bulkTeacherUsers.slice(0, 2).map((tu: any) =>
      prisma.assignment.create({
        data: {
          title: `${tu.teacher!.subjects[0]} — Term Assignment`,
          description: "Complete the assigned exercises from your textbook.",
          subject: tu.teacher!.subjects[0],
          dueDate: addDays(new Date(), 10),
          classId: tu.teacher!.classes[0],
          teacherId: tu.teacher!.id,
        },
      })
    )
  );
  console.log("✅ Assignments created");

  // ── Lesson plans ──────────────────────────────────────────────────────────
  await prisma.lessonPlan.createMany({
    data: [
      { teacherId: demoTeacher.id, subject: "Mathematics", class: "JSS1A", week: "Week 1", fileUrl: "https://example.com/plan1.pdf", uploadedAt: subDays(new Date(), 14) },
      { teacherId: demoTeacher.id, subject: "Physics",     class: "SS1A",  week: "Week 1", fileUrl: "https://example.com/plan2.pdf", uploadedAt: subDays(new Date(), 14) },
      { teacherId: demoTeacher.id, subject: "Mathematics", class: "JSS1A", week: "Week 2", fileUrl: "https://example.com/plan3.pdf", uploadedAt: subDays(new Date(), 7)  },
    ],
  });
  console.log("✅ Lesson plans created");

  // ── Announcements ─────────────────────────────────────────────────────────
  await prisma.announcement.createMany({
    data: [
      { title: "Applications Now Open",          body: "Applications for 2026/2027 are now open. Visit our admissions page.",   targetRole: "all",     authorId: adminUser.id },
      { title: "Term 3 Fee Payment Deadline",    body: "Parents are reminded that Term 3 fees are due by 31st May 2026.",      targetRole: "parent",  authorId: adminUser.id },
      { title: "Staff CPD Day — 20 June",        body: "Mandatory professional development session for all teaching staff.",    targetRole: "teacher", authorId: adminUser.id },
      { title: "Library Hours Extended",         body: "The library will remain open until 6 PM weekdays during exam season.", targetRole: "student", authorId: adminUser.id },
      { title: "End-of-Term Exam Timetable",     body: "The end-of-term examination timetable has been published. Check the portal for details.", targetRole: "all", authorId: adminUser.id },
      { title: "JSS1A Mathematics Notice",       body: "The Mathematics test scheduled for next Monday is postponed to Wednesday.", targetRole: "student", classId: "JSS1A", authorId: demoTeacher.id },
    ],
  });
  console.log("✅ Announcements created");

  // ── Messages (demo parent ↔ demo teacher) ─────────────────────────────────
  const msgs = [
    { senderId: demoParentUser.id, receiverId: demoTeacherUser.id, body: "Good morning, Mr. Adeyemi. How is Chukwuemeka performing in Mathematics this term?" },
    { senderId: demoTeacherUser.id, receiverId: demoParentUser.id, body: "Good morning Mrs. Okonkwo. Chukwuemeka is doing very well — he scored 82 on the last test." },
    { senderId: demoParentUser.id, receiverId: demoTeacherUser.id, body: "That is wonderful to hear! Thank you so much." },
    { senderId: demoTeacherUser.id, receiverId: demoParentUser.id, body: "You're welcome. Please remind him to complete the quadratic equations assignment due next week." },
  ];
  for (let i = 0; i < msgs.length; i++) {
    await prisma.message.create({
      data: { ...msgs[i], createdAt: subDays(new Date(), 3 - i), read: true },
    });
  }
  console.log("✅ Messages created");

  // ── News articles ─────────────────────────────────────────────────────────
  const newsData = [
    { title: "Students Win Regional Science Competition",       slug: "regional-science-competition-win", excerpt: "Our Year 11 team claimed first place.", published: true,  imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80", body: "Our Year 11 team claimed first place at the 2025 Regional Science Competition.\n\nThe team competed across Physics, Chemistry, and Biology, defeating teams from across the state.\n\nPrincipal Okonkwo noted: \"This achievement reflects the dedication of both students and faculty.\"" },
    { title: "New STEM Innovation Lab Now Open",                slug: "stem-lab-opening",                 excerpt: "State-of-the-art robotics and coding lab.", published: true,  imageUrl: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800&auto=format&fit=crop&q=80", body: "The newly expanded STEM lab opened this week, featuring Arduino kits, 3D printers, and VR headsets for senior students." },
    { title: "Class of 2025 Achieves Record WAEC Results",     slug: "waec-results-2025",                excerpt: "95% scored five credits including English and Mathematics.", published: true, imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80", body: "The Class of 2025 achieved the school's best-ever WAEC results, with 95% scoring five credits. Over 30 students achieved distinctions across all subjects." },
    { title: "Annual Cultural Night Celebrates Our Heritage",   slug: "cultural-night-2025",              excerpt: "Over 150 students performed.", published: true,  imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80", body: "The Annual Cultural Night featured performances from over 150 students showcasing traditional dances, drama, and poetry." },
    { title: "Sports Day 2026: Eagles House Champions",         slug: "sports-day-2026",                  excerpt: "Eagles House claimed the championship.", published: true,  imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80", body: "Eagles House emerged victorious at Sports Day 2026, amassing points across track and field events. Over 300 students competed." },
    { title: "Term 3 Examination Preparations — Draft",        slug: "exam-prep-2026-draft",             excerpt: "Draft notice for exam preparations.", published: false, imageUrl: null, body: "Draft: This article covers preparation guidelines for end-of-term exams." },
  ];

  for (const article of newsData) {
    await prisma.newsArticle.create({
      data: {
        ...article,
        publishedAt: subDays(new Date(), Math.floor(Math.random() * 60) + 5),
        authorId: adminUser.id,
      },
    });
  }
  console.log("✅ News articles created");

  // ── Events ────────────────────────────────────────────────────────────────
  await prisma.event.createMany({
    data: [
      { title: "Term 3 Examinations",         description: "End-of-year examinations for all classes.",              startDate: new Date("2026-07-07T08:00:00"), endDate: new Date("2026-07-18T15:00:00"), type: "Academic",    isPublic: true  },
      { title: "Parents-Teachers Forum",      description: "Termly meeting between parents and subject teachers.",   startDate: new Date("2026-06-28T09:00:00"), endDate: new Date("2026-06-28T13:00:00"), type: "Meeting",     isPublic: true  },
      { title: "Annual Science Fair",         description: "Students present original science projects to judges.",  startDate: new Date("2026-07-05T09:00:00"), endDate: new Date("2026-07-05T16:00:00"), type: "Academic",    isPublic: true  },
      { title: "Sports Day 2026",             description: "Inter-house sports competition.",                         startDate: new Date("2026-06-27T07:30:00"), endDate: new Date("2026-06-27T17:00:00"), type: "Sports",      isPublic: true  },
      { title: "Founders Day Celebration",    description: "Celebrating our school's founding anniversary.",          startDate: new Date("2026-09-15T10:00:00"), endDate: new Date("2026-09-15T17:00:00"), type: "Celebration", isPublic: true  },
      { title: "Staff Internal Training",     description: "Mandatory internal training for teaching staff.",         startDate: new Date("2026-08-25T08:00:00"), endDate: new Date("2026-08-25T16:00:00"), type: "Training",    isPublic: false },
    ],
  });
  console.log("✅ Events created");

  // ── Gallery ───────────────────────────────────────────────────────────────
  await prisma.galleryItem.createMany({
    data: [
      { imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800", caption: "Annual Science Fair", category: "Academic" },
      { imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800", caption: "Sports Day 2026", category: "Sports" },
      { imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800", caption: "Graduation Ceremony 2025", category: "Graduation" },
      { imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800", caption: "Cultural Night 2025", category: "Cultural" },
      { imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800", caption: "Library & Study Hall", category: "Facilities" },
      { imageUrl: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800", caption: "STEM Innovation Lab", category: "Facilities" },
      { imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", caption: "Basketball Championships", category: "Sports" },
      { imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800", caption: "Graduation 2025", category: "Graduation" },
    ],
  });
  console.log("✅ Gallery created");

  // ── Library books ─────────────────────────────────────────────────────────
  await prisma.libraryBook.createMany({
    data: [
      { title: "New General Mathematics for SS3",  author: "M.F. Macrae",          isbn: "9780582603479", category: "Textbook",    available: true  },
      { title: "New School Chemistry for SS2",     author: "O. Osei",              isbn: "9780582603479", category: "Textbook",    available: true  },
      { title: "Things Fall Apart",                author: "Chinua Achebe",         isbn: "9780385474542", category: "Literature",  available: false },
      { title: "Purple Hibiscus",                  author: "Chimamanda N. Adichie", isbn: "9781616202415", category: "Literature",  available: true  },
      { title: "Weep Not, Child",                  author: "Ngũgĩ wa Thiong'o",    isbn: "9780141186354", category: "Literature",  available: true  },
      { title: "The Art of War",                   author: "Sun Tzu",              isbn: "9780140441184", category: "Non-fiction", available: true  },
      { title: "A Brief History of Time",          author: "Stephen Hawking",      isbn: "9780553380163", category: "Science",     available: false },
      { title: "Organic Chemistry",                author: "J. Clayden",           isbn: "9780198503460", category: "Textbook",    available: true  },
      { title: "The Richest Man in Babylon",       author: "George S. Clason",     isbn: "9780451205360", category: "Non-fiction", available: true  },
      { title: "Fundamentals of Physics",          author: "Halliday & Resnick",   isbn: "9780471401940", category: "Textbook",    available: true  },
    ],
  });
  console.log("✅ Library books created");

  // ── Timetable ─────────────────────────────────────────────────────────────
  const teacherIdMap: Record<string | number, string> = {
    demo: demoTeacher.id,
    0: bulkTeacherUsers[0].teacher!.id,
    1: bulkTeacherUsers[1].teacher!.id,
    2: bulkTeacherUsers[2].teacher!.id,
    3: bulkTeacherUsers[3].teacher!.id,
  };

  await prisma.timetable.createMany({
    data: TIMETABLE_DATA.map((t) => ({
      class: t.class,
      day: t.day,
      period: t.period,
      subject: t.subject,
      teacherId: teacherIdMap[t.teacherIdx],
      startTime: t.startTime,
      endTime: t.endTime,
    })),
  });
  console.log("✅ Timetable created");

  // ── Exams ─────────────────────────────────────────────────────────────────
  await prisma.exam.createMany({ data: EXAM_DATA });
  console.log("✅ Exams created");

  // ── Admission applications ────────────────────────────────────────────────
  await prisma.admissionApplication.createMany({
    data: [
      { firstName: "Kemi",     lastName: "Adebayo",  email: "kadebayo@example.com",  phone: "+234 801 234 5678", class: "JSS1", parentName: "Mrs. Adebayo",  parentPhone: "+234 801 234 5679", status: "applied"      },
      { firstName: "Tunde",    lastName: "Fashola",  email: "tfashola@example.com",  phone: "+234 802 345 6789", class: "SS1",  parentName: "Mr. Fashola",   parentPhone: "+234 802 345 6790", status: "shortlisted"  },
      { firstName: "Amara",    lastName: "Okafor",   email: "aokafor@example.com",   phone: "+234 803 456 7890", class: "JSS2", parentName: "Mrs. Okafor",   parentPhone: "+234 803 456 7891", status: "admitted"     },
      { firstName: "Ibrahim",  lastName: "Musa",     email: "imusa@example.com",     phone: "+234 804 567 8901", class: "JSS1", parentName: "Mr. Musa",      parentPhone: "+234 804 567 8902", status: "rejected"     },
      { firstName: "Blessing", lastName: "Okonkwo",  email: "bokonkwo@example.com",  phone: "+234 805 678 9012", class: "SS2",  parentName: "Mrs. Okonkwo",  parentPhone: "+234 805 678 9013", status: "applied"      },
      { firstName: "Chidera",  lastName: "Nwosu",    email: "cnwosu@example.com",    phone: "+234 806 789 0123", class: "JSS1", parentName: "Mr. Nwosu",     parentPhone: "+234 806 789 0124", status: "applied"      },
    ],
  });
  console.log("✅ Admission applications created");

  // ── All teacher users list ─────────────────────────────────────────────────
  void allTeacherUsers;

  console.log("\n🎉 Database seeded successfully!");
  console.log("\n--- Login Credentials (all use Demo1234!) ---");
  console.log(`Admin:   admin@demo.schoolkit.ng`);
  console.log(`Teacher: teacher@demo.schoolkit.ng`);
  console.log(`Parent:  parent@demo.schoolkit.ng`);
  console.log(`Student: student@demo.schoolkit.ng`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

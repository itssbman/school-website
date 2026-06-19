// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const rawConfig = require("../school.config");
const schoolConfig = rawConfig.default ?? rawConfig;

import bcrypt from "bcryptjs";
import { subDays, addDays, startOfDay } from "date-fns";

type AttendanceStatus = "present" | "absent" | "late";
type FeeStatus = "paid" | "pending" | "overdue";

const prisma = new PrismaClient();

const HASH = (pwd: string) => bcrypt.hashSync(pwd, 10);

const DOMAIN: string = schoolConfig.seed?.staffEmailDomain ?? "yourschool.edu.ng";
const ADMIN_EMAIL: string = schoolConfig.seed?.adminEmail ?? `admin@${DOMAIN}`;

const CLASSES = ["JSS1A", "JSS2A", "SS1A"];
const SUBJECTS = ["Mathematics", "English Language", "Physics", "Chemistry", "Biology", "History", "Economics", "Civic Education"];

const TEACHER_DATA = [
  { name: "Mr. Demo Teacher One", email: `teacher1@${DOMAIN}`, subjects: ["Mathematics", "Physics"], classes: ["JSS1A", "SS1A"] },
  { name: "Mrs. Demo Teacher Two", email: `teacher2@${DOMAIN}`, subjects: ["English Language", "History"], classes: ["JSS2A"] },
  { name: "Mr. Demo Teacher Three", email: `teacher3@${DOMAIN}`, subjects: ["Chemistry", "Biology"], classes: ["SS1A"] },
  { name: "Miss Demo Teacher Four", email: `teacher4@${DOMAIN}`, subjects: ["Economics", "Civic Education"], classes: ["JSS1A", "JSS2A"] },
  { name: "Mr. Demo Teacher Five", email: `teacher5@${DOMAIN}`, subjects: ["Physics", "Mathematics"], classes: ["JSS2A", "SS1A"] },
];

const PARENT_DATA = [
  { name: "Demo Parent One", email: "parent1@example.com" },
  { name: "Demo Parent Two", email: "parent2@example.com" },
  { name: "Demo Parent Three", email: "parent3@example.com" },
  { name: "Demo Parent Four", email: "parent4@example.com" },
  { name: "Demo Parent Five", email: "parent5@example.com" },
  { name: "Demo Parent Six", email: "parent6@example.com" },
  { name: "Demo Parent Seven", email: "parent7@example.com" },
  { name: "Demo Parent Eight", email: "parent8@example.com" },
  { name: "Demo Parent Nine", email: "parent9@example.com" },
  { name: "Demo Parent Ten", email: "parent10@example.com" },
];

const STUDENT_DATA = [
  { name: "Demo Student 01", class: "JSS1A", parentIdx: 0 },
  { name: "Demo Student 02", class: "JSS2A", parentIdx: 0 },
  { name: "Demo Student 03", class: "SS1A", parentIdx: 1 },
  { name: "Demo Student 04", class: "JSS1A", parentIdx: 1 },
  { name: "Demo Student 05", class: "JSS2A", parentIdx: 2 },
  { name: "Demo Student 06", class: "SS1A", parentIdx: 2 },
  { name: "Demo Student 07", class: "JSS1A", parentIdx: 3 },
  { name: "Demo Student 08", class: "JSS2A", parentIdx: 4 },
  { name: "Demo Student 09", class: "SS1A", parentIdx: 4 },
  { name: "Demo Student 10", class: "JSS1A", parentIdx: 5 },
  { name: "Demo Student 11", class: "JSS2A", parentIdx: 5 },
  { name: "Demo Student 12", class: "SS1A", parentIdx: 6 },
  { name: "Demo Student 13", class: "JSS1A", parentIdx: 7 },
  { name: "Demo Student 14", class: "JSS2A", parentIdx: 8 },
  { name: "Demo Student 15", class: "SS1A", parentIdx: 9 },
  { name: "Demo Student 16", class: "JSS2A", parentIdx: 0 },
  { name: "Demo Student 17", class: "JSS1A", parentIdx: 1 },
  { name: "Demo Student 18", class: "SS1A", parentIdx: 2 },
  { name: "Demo Student 19", class: "JSS2A", parentIdx: 3 },
  { name: "Demo Student 20", class: "JSS1A", parentIdx: 4 },
  { name: "Demo Student 21", class: "SS1A", parentIdx: 5 },
  { name: "Demo Student 22", class: "JSS2A", parentIdx: 6 },
  { name: "Demo Student 23", class: "JSS1A", parentIdx: 7 },
  { name: "Demo Student 24", class: "SS1A", parentIdx: 8 },
  { name: "Demo Student 25", class: "JSS2A", parentIdx: 9 },
  { name: "Demo Student 26", class: "JSS1A", parentIdx: 0 },
  { name: "Demo Student 27", class: "SS1A", parentIdx: 1 },
  { name: "Demo Student 28", class: "JSS2A", parentIdx: 2 },
  { name: "Demo Student 29", class: "JSS1A", parentIdx: 3 },
  { name: "Demo Student 30", class: "SS1A", parentIdx: 4 },
];

const TIMETABLE_DATA = [
  { day: "Monday", class: "JSS1A", subject: "Mathematics", teacherIdx: 0, period: 1, startTime: "08:00", endTime: "09:00" },
  { day: "Monday", class: "JSS1A", subject: "English Language", teacherIdx: 1, period: 2, startTime: "09:00", endTime: "10:00" },
  { day: "Monday", class: "JSS1A", subject: "Physics", teacherIdx: 0, period: 3, startTime: "10:30", endTime: "11:30" },
  { day: "Monday", class: "JSS2A", subject: "Chemistry", teacherIdx: 2, period: 1, startTime: "08:00", endTime: "09:00" },
  { day: "Monday", class: "JSS2A", subject: "Mathematics", teacherIdx: 4, period: 2, startTime: "09:00", endTime: "10:00" },
  { day: "Tuesday", class: "JSS1A", subject: "Economics", teacherIdx: 3, period: 1, startTime: "08:00", endTime: "09:00" },
  { day: "Tuesday", class: "JSS1A", subject: "Biology", teacherIdx: 2, period: 2, startTime: "09:00", endTime: "10:00" },
  { day: "Tuesday", class: "SS1A", subject: "Physics", teacherIdx: 4, period: 1, startTime: "08:00", endTime: "09:00" },
  { day: "Tuesday", class: "SS1A", subject: "Chemistry", teacherIdx: 2, period: 2, startTime: "09:00", endTime: "10:00" },
  { day: "Wednesday", class: "JSS2A", subject: "History", teacherIdx: 1, period: 1, startTime: "08:00", endTime: "09:00" },
  { day: "Wednesday", class: "JSS2A", subject: "Civic Education", teacherIdx: 3, period: 2, startTime: "09:00", endTime: "10:00" },
  { day: "Thursday", class: "SS1A", subject: "Economics", teacherIdx: 3, period: 1, startTime: "08:00", endTime: "09:00" },
  { day: "Thursday", class: "SS1A", subject: "Mathematics", teacherIdx: 0, period: 2, startTime: "09:00", endTime: "10:00" },
  { day: "Friday", class: "JSS1A", subject: "Civic Education", teacherIdx: 3, period: 1, startTime: "08:00", endTime: "09:00" },
  { day: "Friday", class: "JSS2A", subject: "Physics", teacherIdx: 4, period: 1, startTime: "08:00", endTime: "09:00" },
];

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "User", "Student", "Parent", "Teacher", "Admin",
    "Grade", "Attendance", "Assignment", "Submission", "FeeRecord",
    "Announcement", "Event", "Message", "NewsArticle", "GalleryItem",
    "LessonPlan", "AdmissionApplication", "LibraryBook", "Timetable"
    CASCADE
  `).catch(() => {});

  // Admin user
  const adminUser = await prisma.user.create({
    data: {
      name: "Demo Admin",
      email: ADMIN_EMAIL,
      password: HASH("Admin@123"),
      role: "admin",
      admin: { create: {} },
    },
  });
  console.log("✅ Admin created");

  // Teachers
  const teacherUsers = await Promise.all(
    TEACHER_DATA.map(async (t) => {
      const user = await prisma.user.create({
        data: {
          name: t.name,
          email: t.email,
          password: HASH("Teacher@123"),
          role: "teacher",
          teacher: {
            create: { subjects: t.subjects, classes: t.classes },
          },
        },
        include: { teacher: true },
      });
      return user;
    })
  );
  console.log("✅ Teachers created");

  // Parents
  const parentUsers = await Promise.all(
    PARENT_DATA.map(async (p) => {
      const user = await prisma.user.create({
        data: {
          name: p.name,
          email: p.email,
          password: HASH("Parent@123"),
          role: "parent",
          parent: { create: {} },
        },
        include: { parent: true },
      });
      return user;
    })
  );
  console.log("✅ Parents created");

  // Students
  const studentUsers = await Promise.all(
    STUDENT_DATA.map(async (s, i) => {
      const parentUser = parentUsers[s.parentIdx];
      const user = await prisma.user.create({
        data: {
          name: s.name,
          email: `student${i + 1}@${DOMAIN}`,
          password: HASH("Student@123"),
          role: "student",
          student: {
            create: {
              class: s.class,
              admissionNumber: `DS/${2024 - Math.floor(i / 10)}/${String(i + 1).padStart(4, "0")}`,
              parentId: parentUser.parent!.id,
            },
          },
        },
        include: { student: true },
      });
      return user;
    })
  );
  console.log("✅ Students created");

  // Grades
  const terms = ["Term 1 2023/24", "Term 2 2023/24", "Term 1 2024/25"];
  await Promise.all(
    studentUsers.map(async (su: any) => {
      for (const term of terms) {
        for (const subject of SUBJECTS.slice(0, 6)) {
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

  // Attendance (last 90 days)
  await Promise.all(
    studentUsers.map(async (su: any) => {
      for (let i = 0; i < 60; i++) {
        const date = startOfDay(subDays(new Date(), i));
        const day = date.getDay();
        if (day === 0 || day === 6) continue;

        const roll = Math.random();
        const status: AttendanceStatus = roll > 0.1 ? "present" : roll > 0.05 ? "late" : "absent";

        await prisma.attendance.upsert({
          where: { studentId_date: { studentId: su.student!.id, date } },
          update: {},
          create: { studentId: su.student!.id, date, status },
        }).catch(() => {});
      }
    })
  );
  console.log("✅ Attendance created");

  // Fee records
  const feeTerms = [
    { term: "Term 1 2024/25", amount: 750000, dueDate: new Date("2024-09-30") },
    { term: "Term 2 2024/25", amount: 750000, dueDate: new Date("2025-01-31") },
  ];
  const feeStatuses: FeeStatus[] = ["paid", "pending", "overdue"];

  await Promise.all(
    studentUsers.map(async (su: any, i: number) => {
      for (const feeTerm of feeTerms) {
        await prisma.feeRecord.create({
          data: {
            studentId: su.student!.id,
            amount: feeTerm.amount,
            status: feeStatuses[i % 3],
            term: feeTerm.term,
            dueDate: feeTerm.dueDate,
            paidAt: feeStatuses[i % 3] === "paid" ? subDays(feeTerm.dueDate, 5) : null,
          },
        });
      }
    })
  );
  console.log("✅ Fee records created");

  // Assignments
  const assignments = await Promise.all(
    teacherUsers.map(async (tu: any) => {
      const teacher = tu.teacher!;
      const assignment = await prisma.assignment.create({
        data: {
          title: `${teacher.subjects[0]} Assignment — Term 1`,
          description: `Complete the exercises on pages 45-52 of the textbook. Show all working.`,
          dueDate: addDays(new Date(), 7),
          classId: teacher.classes[0],
          teacherId: teacher.id,
        },
      });
      return { assignment, teacher };
    })
  );
  console.log("✅ Assignments created");

  // News Articles
  const newsData = [
    {
      title: "Demo School Students Win Regional Science Competition",
      body: `Our Year 11 team claimed first place at the 2024 Regional Science Competition, defeating teams from across the state.\n\nThe team competed fiercely across categories including Physics, Chemistry, and Biology.\n\nThis achievement underscores the school's commitment to STEM excellence and the outstanding dedication of our science faculty.\n\n"We are incredibly proud of these young champions," said the school Principal. "This victory reflects the hard work of both the students and their teachers."`,
      excerpt: "Our Year 11 team claimed first place at the 2024 Regional Science Competition.",
      imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80",
      slug: "regional-science-competition-win",
    },
    {
      title: "New STEM Innovation Lab Now Open",
      body: `The newly expanded robotics and coding laboratory officially opened its doors this week, featuring state-of-the-art equipment for senior students.\n\nThe lab is equipped with Arduino kits, 3D printers, VR headsets, and high-performance computers.\n\nThis investment reflects our long-term commitment to preparing students for the digital economy of the 21st century.`,
      excerpt: "Our robotics and coding lab officially opened with cutting-edge equipment for senior students.",
      imageUrl: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800&auto=format&fit=crop&q=80",
      slug: "stem-lab-opening",
    },
    {
      title: "Class of 2024 Achieves Record WAEC Results",
      body: `The Class of 2024 has achieved the school's best-ever WAEC results, with 95% of students scoring five credits including English Language and Mathematics.\n\nThis achievement places Demo School among the top-performing schools in the region.\n\nOver 30 students achieved distinctions in all subjects sat, qualifying them for competitive university placements both locally and internationally.`,
      excerpt: "95% of our graduating class scored five credits including English and Mathematics.",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
      slug: "waec-results-2024",
    },
    {
      title: "Annual Cultural Night Celebrates Our Heritage",
      body: `The Annual Cultural Night was a spectacular celebration of our rich cultural heritage, featuring performances from over 150 students.\n\nStudents showcased traditional dances, drama, poetry, and culinary exhibitions that drew a standing ovation from the audience.`,
      excerpt: "Over 150 students performed in our spectacular celebration of culture.",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
      slug: "cultural-night-2024",
    },
    {
      title: "Sports Day 2024: Eagles House Clinches Championship",
      body: `Eagles House emerged victorious at the Inter-House Sports Day 2024, amassing points across track and field events.\n\nOver 300 students competed in events ranging from sprints and relays to long jump and shot put.\n\nThe event was a memorable showcase of sportsmanship and school spirit.`,
      excerpt: "Eagles House claimed the championship at our exhilarating annual sports day.",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
      slug: "sports-day-2024",
    },
  ];

  for (const article of newsData) {
    await prisma.newsArticle.create({
      data: {
        ...article,
        publishedAt: subDays(new Date(), Math.floor(Math.random() * 60)),
        authorId: adminUser.id,
      },
    });
  }
  console.log("✅ News articles created");

  // Events
  const eventsData = [
    { title: "End-of-Year Carol Night", description: "Annual end-of-year celebration with choir performances.", startDate: new Date("2024-12-14T18:00:00"), endDate: new Date("2024-12-14T21:00:00"), type: "Cultural" },
    { title: "Term 2 Resumption", description: "Students resume for the second term.", startDate: new Date("2025-01-13T07:30:00"), endDate: new Date("2025-01-13T08:00:00"), type: "Academic" },
    { title: "Parents-Teachers Forum", description: "Termly meeting between parents and subject teachers.", startDate: new Date("2025-01-25T09:00:00"), endDate: new Date("2025-01-25T13:00:00"), type: "Meeting" },
    { title: "Mock Examinations Begin", description: "Pre-WAEC mock examination week begins for final-year students.", startDate: new Date("2025-02-03T08:00:00"), endDate: new Date("2025-02-07T15:00:00"), type: "Academic" },
    { title: "Annual Science Fair", description: "Students present original science projects to judges.", startDate: new Date("2025-02-22T09:00:00"), endDate: new Date("2025-02-22T16:00:00"), type: "Academic" },
    { title: "Founders Day Celebration", description: "Celebrating 25 years of Demo School.", startDate: new Date("2025-03-15T10:00:00"), endDate: new Date("2025-03-15T17:00:00"), type: "Celebration" },
  ];

  for (const event of eventsData) {
    await prisma.event.create({ data: event });
  }
  console.log("✅ Events created");

  // Announcements
  await prisma.announcement.createMany({
    data: [
      { title: "Applications Now Open", body: "Applications for the 2025/2026 academic session are now open. Visit our admissions page to apply online.", targetRole: "public", authorId: adminUser.id },
      { title: "Term 2 Fee Payment Reminder", body: "Parents are reminded that Term 2 school fees are due by 31st January 2025. Please ensure prompt payment to avoid late charges.", targetRole: "parent", authorId: adminUser.id },
      { title: "Staff Professional Development Day", body: "A mandatory CPD session has been scheduled for all teaching staff on 20th January 2025. Please plan accordingly.", targetRole: "teacher", authorId: adminUser.id },
      { title: "Library Hours Extended", body: "The school library will now remain open until 6:00 PM on weekdays to support students during exam preparation season.", targetRole: "student", authorId: adminUser.id },
      { title: "Sports Day Preparations", body: "House captains are reminded to submit final team lists for Sports Day 2025 no later than 31st January.", targetRole: "all", authorId: adminUser.id },
    ],
  });
  console.log("✅ Announcements created");

  // Gallery items
  await prisma.galleryItem.createMany({
    data: [
      { imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800", caption: "Annual Science Fair", category: "Academic" },
      { imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800", caption: "Sports Day 2024", category: "Sports" },
      { imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800", caption: "Graduation Ceremony", category: "Graduation" },
      { imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800", caption: "Cultural Night", category: "Cultural" },
      { imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800", caption: "Library & Study Hall", category: "Facilities" },
      { imageUrl: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800", caption: "STEM Innovation Lab", category: "Facilities" },
      { imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", caption: "Basketball Championships", category: "Sports" },
      { imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800", caption: "Graduation 2023", category: "Graduation" },
    ],
  });
  console.log("✅ Gallery items created");

  // Library books
  await prisma.libraryBook.createMany({
    data: [
      { title: "Mathematics for SS3", author: "Demo Author", category: "Textbook", available: true },
      { title: "New School Chemistry", author: "Demo Author", category: "Textbook", available: true },
      { title: "Things Fall Apart", author: "Chinua Achebe", isbn: "9780385474542", category: "Literature", available: false },
      { title: "Purple Hibiscus", author: "Chimamanda Adichie", isbn: "9781616202415", category: "Literature", available: true },
      { title: "The Art of War", author: "Sun Tzu", isbn: "9780140441184", category: "Non-fiction", available: true },
      { title: "A Brief History of Time", author: "Stephen Hawking", isbn: "9780553380163", category: "Science", available: false },
    ],
  });
  console.log("✅ Library books created");

  // Timetable
  const teacherIdMap = teacherUsers.reduce((acc: Record<number, string>, tu: any, i: number) => {
    acc[i] = tu.teacher!.id;
    return acc;
  }, {} as Record<number, string>);

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

  // Admission applications
  await prisma.admissionApplication.createMany({
    data: [
      { firstName: "Demo", lastName: "Applicant One", email: "applicant1@example.com", phone: "+234 800 000 0001", class: "JSS1", status: "applied" },
      { firstName: "Demo", lastName: "Applicant Two", email: "applicant2@example.com", phone: "+234 800 000 0002", class: "SS1", status: "shortlisted" },
      { firstName: "Demo", lastName: "Applicant Three", email: "applicant3@example.com", phone: "+234 800 000 0003", class: "JSS2", status: "admitted" },
      { firstName: "Demo", lastName: "Applicant Four", email: "applicant4@example.com", phone: "+234 800 000 0004", class: "JSS1", status: "rejected" },
      { firstName: "Demo", lastName: "Applicant Five", email: "applicant5@example.com", phone: "+234 800 000 0005", class: "SS2", status: "applied" },
    ],
  });
  console.log("✅ Admission applications created");

  console.log("\n🎉 Database seeded successfully!");
  console.log("\n--- Login Credentials ---");
  console.log(`Admin:   ${ADMIN_EMAIL} / Admin@123`);
  console.log(`Teacher: teacher1@${DOMAIN} / Teacher@123`);
  console.log("Parent:  parent1@example.com / Parent@123");
  console.log(`Student: student1@${DOMAIN} / Student@123`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

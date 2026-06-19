# SchoolKit

**Premium School Website & Multi-Role Portal System**

A complete, production-ready school website and portal system built with Next.js 14, TypeScript, Tailwind CSS, and Supabase. White-label ready — deploy for any school by editing a single config file.

---

## Live Demo

**[school-website-three-beta.vercel.app](https://school-website-three-beta.vercel.app)**

### Demo Credentials

Use these to explore each portal dashboard on the live demo:

| Role    | Email                        | Password  | Dashboard                |
|---------|------------------------------|-----------|--------------------------|
| Parent  | parent@demo.schoolkit.ng     | Demo1234! | /portal/parent           |
| Student | student@demo.schoolkit.ng    | Demo1234! | /portal/student          |
| Teacher | teacher@demo.schoolkit.ng    | Demo1234! | /portal/teacher          |
| Admin   | admin@demo.schoolkit.ng      | Demo1234! | /portal/admin            |

> All demo data is fictional. No real school data is used.

---

## What's Included

- **Public website** — Landing page, About, Admissions, News, Gallery, Contact (7 pages)
- **Parent portal** — Dashboard, Children, Grades, Attendance, Assignments, Fees, Messages, Report Cards, Announcements (9 pages)
- **Student portal** — Dashboard, Timetable, Assignments, Grades, Library, Resources, Events (7 pages)
- **Teacher portal** — Dashboard, Classes, Attendance, Grades, Assignments, Lesson Plans, Messages, Announcements (8 pages)
- **Admin portal** — Dashboard, Students, Staff, Admissions, Fees, Content, Users, Exams (8 pages)
- **White-label config** — `school.config.ts` controls name, colors, contact, social links
- **Paystack integration** — Nigerian payment gateway for school fees
- **Real-time messaging** — Parents and teachers via Supabase Realtime
- **Analytics dashboards** — Recharts-powered attendance, financial, and performance charts
- **Database seed** — Realistic demo data pre-loaded with one command

---

## Quick Start

### 1. Clone and install dependencies

```bash
git clone https://github.com/your-username/school-website.git
cd school-website
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your values:

```env
# NextAuth
NEXTAUTH_SECRET=your-random-secret        # Run: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000

# Supabase (supabase.com → your project → Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database (supabase.com → Settings → Database → URI)
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres

# Paystack (dashboard.paystack.com → Settings → API Keys)
PAYSTACK_SECRET_KEY=sk_test_xxxx
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxx

# Resend (resend.com → API Keys)
RESEND_API_KEY=re_xxxx

# School Identity
NEXT_PUBLIC_SCHOOL_NAME=Your School Name
NEXT_PUBLIC_SCHOOL_TAGLINE=Your School Tagline
```

### 3. Push database schema

```bash
npm run db:push
```

### 4. Seed with demo data

```bash
npm run db:seed
```

This creates:
- 1 Admin, 2 Teachers, 1 Parent, 2 Students
- Sample grades, attendance records, fee records
- News articles, announcements, events, gallery items

Seeded login credentials match whatever `seed.staffEmailDomain` is set to in `school.config.ts`.

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## White-Label Configuration

Open `school.config.ts` in the project root. This is the only file you need to edit to rebrand the entire site for a client.

```typescript
const schoolConfig = {
  name: "Your School Name",
  tagline: "Your School Tagline",

  brand: {
    accentColor: "#C2593F",   // Change to any hex color
    logoPath: "/logo.png",    // Drop your logo in /public/
  },

  contact: {
    address: "14 School Road, Victoria Island, Lagos",
    phone: ["+234 801 234 5678"],
    email: "info@yourschool.edu.ng",
    officeHours: "Monday – Friday: 7:30 AM – 5:00 PM",
    mapEmbedUrl: "your-google-maps-embed-url",
  },

  social: {
    facebook: "https://facebook.com/yourschool",
    twitter:  "https://twitter.com/yourschool",
    instagram: "https://instagram.com/yourschool",
    youtube:  "https://youtube.com/yourschool",
  },

  currency: {
    symbol: "₦",
    code: "NGN",
    locale: "en-NG",
  },

  seed: {
    staffEmailDomain: "yourschool.edu.ng",
    adminPassword: "Admin1234!",
  },
}
```

After editing, rebuild with `npm run build` and the entire site reflects the new branding.

---

## Deployment (Vercel + Supabase)

### Vercel

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your GitHub repo
3. Add all environment variables from `.env.local` under **Settings → Environment Variables**
4. Click Deploy

### Custom Domain

In Vercel → your project → **Domains**, add your domain and update:
```env
NEXTAUTH_URL=https://yourdomain.com
```

### After Deploying

Run these against your live Supabase database to set up schema and seed data:

```bash
npx prisma db push
npx prisma db seed
```

---

## Project Structure

```
school-website/
├── school.config.ts          ← White-label config (start here)
├── prisma/
│   ├── schema.prisma         ← Database schema (16 tables)
│   └── seed.ts               ← Demo data seed script
└── src/
    ├── app/
    │   ├── page.tsx          ← Public landing page
    │   ├── about/            ← About page
    │   ├── admissions/       ← Admissions page
    │   ├── news/             ← News listing + article pages
    │   ├── gallery/          ← Photo gallery
    │   ├── contact/          ← Contact page
    │   ├── login/            ← Role-based login
    │   └── portal/
    │       ├── parent/       ← Parent portal (9 pages)
    │       ├── student/      ← Student portal (7 pages)
    │       ├── teacher/      ← Teacher portal (8 pages)
    │       └── admin/        ← Admin portal (8 pages)
    ├── components/
    │   ├── portal/           ← Sidebar, TopBar, DemoBanner
    │   └── ui/               ← Button, Input, Badge, Avatar
    └── lib/
        ├── demo-data.ts      ← All mock data for demo mode
        ├── prisma.ts         ← Prisma client
        └── supabase.ts       ← Supabase client
```

---

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Framework  | Next.js 14 (App Router) |
| Language   | TypeScript              |
| Styling    | Tailwind CSS v4         |
| Database   | Supabase (PostgreSQL)   |
| ORM        | Prisma                  |
| Auth       | NextAuth.js             |
| Payments   | Paystack                |
| Email      | Resend                  |
| Charts     | Recharts                |
| Fonts      | Playfair Display + Inter|
| Hosting    | Vercel + Supabase       |

---

## Requirements

- Node.js 18+
- npm or yarn
- Supabase account (free tier sufficient)
- Vercel account (free tier sufficient)
- Paystack account (for live payments)
- Resend account (for email notifications)

---

## License

**Regular License** — Single deployment for one school client.
**Extended License** — Deploy for multiple school clients, resell as a service.

---

## Support

For bugs or questions, open an issue on the GitHub repository.

For customization work or white-label deployment assistance, contact via the purchase platform.

---

## Changelog

### v1.0.0
- Initial release
- 7 public pages
- 32 portal pages across 4 roles
- White-label config system
- Paystack integration
- Real-time messaging
- Analytics dashboards
- Seed script with demo data

// ⚠️ DEMO DATA — Replace all values below with your school's real information

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * school.config.ts — White-label configuration
 *
 * This is the SINGLE file to edit when deploying this codebase for a new school.
 * Every piece of school-specific content, branding, and contact information
 * originates here. After editing, run `npm run build` to apply all changes.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const schoolConfig = {
  // ── Core identity ───────────────────────────────────────────────────────────
  name: "SchoolKit Demo",
  tagline: "Nurturing Excellence, Building Character",
  /** Path inside /public — replace with your own logo file */
  logoPath: "/logo.svg",
  established: "2000",
  location: "Your City, Nigeria",

  // ── Brand ───────────────────────────────────────────────────────────────────
  /** Primary accent color used throughout the UI (hex) */
  brand: {
    accentColor: "#C2593F",
    accentColorDark: "#A8452F",
  },

  // ── Currency & payments ──────────────────────────────────────────────────────
  /**
   * currency.code must match your Paystack/Stripe configuration.
   * Supported Paystack codes: NGN, GHS, ZAR, USD, GBP, KES, XOF, EGP, RWF
   */
  currency: {
    symbol: "₦",
    code: "NGN",
    locale: "en-NG",
  },

  // ── Contact ──────────────────────────────────────────────────────────────────
  contact: {
    address: {
      full: "123 Demo Street, Your City, Nigeria",
      /**
       * OpenStreetMap embed URL — paste your school's coordinates here.
       * Leave empty ("") to hide the map embed on the contact page.
       */
      mapEmbedUrl: "",
    },
    /** First item is the primary number shown in the footer */
    phone: ["+234 800 000 0000", "+234 800 000 0001"],
    email: {
      info: "info@yourschool.edu.ng",
      admissions: "admissions@yourschool.edu.ng",
    },
    hours: {
      weekdays: "Monday – Friday: 7:30 AM – 5:00 PM",
      saturday: "Saturday: 8:00 AM – 12:00 PM",
      /** Display label for the portal footer */
      weekdaysShort: "Monday – Friday",
      weekdaysTime: "7:30 AM – 4:00 PM",
      saturdayShort: "Saturday (Prep)",
      saturdayTime: "8:00 AM – 12:00 PM",
    },
  },

  // ── Social links ─────────────────────────────────────────────────────────────
  social: {
    facebook: "#",
    twitter: "#",
    instagram: "#",
    youtube: "#",
  },

  // ── Accreditations (displayed in hero strip) ─────────────────────────────────
  accreditations: ["WAEC", "NECO", "Cambridge", "British Council", "JAMB", "NUC"],

  // ── Key statistics (hero card, about page) ──────────────────────────────────
  stats: {
    studentsEnrolled: "1,200+",
    staffCount: "80+",
    alumniWorldwide: "5,000+",
    countriesRepresented: "10+",
    passRate: "95%",
    passRateYear: "2024",
    yearsOfExcellence: "25",
    examBoard: "WAEC",
  },

  // ── Landing page: hero section ───────────────────────────────────────────────
  hero: {
    eyebrow: "Est. 2000 · Your City, Nigeria",
    headline: ["Shaping the", "Leaders of", "Tomorrow"],
    /** Word in the headline to italicise with accent colour */
    accentWord: "Leaders",
    description:
      "Demo School offers a world-class education that nurtures intellectual curiosity, moral character, and the resilience to succeed in a changing world.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&auto=format&fit=crop&q=80",
  },

  // ── Landing page: announcement banner ───────────────────────────────────────
  alertBanner: {
    title: "Welcome to SchoolKit Demo",
    body: "Applications for the 2025/2026 academic session are now open.",
  },

  // ── Landing page: admissions CTA ────────────────────────────────────────────
  admissions: {
    academicSession: "2025/2026",
    ctaHeading: "Join Our School Family",
    ctaBody:
      "Applications are open for all classes. Limited spaces available — begin your child's journey to excellence today.",
  },

  // ── About page & timeline ────────────────────────────────────────────────────
  history: {
    intro:
      "Demo School was founded on the belief that every child deserves access to world-class education. Over 25 years, we have grown from a modest institution into one of the most respected schools in the region, with a legacy of 5,000+ alumni shaping the world.",
    milestones: [
      {
        year: "2000",
        title: "Foundation",
        desc: "Demo School was founded with an initial cohort of 80 students.",
      },
      {
        year: "2006",
        title: "First Graduating Class",
        desc: "Our inaugural senior secondary class achieved a 100% WAEC pass rate, setting the standard for excellence.",
      },
      {
        year: "2010",
        title: "New Campus",
        desc: "Moved to our current campus, featuring modern facilities and expanded classrooms.",
      },
      {
        year: "2015",
        title: "Cambridge Affiliation",
        desc: "Became affiliated with Cambridge International Curriculum alongside WAEC.",
      },
      {
        year: "2019",
        title: "STEM Centre",
        desc: "Opened a new STEM Innovation Centre, equipped with robotics labs and maker spaces.",
      },
      {
        year: "2021",
        title: "Digital Learning",
        desc: "Launched a hybrid learning platform serving students during and beyond the pandemic.",
      },
      {
        year: "2024",
        title: "Today",
        desc: "1,200+ students, 80 staff, and a network of 5,000+ alumni across 10 countries.",
      },
    ],
  },

  // ── About page: leadership team ──────────────────────────────────────────────
  leadership: [
    { name: "Dr. Sample Founder", role: "Founder & Chairman", since: "2000" },
    { name: "Mrs. Demo Principal", role: "Principal", since: "2015" },
    { name: "Mr. Demo VP Academics", role: "Vice Principal (Academics)", since: "2018" },
    { name: "Mrs. Demo VP Admin", role: "Vice Principal (Administration)", since: "2019" },
    { name: "Mr. Demo Pastoral", role: "Head of Pastoral Care", since: "2017" },
    { name: "Dr. Demo Curriculum", role: "Director of Curriculum", since: "2020" },
  ],

  // ── SEO ──────────────────────────────────────────────────────────────────────
  seo: {
    description:
      "A premier educational institution dedicated to academic excellence and holistic development.",
  },

  // ── Seed script ──────────────────────────────────────────────────────────────
  /**
   * Used only by `prisma/seed.ts` to generate demo email addresses.
   * Change this to match your school's actual staff email domain.
   */
  seed: {
    staffEmailDomain: "yourschool.edu.ng",
    adminEmail: "admin@yourschool.edu.ng",
  },
} as const;

export type SchoolConfig = typeof schoolConfig;
export default schoolConfig;

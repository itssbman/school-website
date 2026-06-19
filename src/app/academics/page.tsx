import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import schoolConfig from "../../../school.config";
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Globe,
  Monitor,
  Palette,
  Languages,
  Award,
  Download,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const programmes = [
  {
    level: "01",
    title: "Primary School",
    range: "Years 1 – 6",
    desc: "A play-based yet rigorous foundation covering literacy, numeracy, science, and the arts. We develop curiosity and confidence before specialist subjects begin.",
  },
  {
    level: "02",
    title: "Junior Secondary",
    range: "JSS 1 – 3",
    desc: "Pupils study a broad curriculum across all subject areas leading to the Junior WAEC (BECE). Emphasis on critical thinking, reading, and quantitative reasoning.",
  },
  {
    level: "03",
    title: "Senior Secondary",
    range: "SS 1 – 3",
    desc: "Students specialise in Science, Arts, or Commercial tracks. Preparation for WAEC SSCE and NECO, with Cambridge IGCSE available as a parallel qualification.",
  },
  {
    level: "04",
    title: "A-Level & Pre-University",
    range: "Post SS3",
    desc: "Cambridge International A-Levels and JAMB UTME intensive coaching for students targeting top universities locally and internationally.",
  },
];

const subjects = [
  {
    icon: BookOpen,
    name: "English Language & Literature",
    topics: ["Comprehension & essay writing", "Shakespeare & African literature", "Oral & communication skills"],
  },
  {
    icon: Calculator,
    name: "Mathematics",
    topics: ["Pure and applied mathematics", "Further mathematics (SS track)", "Statistics and probability"],
  },
  {
    icon: FlaskConical,
    name: "Sciences",
    topics: ["Physics, Chemistry, Biology", "Integrated science (Junior)", "Practical laboratory work"],
  },
  {
    icon: Globe,
    name: "Humanities & Social Sciences",
    topics: ["History and Government", "Economics and Commerce", "Geography and CRS/IRS"],
  },
  {
    icon: Monitor,
    name: "Information & Communication Technology",
    topics: ["Computer fundamentals & coding", "Robotics and AI literacy", "Digital citizenship"],
  },
  {
    icon: Palette,
    name: "Creative Arts",
    topics: ["Fine art, sculpture, ceramics", "Drama, music, and dance", "Photography and media arts"],
  },
  {
    icon: Languages,
    name: "Languages",
    topics: ["French (compulsory JSS 1–3)", "Yoruba / Igbo / Hausa", "Latin (elective, SS track)"],
  },
];

const exams = [
  {
    code: "WAEC",
    full: "West African Examinations Council",
    detail:
      "Our students consistently achieve above the national average. WAEC SSCE preparation begins in SS1 with structured past-paper practice, mock examinations, and one-on-one teacher coaching.",
    stat: `${schoolConfig.stats.passRate} pass rate (${schoolConfig.stats.passRateYear})`,
  },
  {
    code: "NECO",
    full: "National Examinations Council",
    detail:
      "All SS3 students sit NECO SSCE alongside WAEC, maximising university entry options. The timetables are managed so subjects never conflict.",
    stat: "Dual certification",
  },
  {
    code: "Cambridge",
    full: "Cambridge IGCSE & A-Levels",
    detail:
      "Available as a parallel qualification from SS1. Taught by Cambridge-trained teachers, assessed by Cambridge examiners. Recognised by universities worldwide.",
    stat: "Internationally recognised",
  },
  {
    code: "JAMB",
    full: "Joint Admissions & Matriculation Board",
    detail:
      "Dedicated UTME coaching classes run from January to April for SS3 students. Regular CBT mock tests are held in our ICT lab under timed conditions.",
    stat: "CBT mock tests weekly",
  },
];

const termDates = [
  { term: "First Term", open: "Sept 15, 2025", close: "Dec 12, 2025" },
  { term: "Second Term", open: "Jan 12, 2026", close: "Apr 3, 2026" },
  { term: "Third Term", open: "Apr 27, 2026", close: "Jul 17, 2026" },
];

const achievements = [
  { value: schoolConfig.stats.passRate, label: `${schoolConfig.stats.examBoard} Pass Rate ${schoolConfig.stats.passRateYear}` },
  { value: schoolConfig.stats.studentsEnrolled, label: "Students Enrolled" },
  { value: schoolConfig.stats.staffCount, label: "Qualified Educators" },
  { value: schoolConfig.stats.alumniWorldwide, label: "Alumni Worldwide" },
];

export default function AcademicsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="border-b border-[#E5E3DF] py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">
              Academics
            </span>
            <h1 className="font-heading text-[48px] font-bold text-[#1A2B49] mt-2 mb-6 max-w-2xl leading-tight">
              An Education Built to Last
            </h1>
            <p className="text-[18px] text-[#6B7280] max-w-3xl leading-relaxed">
              From Primary through A-Levels, our curriculum combines the rigour of international
              frameworks with the context of the Nigerian education system — producing graduates who
              are prepared for the world's best universities and the demands of professional life.
            </p>
          </div>
        </section>

        {/* ── Programmes ────────────────────────────────────────────────────── */}
        <section className="border-b border-[#E5E3DF] py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">
              Programmes
            </span>
            <h2 className="font-heading text-[32px] font-bold text-[#1A2B49] mt-2 mb-10">
              Curriculum Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#E5E3DF]">
              {programmes.map((prog, i) => (
                <div
                  key={prog.level}
                  className={`p-8 border-[#E5E3DF] ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""}`}
                >
                  <span className="font-heading text-[48px] font-bold text-[#E5E3DF] leading-none block mb-4">
                    {prog.level}
                  </span>
                  <h3 className="font-heading text-[22px] font-semibold text-[#1A2B49] mb-1">
                    {prog.title}
                  </h3>
                  <p className="text-[12px] font-medium text-terracotta uppercase tracking-widest mb-3">
                    {prog.range}
                  </p>
                  <p className="text-[15px] text-[#6B7280] leading-relaxed">{prog.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Subject Areas ─────────────────────────────────────────────────── */}
        <section className="border-b border-[#E5E3DF] py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">
              Subject Areas
            </span>
            <h2 className="font-heading text-[32px] font-bold text-[#1A2B49] mt-2 mb-10">
              What We Teach
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map(({ icon: Icon, name, topics }) => (
                <div key={name} className="border border-[#E5E3DF] p-6 hover:border-[#1A2B49] transition-colors duration-150">
                  <div className="w-10 h-10 bg-terracotta/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-terracotta" />
                  </div>
                  <h3 className="font-heading text-[17px] font-semibold text-[#1A2B49] mb-3">{name}</h3>
                  <ul className="space-y-1.5">
                    {topics.map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-terracotta mt-2 flex-shrink-0" />
                        <span className="text-[13px] text-[#6B7280]">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Filler card — keeps 3-col grid balanced and links to admissions */}
              <div className="border border-dashed border-[#E5E3DF] p-6 flex flex-col justify-center items-center text-center">
                <Award size={24} className="text-[#E5E3DF] mb-3" />
                <p className="text-[13px] text-[#6B7280] leading-relaxed">
                  Elective subjects are available from SS1 based on the chosen track — Science, Arts, or Commercial.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Academic Calendar ─────────────────────────────────────────────── */}
        <section className="border-b border-[#E5E3DF] py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">
                  Academic Calendar
                </span>
                <h2 className="font-heading text-[32px] font-bold text-[#1A2B49] mt-2 mb-4">
                  2025 / 2026 School Year
                </h2>
                <p className="text-[16px] text-[#6B7280] leading-relaxed mb-8">
                  The school year runs across three terms from September to July. Download the full
                  calendar for examination timetables, public holidays, sports days, and all
                  co-curricular events.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 border border-[#1A2B49] text-[#1A2B49] px-5 py-2.5 text-[14px] font-medium hover:bg-[#1A2B49] hover:text-white transition-colors duration-150"
                >
                  <Download size={15} />
                  Download Full Calendar (PDF)
                </a>
              </div>

              <div className="border border-[#E5E3DF]">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E5E3DF]">
                  <CalendarDays size={16} className="text-terracotta" />
                  <span className="text-[13px] font-semibold text-[#1A2B49] uppercase tracking-wider">Term Dates</span>
                </div>
                {termDates.map((t, i) => (
                  <div
                    key={t.term}
                    className={`px-6 py-5 ${i < termDates.length - 1 ? "border-b border-[#E5E3DF]" : ""}`}
                  >
                    <p className="text-[13px] font-semibold text-[#1A2B49] mb-2">{t.term}</p>
                    <div className="grid grid-cols-2 gap-4 text-[13px]">
                      <div>
                        <span className="text-[#9CA3AF] block mb-0.5">Opens</span>
                        <span className="text-[#6B7280] font-medium">{t.open}</span>
                      </div>
                      <div>
                        <span className="text-[#9CA3AF] block mb-0.5">Closes</span>
                        <span className="text-[#6B7280] font-medium">{t.close}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Examinations ──────────────────────────────────────────────────── */}
        <section className="border-b border-[#E5E3DF] py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">
              External Examinations
            </span>
            <h2 className="font-heading text-[32px] font-bold text-[#1A2B49] mt-2 mb-10">
              Preparing Students to Excel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#E5E3DF]">
              {exams.map((exam, i) => (
                <div
                  key={exam.code}
                  className={`p-8 border-[#E5E3DF] ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="font-heading text-[26px] font-bold text-[#1A2B49]">{exam.code}</span>
                      <p className="text-[12px] text-[#6B7280] mt-0.5">{exam.full}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-terracotta bg-terracotta/10 px-2.5 py-1 whitespace-nowrap">
                      {exam.stat}
                    </span>
                  </div>
                  <p className="text-[14px] text-[#6B7280] leading-relaxed">{exam.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-[#FBFBFA] border border-[#E5E3DF]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Mock exams per term", value: "3 full mock sets" },
                  { label: "Past papers on file", value: "15+ years" },
                  { label: "Subject clinics (weekly)", value: "All core subjects" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#3D5A45] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[13px] font-semibold text-[#1A2B49]">{item.value}</p>
                      <p className="text-[12px] text-[#6B7280]">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Results Strip ─────────────────────────────────────────────────── */}
        <section className="bg-[#1A2B49] py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <p className="text-[12px] font-medium text-terracotta uppercase tracking-widest mb-8 text-center">
              Results & Achievements
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10">
              {achievements.map((item, i) => (
                <div
                  key={item.label}
                  className={`py-10 px-6 text-center border-white/10 ${i < achievements.length - 1 ? "border-r" : ""}`}
                >
                  <p className="font-heading text-[48px] font-bold text-white leading-none mb-2">
                    {item.value}
                  </p>
                  <p className="text-[13px] text-white/60">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">
              Ready to Join?
            </span>
            <h2 className="font-heading text-[40px] font-bold text-[#1A2B49] mt-2 mb-4 max-w-xl mx-auto leading-tight">
              Give Your Child the Academic Edge
            </h2>
            <p className="text-[17px] text-[#6B7280] max-w-lg mx-auto mb-8 leading-relaxed">
              Applications for the {schoolConfig.admissions.academicSession} academic session are
              open. Limited places available across all year groups.
            </p>
            <Link href="/admissions">
              <Button variant="primary" size="lg">
                Apply for Admission
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

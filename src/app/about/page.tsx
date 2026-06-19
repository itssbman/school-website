import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import schoolConfig from "../../../school.config";

export default function AboutPage() {
  const { name, stats, history, leadership } = schoolConfig;

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="border-b border-[#E5E3DF] py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">About Us</span>
            <h1 className="font-heading text-[48px] font-bold text-[#1A2B49] mt-2 mb-6 max-w-2xl">
              A Legacy of Excellence Since {schoolConfig.established}
            </h1>
            <p className="text-[18px] text-[#6B7280] max-w-3xl leading-relaxed">
              {history.intro}
            </p>
          </div>
        </section>

        <section className="border-b border-[#E5E3DF] py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                { value: stats.studentsEnrolled, label: "Students Enrolled" },
                { value: stats.staffCount, label: "Teaching & Support Staff" },
                { value: `${stats.passRate}`, label: `${stats.examBoard} Pass Rate ${stats.passRateYear}` },
                { value: stats.alumniWorldwide, label: "Alumni Worldwide" },
                { value: stats.countriesRepresented, label: "Countries Represented" },
                { value: stats.yearsOfExcellence, label: "Years of Excellence" },
              ].map((stat) => (
                <div key={stat.label} className="text-center py-8 border border-[#E5E3DF]">
                  <p className="font-heading text-[48px] font-bold text-terracotta">{stat.value}</p>
                  <p className="text-[14px] text-[#6B7280] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#E5E3DF] py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <h2 className="font-heading text-[32px] font-bold text-[#1A2B49] mb-12">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#E5E3DF]">
              {leadership.map((person, i) => (
                <div
                  key={person.name}
                  className={`p-6 border-b border-r border-[#E5E3DF] ${
                    i % 3 === 2 ? "border-r-0" : ""
                  } ${i >= leadership.length - 3 ? "border-b-0" : ""}`}
                >
                  <div className="w-14 h-14 bg-[#1A2B49] text-white flex items-center justify-center text-[20px] font-bold font-heading mb-4">
                    {person.name.charAt(0)}
                  </div>
                  <h3 className="font-heading text-[18px] font-semibold text-[#1A2B49]">{person.name}</h3>
                  <p className="text-[14px] text-terracotta mt-0.5">{person.role}</p>
                  <p className="text-[12px] text-[#6B7280] mt-2">Since {person.since}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">Our Mission</span>
                <h2 className="font-heading text-[28px] font-bold text-[#1A2B49] mt-2 mb-4">What Drives Us</h2>
                <p className="text-[16px] text-[#6B7280] leading-relaxed">
                  To provide an enriching and rigorous academic environment that challenges students to achieve their highest potential, while cultivating values of integrity, empathy, and a lifelong love of learning. We believe every child carries an extraordinary capacity for greatness.
                </p>
              </div>
              <div>
                <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">Our Vision</span>
                <h2 className="font-heading text-[28px] font-bold text-[#1A2B49] mt-2 mb-4">Where We&apos;re Going</h2>
                <p className="text-[16px] text-[#6B7280] leading-relaxed">
                  To be West Africa&apos;s foremost institution for holistic education — producing graduates who are academically excellent, morally grounded, globally aware, and equipped to lead with compassion and conviction in every sphere of human endeavour.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

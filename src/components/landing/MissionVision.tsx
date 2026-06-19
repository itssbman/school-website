export default function MissionVision() {
  return (
    <section className="border-b border-[#E5E3DF]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x lg:divide-[#E5E3DF]">
          <div className="pb-12 lg:pb-0 lg:pr-16">
            <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">Our Mission</span>
            <p className="drop-cap mt-4 text-[18px] text-[#1A2B49] leading-relaxed font-body">
              To provide an enriching and rigorous academic environment that challenges students to achieve their highest potential, while cultivating values of integrity, empathy, and a lifelong love of learning. We believe every child carries an extraordinary capacity for greatness — and our role is to help them discover and develop it.
            </p>
          </div>

          <div className="lg:pl-16 border-t border-[#E5E3DF] pt-12 lg:border-t-0 lg:pt-0">
            <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">Our Vision</span>
            <h3 className="font-heading text-[24px] font-semibold text-[#1A2B49] mt-4 mb-6">
              A generation of thinkers, leaders, and innovators shaping Africa's future.
            </h3>

            <ol className="space-y-5">
              {[
                {
                  number: "01",
                  title: "Academic Rigour",
                  body: "Internationally benchmarked curriculum with emphasis on critical thinking and inquiry.",
                },
                {
                  number: "02",
                  title: "Character Formation",
                  body: "Values-driven education built on honesty, responsibility, and respect for all.",
                },
                {
                  number: "03",
                  title: "Global Citizenship",
                  body: "Preparing students for an interconnected world through cultural exposure and service.",
                },
              ].map((item) => (
                <li key={item.number} className="flex items-start gap-5">
                  <span className="font-heading text-[32px] font-bold text-[#E5E3DF] leading-none flex-shrink-0 mt-1">
                    {item.number}
                  </span>
                  <div>
                    <h4 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-1">{item.title}</h4>
                    <p className="text-[14px] text-[#6B7280] leading-relaxed">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

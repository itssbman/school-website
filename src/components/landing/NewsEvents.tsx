import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import schoolConfig from "../../../school.config";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string | null;
  publishedAt: Date;
  slug: string;
}

interface SchoolEvent {
  id: string;
  title: string;
  startDate: Date;
  type: string;
}

interface NewsEventsProps {
  news?: NewsArticle[];
  events?: SchoolEvent[];
}

const defaultNews = [
  { id: "1", title: `${schoolConfig.name} Students Win National Science Olympiad`, excerpt: "Our Year 11 team claimed first place at the 2024 National Science Olympiad held in Abuja, defeating 87 schools.", publishedAt: new Date("2024-11-15"), slug: "national-science-olympiad-win" },
  { id: "2", title: "New STEM Innovation Lab Now Open", excerpt: "The newly expanded robotics and coding lab officially opened its doors with cutting-edge equipment for senior students.", publishedAt: new Date("2024-11-08"), slug: "stem-lab-opening" },
  { id: "3", title: "Class of 2024 Achieves Record WAEC Results", excerpt: "98.7% of our graduating class scored five credits including English and Mathematics in the 2024 WAEC examinations.", publishedAt: new Date("2024-10-29"), slug: "waec-results-2024" },
];

const defaultEvents = [
  { id: "1", title: "Annual Sports Day", startDate: new Date("2024-12-07"), type: "Sports" },
  { id: "2", title: "Christmas Carol Night", startDate: new Date("2024-12-14"), type: "Cultural" },
  { id: "3", title: "Term 2 Resumption", startDate: new Date("2025-01-13"), type: "Academic" },
  { id: "4", title: "Parents-Teachers Forum", startDate: new Date("2025-01-25"), type: "Meeting" },
  { id: "5", title: "Mock Examinations Begin", startDate: new Date("2025-02-03"), type: "Academic" },
];

export default function NewsEvents({ news = defaultNews, events = defaultEvents }: NewsEventsProps) {
  return (
    <section className="border-b border-[#E5E3DF]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-0 lg:divide-x lg:divide-[#E5E3DF]">
          <div className="pb-12 lg:pb-0 lg:pr-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">Latest News</span>
                <h2 className="font-heading text-[24px] font-bold text-[#1A2B49] mt-1">From the Newsroom</h2>
              </div>
              <Link href="/news" className="flex items-center gap-1 text-[13px] text-[#6B7280] hover:text-terracotta transition-colors">
                View all <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-0">
              {news.map((article, i) => (
                <Link key={article.id} href={`/news/${article.slug}`} className="group block">
                  <article className="flex gap-6 py-6 border-b border-[#E5E3DF] hover:bg-[#FBFBFA] transition-colors -mx-4 px-4">
                    <span className="font-heading text-[48px] font-bold text-[#E5E3DF] leading-none flex-shrink-0 group-hover:text-terracotta/30 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <time className="text-[11px] text-[#6B7280] uppercase tracking-wider">
                        {format(new Date(article.publishedAt), "d MMM yyyy")}
                      </time>
                      <h3 className="font-heading text-[18px] font-semibold text-[#1A2B49] mt-1 mb-2 group-hover:text-terracotta transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-[14px] text-[#6B7280] line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:pl-16 border-t border-[#E5E3DF] pt-12 lg:border-t-0 lg:pt-0">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">Upcoming Events</span>
                <h2 className="font-heading text-[24px] font-bold text-[#1A2B49] mt-1">School Calendar</h2>
              </div>
              <Link href="/events" className="flex items-center gap-1 text-[13px] text-[#6B7280] hover:text-terracotta transition-colors">
                View all <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {events.map((event) => {
                const d = new Date(event.startDate);
                return (
                  <div key={event.id} className="flex items-start gap-4 py-3 border-b border-[#E5E3DF]">
                    <div className="flex-shrink-0 w-12 text-center">
                      <div className="bg-terracotta text-white text-[20px] font-bold font-heading leading-none py-1.5">
                        {format(d, "d")}
                      </div>
                      <div className="text-[10px] font-medium text-[#6B7280] uppercase tracking-wide mt-0.5 bg-[#F5F4F2] py-0.5">
                        {format(d, "MMM")}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-[#1A2B49]">{event.title}</h4>
                      <span className="text-[11px] text-[#6B7280] mt-0.5">{event.type}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

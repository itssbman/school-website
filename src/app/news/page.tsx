import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

export default async function NewsPage() {
  let articles: any[] = [];
  try {
    articles = await prisma.newsArticle.findMany({
      orderBy: { publishedAt: "desc" },
      include: { author: { select: { name: true } } },
    });
  } catch {}

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="border-b border-[#E5E3DF] py-12">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">School News</span>
            <h1 className="font-heading text-[48px] font-bold text-[#1A2B49] mt-2">Newsroom</h1>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            {articles.length === 0 ? (
              <p className="text-[#6B7280] text-center py-12">No news articles published yet.</p>
            ) : (
              <div className="space-y-0">
                {articles.map((article, i) => (
                  <Link key={article.id} href={`/news/${article.slug}`} className="group block">
                    <article className="flex gap-8 py-8 border-b border-[#E5E3DF] hover:bg-[#FBFBFA] -mx-4 px-4 transition-colors">
                      <span className="font-heading text-[64px] font-bold text-[#E5E3DF] leading-none flex-shrink-0 group-hover:text-terracotta/20 transition-colors hidden md:block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {article.imageUrl && (
                        <div
                          className="w-40 h-28 flex-shrink-0 hidden lg:block"
                          style={{
                            backgroundImage: `url('${article.imageUrl}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <time className="text-[11px] text-[#6B7280] uppercase tracking-wider">
                          {format(new Date(article.publishedAt), "d MMMM yyyy")}
                          {article.author && ` · ${article.author.name}`}
                        </time>
                        <h2 className="font-heading text-[22px] font-bold text-[#1A2B49] mt-1 mb-2 group-hover:text-terracotta transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-[15px] text-[#6B7280] line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-3 text-[13px] font-medium text-terracotta">
                          Read more <ArrowRight size={13} />
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

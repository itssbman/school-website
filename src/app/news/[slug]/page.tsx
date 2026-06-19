import { notFound } from "next/navigation";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  let article: any = null;
  try {
    article = await prisma.newsArticle.findUnique({
      where: { slug },
      include: { author: { select: { name: true } } },
    });
  } catch {}

  if (!article) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <article className="py-12">
          <div className="max-w-[720px] mx-auto px-6 lg:px-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[13px] text-[#6B7280] hover:text-[var(--accent)] transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Back to Newsroom
            </Link>

            <header className="mb-10 pb-8 border-b border-[#E5E3DF]">
              <time className="text-[12px] text-[#6B7280] uppercase tracking-wider">
                {format(new Date(article.publishedAt), "d MMMM yyyy")}
                {article.author && ` · By ${article.author.name}`}
              </time>
              <h1 className="font-heading text-[40px] font-bold text-[#1A2B49] mt-3 mb-4 leading-tight">
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="text-[18px] text-[#6B7280] leading-relaxed border-l-2 border-[var(--accent)] pl-4">
                  {article.excerpt}
                </p>
              )}
            </header>

            {article.imageUrl && (
              <div
                className="w-full h-80 mb-8"
                style={{
                  backgroundImage: `url('${article.imageUrl}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}

            <div className="prose prose-lg max-w-none">
              {article.body.split("\n\n").map((para: string, i: number) => (
                <p key={i} className="text-[16px] text-[#1A2B49] leading-relaxed mb-5">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

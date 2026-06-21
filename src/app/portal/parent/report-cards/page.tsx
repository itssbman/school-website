import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FileText } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default async function ParentReportCardsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "parent") redirect("/login");

  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    include: {
      children: {
        include: {
          user: { select: { name: true } },
          grades: { orderBy: { term: "desc" } },
        },
      },
    },
  });

  if (!parent) redirect("/login");

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Report Cards</h2>
        <p className="text-[14px] text-[#6B7280]">End-of-term academic reports for your children</p>
      </div>

      {(parent.children as any[]).map((child: any) => {
        const terms = Array.from(new Set((child.grades as any[]).map((g: any) => g.term))).sort().reverse();

        return (
          <div key={child.id} className="bg-white border border-[#E5E3DF]">
            <div className="px-5 py-4 border-b border-[#E5E3DF] bg-[#F9F8F7]">
              <p className="font-heading text-[15px] font-bold text-[#1A2B49]">{child.user.name}</p>
              <p className="text-[12px] text-[#6B7280]">Class {child.class} · {child.admissionNumber}</p>
            </div>
            {terms.length === 0 ? (
              <div className="px-5 py-6 text-center text-[#6B7280] text-[13px]">No grade data available yet.</div>
            ) : (
              <div className="divide-y divide-[#E5E3DF]">
                {(terms as string[]).map((term: string) => {
                  const termGrades = (child.grades as any[]).filter((g: any) => g.term === term);
                  const avg = Math.round(termGrades.reduce((s: number, g: any) => s + g.score, 0) / termGrades.length);
                  return (
                    <div key={term} className="px-5 py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-[#C2593F] flex-shrink-0" />
                        <div>
                          <p className="text-[14px] font-medium text-[#1A2B49]">{term}</p>
                          <p className="text-[12px] text-[#6B7280]">
                            {termGrades.length} subjects · Class avg: {avg}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={avg >= 70 ? "success" : avg >= 50 ? "warning" : "danger"} size="sm">
                          {avg >= 70 ? "Distinction" : avg >= 50 ? "Credit" : "Needs Improvement"}
                        </Badge>
                        <button
                          disabled
                          title="PDF download requires full version"
                          className="inline-flex items-center gap-2 px-4 py-2 text-[12px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
                        >
                          Download PDF
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

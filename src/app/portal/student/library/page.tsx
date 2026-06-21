import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Badge from "@/components/ui/Badge";
import { BookOpen } from "lucide-react";

export default async function StudentLibraryPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "student") redirect("/login");

  const books = await prisma.libraryBook.findMany({ orderBy: { title: "asc" } }) as any[];
  const categories = Array.from(new Set(books.map((b: any) => b.category as string)));

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Library Catalogue</h2>
        <p className="text-[14px] text-[#6B7280]">{books.length} books · {books.filter((b: any) => b.available).length} available</p>
      </div>

      {categories.map((cat) => (
        <div key={cat}>
          <h3 className="text-[13px] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">{cat}</h3>
          <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr><th>Title</th><th>Author</th><th>ISBN</th><th>Status</th></tr>
              </thead>
              <tbody>
                {books.filter((b: any) => b.category === cat).map((book: any) => (
                  <tr key={book.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} className="text-[#9CA3AF]" />
                        <span className="font-medium text-[#1A2B49]">{book.title}</span>
                      </div>
                    </td>
                    <td className="text-[#6B7280]">{book.author}</td>
                    <td className="text-[#6B7280] font-mono text-[12px]">{book.isbn ?? "—"}</td>
                    <td>
                      <Badge variant={book.available ? "success" : "danger"} size="sm">
                        {book.available ? "Available" : "Checked Out"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

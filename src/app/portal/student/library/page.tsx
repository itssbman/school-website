import { demoLibraryBooks } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";
import { BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default function StudentLibraryPage() {
  const categories = Array.from(new Set(demoLibraryBooks.map((b) => b.category)));

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Library Catalogue</h2>
        <p className="text-[14px] text-[#6B7280]">
          {demoLibraryBooks.length} books · {demoLibraryBooks.filter((b) => b.available).length} available
        </p>
      </div>

      {categories.map((cat) => (
        <div key={cat}>
          <h3 className="text-[13px] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">{cat}</h3>
          <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr><th>Title</th><th>Author</th><th>Status</th></tr>
              </thead>
              <tbody>
                {demoLibraryBooks.filter((b) => b.category === cat).map((book) => (
                  <tr key={book.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} className="text-[#9CA3AF]" />
                        <span className="font-medium text-[#1A2B49]">{book.title}</span>
                      </div>
                    </td>
                    <td className="text-[#6B7280]">{book.author}</td>
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

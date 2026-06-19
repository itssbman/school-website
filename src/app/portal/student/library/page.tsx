import { demoLibraryBooks } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";
import { BookOpen, Search } from "lucide-react";

const CATEGORIES = Array.from(new Set(demoLibraryBooks.map((b) => b.category)));

export default function StudentLibraryPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Library</h2>
        <p className="text-[14px] text-[#6B7280]">Browse and reserve books from the school library</p>
      </div>

      {/* Search (static demo) */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          disabled
          placeholder="Search by title or author — available in full version"
          className="w-full pl-9 pr-4 py-2.5 text-[13px] border border-[#E5E3DF] bg-[#F9F8F7] text-[#9CA3AF] cursor-not-allowed"
        />
      </div>

      {/* Books grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoLibraryBooks.map((book) => (
          <div key={book.id} className="bg-white border border-[#E5E3DF] p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#F5F4F2] flex items-center justify-center flex-shrink-0">
                <BookOpen size={18} className="text-[#C2593F]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[#1A2B49] leading-snug line-clamp-2">{book.title}</p>
                <p className="text-[12px] text-[#6B7280] mt-1">{book.author}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E5E3DF]">
              <span className="text-[11px] text-[#6B7280] bg-[#F5F4F2] px-2 py-0.5">{book.category}</span>
              <Badge variant={book.available ? "success" : "danger"} size="sm">
                {book.available ? "Available" : "Borrowed"}
              </Badge>
            </div>
            <button
              disabled
              title="Available in full version"
              className="mt-3 w-full py-1.5 text-[12px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
            >
              {book.available ? "Reserve Book" : "Join Waitlist"}
            </button>
          </div>
        ))}
      </div>

      <p className="text-[12px] text-[#9CA3AF] text-center">
        Book reservations and borrowing available in the full version
      </p>
    </div>
  );
}

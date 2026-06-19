export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#FBFBFA] animate-pulse">
      {/* Alert banner placeholder */}
      <div className="h-9 bg-gray-200" />

      {/* Nav placeholder */}
      <div className="h-16 bg-white border-b border-gray-100 flex items-center px-6 lg:px-8">
        <div className="max-w-[1280px] w-full mx-auto flex items-center justify-between">
          <div className="h-5 w-40 bg-gray-100 rounded" />
          <div className="hidden md:flex items-center gap-7">
            {[80, 60, 80, 90, 50, 60, 70].map((w, i) => (
              <div key={i} className="h-3.5 bg-gray-100 rounded" style={{ width: w }} />
            ))}
          </div>
          <div className="h-8 w-28 bg-gray-100 rounded" />
        </div>
      </div>

      {/* Hero placeholder */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] min-h-[560px] gap-0">
          <div className="flex flex-col justify-center py-16 lg:pr-16 space-y-6">
            <div className="h-3 w-32 bg-gray-100 rounded" />
            <div className="space-y-3">
              <div className="h-10 w-full bg-gray-100 rounded" />
              <div className="h-10 w-4/5 bg-gray-100 rounded" />
              <div className="h-10 w-3/5 bg-gray-100 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-5/6 bg-gray-100 rounded" />
            </div>
            <div className="flex gap-3 pt-2">
              <div className="h-12 w-44 bg-gray-100 rounded" />
              <div className="h-12 w-32 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="hidden lg:block bg-gray-100 min-h-[560px]" />
        </div>
      </div>
    </div>
  );
}

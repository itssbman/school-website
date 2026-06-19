export default function ParentDashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="space-y-2">
          <div className="h-6 w-52 bg-gray-100 rounded" />
          <div className="h-4 w-36 bg-gray-100 rounded" />
        </div>
        {/* Child switcher placeholders */}
        <div className="flex gap-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-9 w-24 bg-gray-100 rounded" />
          ))}
        </div>
      </div>

      {/* Stat blocks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-gray-100 p-5 space-y-3">
            <div className="h-3.5 w-24 bg-gray-100 rounded" />
            <div className="h-8 w-16 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Grades chart placeholder */}
        <div className="bg-white border border-gray-100 p-6 space-y-4">
          <div className="h-4 w-28 bg-gray-100 rounded" />
          <div className="h-[200px] bg-gray-100 rounded" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="h-3.5 flex-1 bg-gray-100 rounded" />
                <div className="h-3.5 w-12 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Attendance + fee placeholder */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 p-6 space-y-4">
            <div className="h-4 w-28 bg-gray-100 rounded" />
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-3.5 bg-gray-100 rounded" />
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-100 p-6 space-y-3">
            <div className="h-4 w-24 bg-gray-100 rounded" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50">
                <div className="h-3.5 flex-1 bg-gray-100 rounded" />
                <div className="h-6 w-16 bg-gray-100 rounded" />
                <div className="h-6 w-20 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements strip */}
      <div className="bg-white border border-gray-100 p-6 space-y-3">
        <div className="h-4 w-36 bg-gray-100 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2 p-3 border border-gray-50 rounded">
              <div className="h-3.5 w-3/4 bg-gray-100 rounded" />
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-5/6 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

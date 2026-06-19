export default function TeacherDashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-gray-100 rounded" />
          <div className="h-4 w-32 bg-gray-100 rounded" />
        </div>
        <div className="h-9 w-36 bg-gray-100 rounded" />
      </div>

      {/* Tab row */}
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-9 w-28 bg-gray-100 rounded" />
        ))}
      </div>

      {/* Class roster table */}
      <div className="bg-white border border-gray-100 overflow-hidden">
        {/* Table header */}
        <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-100">
          {[120, 200, 120, 100, 80].map((w, i) => (
            <div key={i} className="h-3 bg-gray-100 rounded" style={{ width: w }} />
          ))}
        </div>
        {/* Table rows */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3.5 border-b border-gray-50">
            <div className="flex items-center gap-3" style={{ width: 120 }}>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0" />
              <div className="h-3.5 flex-1 bg-gray-100 rounded" />
            </div>
            <div className="h-3.5 bg-gray-100 rounded" style={{ width: 200 }} />
            <div className="h-6 w-16 bg-gray-100 rounded" />
            <div className="h-3.5 w-20 bg-gray-100 rounded" />
            <div className="h-8 w-20 bg-gray-100 rounded ml-auto" />
          </div>
        ))}
      </div>

      {/* Assignments + Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Assignments */}
        <div className="bg-white border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-28 bg-gray-100 rounded" />
            <div className="h-8 w-28 bg-gray-100 rounded" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-50">
              <div className="flex-1 space-y-1.5">
                <div className="h-3.5 w-3/4 bg-gray-100 rounded" />
                <div className="h-3 w-1/2 bg-gray-100 rounded" />
              </div>
              <div className="h-6 w-16 bg-gray-100 rounded flex-shrink-0" />
            </div>
          ))}
        </div>

        {/* Announcements */}
        <div className="bg-white border border-gray-100 p-6 space-y-3">
          <div className="h-4 w-32 bg-gray-100 rounded" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="py-2 border-b border-gray-50 space-y-1.5">
              <div className="h-3.5 w-3/4 bg-gray-100 rounded" />
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-4/5 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

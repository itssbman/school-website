export default function StudentDashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-gray-100 rounded" />
          <div className="h-4 w-40 bg-gray-100 rounded" />
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-gray-100 px-4 py-2 text-center space-y-1">
            <div className="h-7 w-8 bg-gray-100 rounded mx-auto" />
            <div className="h-3 w-14 bg-gray-100 rounded" />
          </div>
          <div className="bg-white border border-gray-100 px-4 py-2 text-center space-y-1">
            <div className="h-7 w-8 bg-gray-100 rounded mx-auto" />
            <div className="h-3 w-16 bg-gray-100 rounded" />
          </div>
        </div>
      </div>

      {/* Timetable + Assignment dropzone */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Timetable */}
        <div className="bg-white border border-gray-100 p-6 space-y-4">
          <div className="h-4 w-32 bg-gray-100 rounded" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 border-l-2 border-gray-100">
                <div className="h-3.5 w-20 bg-gray-100 rounded flex-shrink-0" />
                <div className="h-3.5 flex-1 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Assignment submission */}
        <div className="bg-white border border-gray-100 p-6 space-y-4">
          <div className="h-4 w-36 bg-gray-100 rounded" />
          <div className="h-10 w-full bg-gray-100 rounded" />
          <div className="h-[120px] border-2 border-dashed border-gray-100 rounded flex items-center justify-center">
            <div className="h-4 w-40 bg-gray-100 rounded" />
          </div>
          <div className="h-10 w-full bg-gray-100 rounded" />
        </div>
      </div>

      {/* Grades chart */}
      <div className="bg-white border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 bg-gray-100 rounded" />
          <div className="h-8 w-24 bg-gray-100 rounded" />
        </div>
        <div className="h-[160px] bg-gray-100 rounded" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="h-3.5 w-24 bg-gray-100 rounded" />
              <div className="h-3.5 w-12 bg-gray-100 rounded" />
              <div className="h-3.5 w-8 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Events + Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[1, 2].map((col) => (
          <div key={col} className="bg-white border border-gray-100 p-6 space-y-3">
            <div className="h-4 w-32 bg-gray-100 rounded" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50">
                <div className="w-10 h-10 bg-gray-100 flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 w-3/4 bg-gray-100 rounded" />
                  <div className="h-3 w-1/2 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

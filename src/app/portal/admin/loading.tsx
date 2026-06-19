export default function AdminDashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="space-y-2">
          <div className="h-6 w-40 bg-gray-100 rounded" />
          <div className="h-4 w-56 bg-gray-100 rounded" />
        </div>
        <div className="h-9 w-32 bg-gray-100 rounded" />
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-gray-100 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 bg-gray-100 rounded" />
              <div className="h-8 w-8 bg-gray-100 rounded" />
            </div>
            <div className="h-8 w-20 bg-gray-100 rounded" />
            <div className="h-3 w-28 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance trend chart */}
        <div className="bg-white border border-gray-100 p-6 space-y-4">
          <div className="h-4 w-40 bg-gray-100 rounded" />
          <div className="h-[200px] bg-gray-100 rounded" />
        </div>

        {/* Fee collection chart */}
        <div className="bg-white border border-gray-100 p-6 space-y-4">
          <div className="h-4 w-36 bg-gray-100 rounded" />
          <div className="h-[200px] bg-gray-100 rounded" />
        </div>
      </div>

      {/* Applications table */}
      <div className="bg-white border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="h-4 w-36 bg-gray-100 rounded" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-6 px-6 py-4 border-b border-gray-50">
            <div className="h-3.5 w-36 bg-gray-100 rounded" />
            <div className="h-3.5 w-32 bg-gray-100 rounded" />
            <div className="h-3.5 w-24 bg-gray-100 rounded" />
            <div className="h-6 w-20 bg-gray-100 rounded ml-auto" />
            <div className="h-6 w-20 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      {/* Recent users */}
      <div className="bg-white border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="h-4 w-28 bg-gray-100 rounded" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-3.5 border-b border-gray-50">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 w-40 bg-gray-100 rounded" />
              <div className="h-3 w-48 bg-gray-100 rounded" />
            </div>
            <div className="h-6 w-16 bg-gray-100 rounded" />
            <div className="h-6 w-16 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

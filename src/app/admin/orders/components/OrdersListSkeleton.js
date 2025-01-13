export default function OrdersListSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
                <div className="h-6 w-24 bg-gray-200 rounded-full" />
              </div>

              <div className="space-y-4">
                {[1, 2].map((j) => (
                  <div key={j} className="flex gap-4">
                    <div className="h-20 w-20 bg-gray-200 rounded-lg flex-shrink-0" />
                    <div className="flex-1">
                      <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
                      <div className="h-4 w-1/4 bg-gray-200 rounded mb-2" />
                      <div className="h-4 w-1/3 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t md:border-l md:border-t-0 pt-4 md:pt-0 md:pl-6">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="space-y-1">
                  {[1, 2, 3, 4].map((k) => (
                    <div key={k} className="h-4 w-48 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-6 w-32 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

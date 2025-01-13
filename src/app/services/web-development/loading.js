export default function WebDevelopmentLoading() {
  return (
    <div className="container mx-auto px-4 py-24 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2">
          <div className="h-12 bg-gray-200 rounded-lg mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded mb-6 w-4/6"></div>
          
          <div className="flex space-x-4">
            <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 h-[400px] bg-gray-200 rounded-2xl"></div>
      </div>

      {/* Features Section Skeleton */}
      <section className="mb-16">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
              <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2 w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section className="mb-16">
        <div className="h-8 bg-gray-200 rounded w-72 mx-auto mb-8"></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
              <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2 w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Services Skeleton */}
      <section className="py-16">
        <div className="h-10 bg-gray-200 rounded w-80 mx-auto mb-12"></div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-cool/10 p-6 rounded-2xl">
              <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-5/6"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded w-2/3"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack Skeleton */}
      <section className="bg-cool/10 p-12 rounded-2xl">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-1 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Skeleton */}
      <section className="mt-16 text-center">
        <div className="h-10 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
        <div className="h-12 bg-gray-200 rounded-full w-48 mx-auto"></div>
      </section>
    </div>
  );
}

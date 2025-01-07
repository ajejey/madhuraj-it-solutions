export default function ComputerSalesLoading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="h-12 bg-gray-300 mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-300 mb-2 w-full"></div>
          <div className="h-4 bg-gray-300 mb-2 w-5/6"></div>
          <div className="h-4 bg-gray-300 mb-6 w-4/5"></div>
          <div className="flex space-x-4">
            <div className="h-10 bg-gray-300 w-32 rounded-full"></div>
            <div className="h-10 bg-gray-300 w-32 rounded-full"></div>
          </div>
        </div>
        <div className="md:w-1/2 h-[400px] bg-gray-300"></div>
      </div>
    </div>
  );
}

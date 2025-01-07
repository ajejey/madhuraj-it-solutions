import { Cpu,  Database, Microchip, Monitor } from 'lucide-react';

export default function HardwareSalesPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Hero Section */}
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Quality Hardware Solutions
          </h1>
          <p className="text-gray-700 mb-6">
            Discover top-tier hardware products that power your business and personal computing needs. We offer a comprehensive range of high-performance components at competitive prices.
          </p>
          
          <div className="flex space-x-4">
            <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition">
              Browse Inventory
            </button>
            <button className="border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary-light transition">
              Custom Quotes
            </button>
          </div>
        </div>
        
        {/* Placeholder Image */}
        <div className="md:w-1/2 relative h-[400px]">
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <Cpu className="w-24 h-24 text-gray-500" />
            <span className="ml-2 text-gray-500">Hardware Sales Image Placeholder</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Hardware Offerings</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Processors',
              description: 'Latest generation CPUs from leading manufacturers.',
              icon: <Cpu className="w-12 h-12 text-primary" />
            },
            {
              title: 'Components',
              description: 'High-quality motherboards, RAM, and storage solutions.',
              icon: <Microchip className="w-12 h-12 text-primary" />
            },
            {
              title: 'Server Hardware',
              description: 'Enterprise-grade server components and storage systems.',
              icon: <Database className="w-12 h-12 text-primary" />
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

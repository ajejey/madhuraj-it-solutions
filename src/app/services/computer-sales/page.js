import { 
  Computer, 
  Check, 
  Shield, 
  TruckIcon,
  Package,
  Globe,
  Cpu,
  Monitor,
  Laptop,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ComputerSalesPage() {
  const features = [
    {
      title: 'Custom Configurations',
      description: 'Tailored computers for your specific needs',
      icon: <Settings className="w-12 h-12 text-primary" />
    },
    {
      title: 'High Performance',
      description: 'Cutting-edge processors and graphics',
      icon: <Cpu className="w-12 h-12 text-primary" />
    },
    {
      title: 'Comprehensive Support',
      description: 'Warranty and technical assistance',
      icon: <Shield className="w-12 h-12 text-primary" />
    }
  ];

  const computerCategories = [
    {
      title: 'Desktop Computers',
      description: 'Powerful workstations for professionals',
      icon: <Computer className="w-16 h-16 text-primary" />
    },
    {
      title: 'Laptops',
      description: 'Portable computing solutions',
      icon: <Laptop className="w-16 h-16 text-primary" />
    },
    {
      title: 'Monitors',
      description: 'High-resolution display technologies',
      icon: <Monitor className="w-16 h-16 text-primary" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Premium Computer Solutions
          </h1>
          <p className="text-gray-700 mb-6">
            Discover top-tier computing solutions tailored to your needs. From high-performance desktops to sleek laptops, we offer cutting-edge technology with personalized configurations and expert support.
          </p>
          
          <div className="flex space-x-4">
            <Link 
              href="/services/computer-sales/consultation"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
            >
              Configure PC
            </Link>
            <Link 
              href="/contact"
              className="border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary-light transition"
            >
              Contact Experts
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 relative h-[400px] rounded-2xl overflow-hidden">
          <iframe
            src="https://lottie.host/embed/bba35d10-3690-4366-b644-fb7eb574d773/2Bq7j8eq07.lottie"
            className="absolute inset-0 w-full h-full border-none"
            title="Professional Computer services"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Computer Solutions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Computer Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Computer Categories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {computerCategories.map((category, index) => (
            <Link 
              key={index} 
              href={`/services/computer-sales/${category.title.toLowerCase().replace(' ', '-')}`}
              className="group"
            >
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all text-center">
                <div className="flex justify-center mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Detailed Computer Categories Descriptions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Comprehensive Computer Solutions
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Computer className="w-8 h-8" /> Desktop Computers
              </h3>
              <p className="text-gray-700 mb-4">
                Powerful desktop workstations designed for professionals, gamers, and creative individuals. From compact form factors to high-performance gaming rigs, we offer customizable solutions.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Custom Configuration
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  High-Performance Components
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Multiple Use Cases
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Laptop className="w-8 h-8" /> Laptops
              </h3>
              <p className="text-gray-700 mb-4">
                Sleek and powerful laptops for professionals, students, and mobile workers. Range from ultralight notebooks to high-performance mobile workstations with cutting-edge specifications.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Portable Design
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Long Battery Life
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  High-Resolution Displays
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Monitor className="w-8 h-8" /> Monitors
              </h3>
              <p className="text-gray-700 mb-4">
                Premium display solutions for professionals, designers, and gamers. From color-accurate panels to high-refresh-rate gaming monitors, we provide displays that enhance your visual experience.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  4K & Ultra-Wide Options
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Color Calibration
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Multiple Connectivity
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery and Support */}
      <section className="bg-cool/10 p-12 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-3">
              <Shield className="w-10 h-10" /> Comprehensive Support
            </h2>
            <p className="text-gray-700 mb-4">
              We provide end-to-end computer solutions with reliable support and expert consultation. Our commitment extends beyond sales to ensure you get the most out of your technology investment.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <TruckIcon className="w-5 h-5 text-primary" />
                Nationwide Delivery
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Remote Technical Support
              </li>
              <li className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Flexible Warranty Options
              </li>
            </ul>
            <Link 
              href="/contact"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
            >
              Contact Support
            </Link>
          </div>
          <div className="md:w-1/2 hidden md:block">
            <Image 
              src="/images/services/computer-sales-support.jpg" 
              alt="Computer Sales Support" 
              width={500} 
              height={400} 
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

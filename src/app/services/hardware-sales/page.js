import { 
  Cpu, 
  Wrench, 
  Shield, 
  Package, 
  Truck, 
  Settings, 
  ShieldCheck,
  Check
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HardwareSalesPage() {
  const features = [
    {
      title: 'Quality Components',
      description: 'Premium hardware from trusted manufacturers',
      icon: <Cpu className="w-12 h-12 text-primary" />
    },
    {
      title: 'Expert Consultation',
      description: 'Personalized advice for your hardware needs',
      icon: <Wrench className="w-12 h-12 text-primary" />
    },
    {
      title: 'Comprehensive Support',
      description: 'End-to-end hardware solutions and maintenance',
      icon: <Shield className="w-12 h-12 text-primary" />
    }
  ];

  const hardwareCategories = [
    {
      title: 'Processors',
      description: 'High-performance CPUs for every need',
      icon: <Cpu className="w-16 h-16 text-primary" />
    },
    {
      title: 'Motherboards',
      description: 'Reliable and advanced system boards',
      icon: <Settings className="w-16 h-16 text-primary" />
    },
    {
      title: 'Custom Configurations',
      description: 'Tailored hardware setups for unique requirements',
      icon: <Package className="w-16 h-16 text-primary" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Professional Hardware Solutions
          </h1>
          <p className="text-gray-700 mb-6">
            Discover top-quality computer hardware and components. From processors to motherboards, we provide reliable, high-performance solutions for businesses and individuals.
          </p>
          
          <div className="flex space-x-4">
            <Link 
              href="/products"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
            >
              View Inventory
            </Link>
            <Link 
              href="/contact"
              className="border border-primary text-primary px-6 py-2 rounded-full hover:text-white hover:bg-primary-light transition"
            >
              Custom Configurations
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 relative h-[400px] rounded-2xl overflow-hidden">
        {/* <iframe src="https://lottie.host/embed/56686885-dd07-44a0-8749-5714884f96c4/nqIw4szwFa.lottie"></iframe> */}
          <iframe
            src="https://lottie.host/embed/56686885-dd07-44a0-8749-5714884f96c4/nqIw4szwFa.lottie"
            className="absolute inset-0 w-full h-full border-none"
            title="Hardware Components Animation"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Hardware</h2>
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

      {/* Hardware Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Hardware Inventory</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {hardwareCategories.map((category, index) => (
            <Link 
              key={index} 
              href={`/services/hardware-sales/${category.title.toLowerCase().replace(' ', '-')}`}
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

      {/* Detailed Hardware Descriptions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Comprehensive Hardware Solutions
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Cpu className="w-8 h-8" /> Processors
              </h3>
              <p className="text-gray-700 mb-4">
                We offer a wide range of processors from leading manufacturers like Intel and AMD. From entry-level CPUs for basic computing to high-performance processors for gaming and professional workstations, we have solutions for every need.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Latest generation processors
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Competitive pricing
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Performance benchmarking
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Settings className="w-8 h-8" /> Motherboards
              </h3>
              <p className="text-gray-700 mb-4">
                Discover a comprehensive selection of motherboards compatible with various processor generations. We stock boards from top brands like ASUS, MSI, and Gigabyte, ensuring reliability, performance, and future-proofing for your systems.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Multiple form factors
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Advanced connectivity options
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Robust build quality
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Package className="w-8 h-8" /> Custom Configurations
              </h3>
              <p className="text-gray-700 mb-4">
                Need a specialized hardware setup? Our expert team provides tailored hardware configurations. Whether you&apos;re building a high-performance gaming rig, a professional workstation, or a compact system, we design solutions that precisely match your requirements.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Personalized consultations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Performance optimization
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Compatibility guaranteed
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery and Support */}
      <section className="bg-cool/10 p-12 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-3">
              <ShieldCheck className="w-10 h-10" /> Comprehensive Support
            </h2>
            <p className="text-gray-700 mb-4">
              We provide end-to-end hardware solutions with reliable delivery and exceptional customer support.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                Fast Nationwide Shipping
              </li>
              <li className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Secure Packaging
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                30-Day Warranty
              </li>
            </ul>
            <Link 
              href="/contact"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
            >
              Contact Support
            </Link>
          </div>
          {/* <div className="md:w-1/2 hidden md:block">
            <Image 
              src="/images/services/hardware-support.jpg" 
              alt="Hardware Support" 
              width={500} 
              height={400} 
              className="rounded-2xl shadow-lg"
            />
          </div> */}
        </div>
      </section>
    </div>
  );
}

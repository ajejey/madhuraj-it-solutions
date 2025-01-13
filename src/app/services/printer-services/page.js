import { Check, HardDrive, Package, Printer, Settings, Shield, ShieldCheck, TruckIcon, WrenchIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PrinterServicesPage() {
  const features = [
    {
      title: 'Comprehensive Repair',
      description: 'Expert diagnosis and repair for all printer models',
      icon: <WrenchIcon className="w-12 h-12 text-primary" />
    },
    {
      title: 'Maintenance Plans',
      description: 'Proactive servicing to prevent unexpected breakdowns',
      icon: <Shield className="w-12 h-12 text-primary" />
    },
    {
      title: 'Supply Management',
      description: 'Efficient ink and toner supply solutions',
      icon: <Printer className="w-12 h-12 text-primary" />
    }
  ];

  const printerServices = [
    {
      title: 'Printer Repair',
      description: 'Comprehensive diagnostic and repair services',
      icon: <HardDrive className="w-16 h-16 text-primary" />
    },
    {
      title: 'Maintenance Contracts',
      description: 'Scheduled servicing for optimal printer performance',
      icon: <Settings className="w-16 h-16 text-primary" />
    },
    {
      title: 'Supply Procurement',
      description: 'Reliable ink, toner, and printer supply management',
      icon: <Package className="w-16 h-16 text-primary" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Professional Printer Services
          </h1>
          <p className="text-gray-700 mb-6">
            Maximize your printing efficiency with our comprehensive printer services. From repairs and maintenance to supply management, we provide end-to-end solutions for businesses and individuals.
          </p>
          
          <div className="flex space-x-4">
            <Link 
              href="/services/printer-services/consultation"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
            >
              Schedule Service
            </Link>
            <Link 
              href="/contact"
              className="border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary-light transition"
            >
              Contact Support
            </Link>
          </div>
        </div>
        {/* <iframe src="https://lottie.host/embed/0399a75c-fdcc-437c-bec9-da537f81218c/fKTDOShosd.lottie"></iframe> */}
        <div className="w-full md:w-1/2 relative h-[400px] rounded-2xl overflow-hidden">
          <iframe
            src="https://lottie.host/embed/0399a75c-fdcc-437c-bec9-da537f81218c/fKTDOShosd.lottie"
            className="absolute inset-0 w-full h-full border-none"
            title="Printer Services Animation"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Printer Services</h2>
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

      {/* Printer Services Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Printer Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {printerServices.map((service, index) => (
            <Link 
              key={index} 
              href={`/services/printer-services/${service.title.toLowerCase().replace(' ', '-')}`}
              className="group"
            >
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all text-center">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Detailed Printer Services Descriptions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Comprehensive Printer Solutions
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <HardDrive className="w-8 h-8" /> Printer Repair
              </h3>
              <p className="text-gray-700 mb-4">
                Our expert technicians provide comprehensive printer repair services for all major brands and models. We diagnose issues quickly and efficiently, minimizing downtime and ensuring optimal printer performance.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  All Major Printer Brands
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Quick Turnaround
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Warranty on Repairs
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Settings className="w-8 h-8" /> Maintenance Contracts
              </h3>
              <p className="text-gray-700 mb-4">
                Prevent unexpected breakdowns with our proactive maintenance contracts. We offer scheduled servicing, regular check-ups, and preventive maintenance to keep your printers running smoothly.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Scheduled Servicing
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Preventive Maintenance
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Priority Support
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Package className="w-8 h-8" /> Supply Procurement
              </h3>
              <p className="text-gray-700 mb-4">
                Streamline your printer supply management with our comprehensive procurement services. We provide timely ink, toner, and replacement part supplies to ensure uninterrupted printing.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Wide Range of Supplies
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Competitive Pricing
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Timely Delivery
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
              <ShieldCheck className="w-10 h-10" /> Comprehensive Support
            </h2>
            <p className="text-gray-700 mb-4">
              We provide end-to-end printer services with reliable support and exceptional customer care. Our commitment extends beyond repairs to ensure your printing infrastructure remains efficient.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <TruckIcon className="w-5 h-5 text-primary" />
                Nationwide Service Coverage
              </li>
              <li className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-primary" />
                On-site and Remote Support
              </li>
              <li className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Flexible Service Packages
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
              src="/images/services/printer-support.jpg" 
              alt="Printer Support" 
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

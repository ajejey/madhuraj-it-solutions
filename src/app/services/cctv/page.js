import { Camera, Check, CloudDownload, Eye, Globe, Lock, Monitor, Package, Shield, TruckIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CCTVServicesPage() {
  const features = [
    {
      title: 'High-Resolution Imaging',
      description: 'Crystal clear 4K and HD camera options',
      icon: <Camera className="w-12 h-12 text-primary" />
    },
    {
      title: 'Smart Monitoring',
      description: 'AI-powered motion detection and alerts',
      icon: <Eye className="w-12 h-12 text-primary" />
    },
    {
      title: 'Secure Storage',
      description: 'Cloud and local storage solutions',
      icon: <CloudDownload className="w-12 h-12 text-primary" />
    }
  ];

  const cctvServices = [
    {
      title: 'Installation',
      description: 'Professional CCTV system setup',
      icon: <Lock className="w-16 h-16 text-primary" />
    },
    {
      title: 'Maintenance',
      description: 'Regular system checks and updates',
      icon: <Shield className="w-16 h-16 text-primary" />
    },
    {
      title: 'Monitoring',
      description: '24/7 remote surveillance',
      icon: <Monitor className="w-16 h-16 text-primary" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Advanced CCTV Solutions
          </h1>
          <p className="text-gray-700 mb-6">
            Elevate your security with our cutting-edge CCTV systems. From high-resolution cameras to intelligent monitoring, we provide comprehensive surveillance solutions tailored to your specific needs.
          </p>
          
          <div className="flex space-x-4">
            <Link 
              href="/contact"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
            >
              Security Assessment
            </Link>
            {/* <Link 
              href="/contact"
              className="border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary-light transition"
            >
              Contact Experts
            </Link> */}
          </div>
        </div>

        {/* <iframe src="https://lottie.host/embed/8c5adadc-c719-4fcc-94a9-d7ca8c60414f/7kHYTToewm.lottie"></iframe> */}
        
        <div className="w-full md:w-1/2 relative h-[400px] rounded-2xl overflow-hidden">
          <iframe
            src="https://lottie.host/embed/8c5adadc-c719-4fcc-94a9-d7ca8c60414f/7kHYTToewm.lottie"
            className="absolute inset-0 w-full h-full border-none"
            title="CCTV Solutions Animation"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our CCTV Services</h2>
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

      {/* CCTV Services Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our CCTV Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cctvServices.map((service, index) => (
            <Link 
              key={index} 
              href={`/services/cctv/${service.title.toLowerCase().replace(' ', '-')}`}
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

      {/* Detailed CCTV Services Descriptions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Comprehensive CCTV Solutions
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Lock className="w-8 h-8" /> Professional Installation
              </h3>
              <p className="text-gray-700 mb-4">
                Expert installation of CCTV systems tailored to your specific security requirements. We assess your property, recommend optimal camera placements, and ensure seamless integration.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Site Security Assessment
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Custom Camera Placement
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Professional Setup
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Shield className="w-8 h-8" /> Ongoing Maintenance
              </h3>
              <p className="text-gray-700 mb-4">
                Comprehensive maintenance plans to keep your CCTV system operating at peak performance. Regular check-ups, firmware updates, and proactive troubleshooting.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Regular System Checks
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Firmware Updates
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Quick Repairs
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Monitor className="w-8 h-8" /> Remote Monitoring
              </h3>
              <p className="text-gray-700 mb-4">
                24/7 remote surveillance with AI-powered motion detection, instant alerts, and cloud storage. Access your cameras from anywhere, anytime.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Mobile App Access
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  AI Motion Detection
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Cloud Storage
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
              <Camera className="w-10 h-10" /> Comprehensive Support
            </h2>
            <p className="text-gray-700 mb-4">
              We provide end-to-end CCTV solutions with reliable support and expert consultation. Our commitment extends beyond installation to ensure your surveillance infrastructure remains robust and efficient.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <TruckIcon className="w-5 h-5 text-primary" />
                Nationwide Installation
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Remote Support
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
          {/* <div className="md:w-1/2 hidden md:block">
            <Image 
              src="/images/services/cctv-support.jpg" 
              alt="CCTV Support" 
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

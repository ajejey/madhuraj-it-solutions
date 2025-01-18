import { 
  Network, 
  Shield, 
  Wifi, 
  Server, 
  Check, 
  Globe, 
  Lock, 
  ShieldCheck,
  Truck,
  Package
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function NetworkSolutionsPage() {
  const features = [
    {
      title: 'Comprehensive Networking',
      description: 'End-to-end network design and implementation',
      icon: <Network className="w-12 h-12 text-primary" />
    },
    {
      title: 'Security First',
      description: 'Advanced network protection and monitoring',
      icon: <Shield className="w-12 h-12 text-primary" />
    },
    {
      title: 'Scalable Solutions',
      description: 'Flexible networks that grow with your business',
      icon: <Wifi className="w-12 h-12 text-primary" />
    }
  ];

  const networkCategories = [
    {
      title: 'Network Design',
      description: 'Tailored network architectures for optimal performance',
      icon: <Network className="w-16 h-16 text-primary" />
    },
    {
      title: 'Infrastructure Setup',
      description: 'Robust and reliable network infrastructure solutions',
      icon: <Server className="w-16 h-16 text-primary" />
    },
    {
      title: 'Security Services',
      description: 'Comprehensive network security and threat protection',
      icon: <Lock className="w-16 h-16 text-primary" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Advanced Network Solutions
          </h1>
          <p className="text-gray-700 mb-6">
            Transform your business connectivity with our cutting-edge network solutions. From design to implementation, we provide comprehensive networking services that ensure performance, security, and scalability.
          </p>
          
          <div className="flex space-x-4">
            <Link 
              href="/contact"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
            >
              Request Consultation
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 relative h-[400px] rounded-2xl overflow-hidden">
          <iframe
            src="https://lottie.host/embed/5badbac9-3a17-4af0-91de-5359f8a13d43/Lmpk0fBKD2.lottie"
            className="absolute inset-0 w-full h-full border-none"
            title="Network Solutions Animation"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Network Solutions</h2>
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

      {/* Network Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Network Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {networkCategories.map((category, index) => (
            <Link 
              key={index} 
              href={`/contact`}
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

      {/* Detailed Network Descriptions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Comprehensive Network Solutions
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Network className="w-8 h-8" /> Network Design
              </h3>
              <p className="text-gray-700 mb-4">
                Our expert network architects create customized network designs that align perfectly with your business objectives. We analyze your current infrastructure, future growth potential, and specific requirements to develop optimal networking strategies.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Customized Network Architectures
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Performance Optimization
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Scalability Planning
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Server className="w-8 h-8" /> Infrastructure Setup
              </h3>
              <p className="text-gray-700 mb-4">
                We provide end-to-end network infrastructure solutions, including hardware selection, configuration, and implementation. Our team ensures seamless integration of switches, routers, firewalls, and wireless access points.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Enterprise-Grade Hardware
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Comprehensive Configuration
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Minimal Downtime
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Lock className="w-8 h-8" /> Security Services
              </h3>
              <p className="text-gray-700 mb-4">
                Protect your network with our advanced security solutions. We implement multi-layered security strategies, including intrusion detection, firewall configuration, VPN setup, and continuous monitoring.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Advanced Threat Protection
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Compliance Management
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  24/7 Security Monitoring
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
              We provide end-to-end network solutions with reliable support and exceptional service. Our commitment extends beyond installation to ensure your network remains robust and efficient.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                Nationwide Service Coverage
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Remote and On-site Support
              </li>
              <li className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Comprehensive Service Packages
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
              src="/images/services/network-support.jpg" 
              alt="Network Support" 
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

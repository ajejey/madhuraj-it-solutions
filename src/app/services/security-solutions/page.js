import { 
  ShieldCheck, 
  Camera, 
  Lock, 
  Check, 
  Shield, 
  Wifi, 
  TruckIcon,
  Package,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SecuritySolutionsPage() {
  const features = [
    {
      title: 'Comprehensive Protection',
      description: 'Advanced security systems for homes and businesses',
      icon: <ShieldCheck className="w-12 h-12 text-primary" />
    },
    {
      title: 'Smart Monitoring',
      description: 'Real-time surveillance and instant alerts',
      icon: <Camera className="w-12 h-12 text-primary" />
    },
    {
      title: 'Access Control',
      description: 'Secure entry management and authentication',
      icon: <Lock className="w-12 h-12 text-primary" />
    }
  ];

  const securityServices = [
    {
      title: 'CCTV Systems',
      description: 'Advanced video surveillance solutions',
      icon: <Camera className="w-16 h-16 text-primary" />
    },
    {
      title: 'Access Control',
      description: 'Intelligent entry and security management',
      icon: <Lock className="w-16 h-16 text-primary" />
    },
    {
      title: 'Alarm Systems',
      description: 'Comprehensive intrusion detection',
      icon: <Shield className="w-16 h-16 text-primary" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Advanced Security Solutions
          </h1>
          <p className="text-gray-700 mb-6">
            Protect what matters most with our cutting-edge security solutions. From CCTV surveillance to smart access control, we provide comprehensive security systems tailored to your specific needs.
          </p>
          
          <div className="flex space-x-4">
            <Link 
              href="/services/security-solutions/consultation"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
            >
              Security Assessment
            </Link>
            <Link 
              href="/contact"
              className="border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary-light transition"
            >
              Contact Sales
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 relative h-[400px] rounded-2xl overflow-hidden">
          <iframe
            src="https://lottie.host/embed/ae4ef284-734f-4ab4-be50-0fe41ba6e516/evDjdD6eWl.lottie"
            className="absolute inset-0 w-full h-full border-none"
            title="Security Solutions Animation"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Security Solutions</h2>
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

      {/* Security Services Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Security Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {securityServices.map((service, index) => (
            <Link 
              key={index} 
              href={`/services/security-solutions/${service.title.toLowerCase().replace(' ', '-')}`}
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

      {/* Detailed Security Services Descriptions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Comprehensive Security Solutions
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Camera className="w-8 h-8" /> CCTV Systems
              </h3>
              <p className="text-gray-700 mb-4">
                Deploy state-of-the-art CCTV surveillance systems with high-resolution cameras, night vision, and remote monitoring capabilities. Our solutions provide comprehensive visual security for homes and businesses.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  HD & 4K Camera Options
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Cloud Storage
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Mobile App Monitoring
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Lock className="w-8 h-8" /> Access Control
              </h3>
              <p className="text-gray-700 mb-4">
                Implement intelligent access control systems that provide secure entry management. Our solutions include biometric authentication, keycard systems, and comprehensive user management.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Biometric Authentication
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Real-time Monitoring
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Customizable Permissions
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Shield className="w-8 h-8" /> Alarm Systems
              </h3>
              <p className="text-gray-700 mb-4">
                Advanced alarm systems with intrusion detection, emergency response integration, and smart notifications. Protect your property with cutting-edge security technology.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  24/7 Monitoring
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Quick Emergency Response
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Smart Notifications
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
              We provide end-to-end security solutions with reliable support and expert consultation. Our commitment extends beyond installation to ensure your security infrastructure remains robust and efficient.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <TruckIcon className="w-5 h-5 text-primary" />
                Nationwide Installation
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Remote Monitoring
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
              src="/images/services/security-support.jpg" 
              alt="Security Support" 
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

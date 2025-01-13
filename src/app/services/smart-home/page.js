import { 
  Home, 
  Smartphone, 
  Wifi, 
  Check, 
  Shield, 
  TruckIcon,
  Package,
  Globe,
  Zap,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SmartHomeServicesPage() {
  const features = [
    {
      title: 'Seamless Automation',
      description: 'Intelligent home control at your fingertips',
      icon: <Zap className="w-12 h-12 text-primary" />
    },
    {
      title: 'Mobile Integration',
      description: 'Control your home from anywhere',
      icon: <Smartphone className="w-12 h-12 text-primary" />
    },
    {
      title: 'Enhanced Security',
      description: 'Smart security systems and alerts',
      icon: <Shield className="w-12 h-12 text-primary" />
    }
  ];

  const smartHomeServices = [
    {
      title: 'Home Automation',
      description: 'Intelligent device integration and control',
      icon: <Home className="w-16 h-16 text-primary" />
    },
    {
      title: 'Network Setup',
      description: 'Robust WiFi and connectivity solutions',
      icon: <Wifi className="w-16 h-16 text-primary" />
    },
    {
      title: 'Security Systems',
      description: 'Advanced smart home protection',
      icon: <Lock className="w-16 h-16 text-primary" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Intelligent Smart Home Solutions
          </h1>
          <p className="text-gray-700 mb-6">
            Transform your living space with cutting-edge smart home technology. From automated lighting and climate control to integrated security systems, we bring the future of home living to your doorstep.
          </p>
          
          <div className="flex space-x-4">
            <Link 
              href="/services/smart-home/consultation"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
            >
              Home Assessment
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
            src="https://lottie.host/embed/dd4c493f-ef23-47a2-aadc-b4fb7ed88c53/Yd693iP4UQ.lottie"
            className="absolute inset-0 w-full h-full border-none"
            title="Smart Home Solutions Animation"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Smart Home Services</h2>
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

      {/* Smart Home Services Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Smart Home Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {smartHomeServices.map((service, index) => (
            <Link 
              key={index} 
              href={`/services/smart-home/${service.title.toLowerCase().replace(' ', '-')}`}
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

      {/* Detailed Smart Home Services Descriptions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Comprehensive Smart Home Solutions
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Home className="w-8 h-8" /> Home Automation
              </h3>
              <p className="text-gray-700 mb-4">
                Create a seamlessly integrated smart home environment. Control lighting, temperature, entertainment systems, and more with intuitive automation and voice commands.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Voice-Controlled Devices
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Scene Scheduling
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Energy Optimization
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Wifi className="w-8 h-8" /> Network Setup
              </h3>
              <p className="text-gray-700 mb-4">
                Design and implement robust home network infrastructure to support all your smart devices. Ensure seamless connectivity, strong security, and optimal performance.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Mesh WiFi Systems
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Secure Network Configuration
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Device Management
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3">
                <Lock className="w-8 h-8" /> Security Systems
              </h3>
              <p className="text-gray-700 mb-4">
                Advanced smart security solutions integrating cameras, sensors, smart locks, and real-time monitoring to protect your home and provide peace of mind.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Smart Lock Integration
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Motion Sensors
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Mobile Alerts
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
              <Zap className="w-10 h-10" /> Comprehensive Support
            </h2>
            <p className="text-gray-700 mb-4">
              We provide end-to-end smart home solutions with reliable support and expert consultation. Our commitment extends beyond installation to ensure your smart home ecosystem remains cutting-edge and efficient.
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
          <div className="md:w-1/2 hidden md:block">
            <Image 
              src="/images/services/smart-home-support.jpg" 
              alt="Smart Home Support" 
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

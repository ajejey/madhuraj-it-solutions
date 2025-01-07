import { Camera, Home, Monitor, Shield, Printer, Server, HardDrive, Network, Database, Receipt } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'CCTV Surveillance',
    icon: Camera,
    description: 'Advanced security camera systems for homes and businesses with professional installation.',
    features: ['HD Camera Systems', 'Remote Monitoring', '24/7 Recording', 'Mobile App Access'],
    href: '/services/cctv'
  },
  {
    title: 'Smart Home Automation',
    icon: Home,
    description: 'Transform your home with cutting-edge automation solutions for comfort and security.',
    features: ['Door Security', 'Smart Lighting', 'Temperature Control', 'Remote Access'],
    href: '/services/smart-home'
  },
  {
    title: 'Computer Services',
    icon: Monitor,
    description: 'Comprehensive computer repair and maintenance services for all your tech needs.',
    features: ['Hardware Repair', 'Software Installation', 'Performance Optimization', 'Data Backup'],
    href: '/services/computer-sales'
  },
  {
    title: 'Security Solutions',
    icon: Shield,
    description: 'Complete security solutions including door systems and surveillance.',
    features: ['Access Control', 'Door Security', 'Biometric Systems', 'Security Consulting'],
    href: '/services/security-solutions'
  },
  {
    title: 'Printer Services',
    icon: Printer,
    description: 'Expert printer repair and maintenance services for all major brands.',
    features: ['Repairs & Service', 'Cartridge Refill', 'Network Setup', 'Maintenance'],
    href: '/services/printer-services'
  },
  {
    title: 'Server Solutions',
    icon: Server,
    description: 'Professional server setup, maintenance, and AMC services for businesses.',
    features: ['Server Setup', 'Maintenance', 'AMC Services', 'Performance Tuning'],
    href: '/services/it-support'
  },
  {
    title: 'Hardware Sales',
    icon: HardDrive,
    description: 'Quality laptops, desktops, and hardware components at competitive prices.',
    features: ['New & Used Systems', 'Components', 'Accessories', 'Custom Builds'],
    href: '/services/hardware-sales'
  },
  {
    title: 'Networking',
    icon: Network,
    description: 'Complete networking solutions for homes and businesses.',
    features: ['Network Setup', 'WiFi Solutions', 'Troubleshooting', 'Security'],
    href: '/services/network-solutions'
  },
  {
    title: 'Data Services',
    icon: Database,
    description: 'Professional data recovery and protection services.',
    features: ['Data Recovery', 'Backup Solutions', 'Anti-virus', 'Data Security'],
    href: '/services/data-recovery'
  }
];

const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  
  return (
    <Link href={service.href}>
      <div className="group relative bg-white rounded-2xl p-8 border border-slate/10 transition-all duration-300 hover:bg-cool/50 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.15)]">
        <div className="flex items-start gap-6">
          <div className="p-3 bg-cool rounded-xl border border-slate/10 transition-colors duration-300">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl text-primary mb-3 font-bold">{service.title}</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feature, index) => (
                <li key={index} className="text-sm text-slate-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ServiceCategories = () => {
  return (
    <section id="categories" className="py-24 bg-gradient-to-b from-white to-cool/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-primary font-bold mb-4">
            Our Services
          </h2>
          <p className="text-lg text-slate-600">
            Comprehensive IT solutions tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;

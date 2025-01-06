import { Camera, Home, Monitor, Shield, Printer, Server, HardDrive, Network, Database, Receipt } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'CCTV Surveillance',
    icon: Camera,
    description: 'Advanced security camera systems for homes and businesses with professional installation.',
    features: ['HD Camera Systems', 'Remote Monitoring', '24/7 Recording', 'Mobile App Access']
  },
  {
    title: 'Smart Home Automation',
    icon: Home,
    description: 'Transform your home with cutting-edge automation solutions for comfort and security.',
    features: ['Door Security', 'Smart Lighting', 'Temperature Control', 'Remote Access']
  },
  {
    title: 'Computer Services',
    icon: Monitor,
    description: 'Comprehensive computer repair and maintenance services for all your tech needs.',
    features: ['Hardware Repair', 'Software Installation', 'Performance Optimization', 'Data Backup']
  },
  {
    title: 'Security Solutions',
    icon: Shield,
    description: 'Complete security solutions including door systems and surveillance.',
    features: ['Access Control', 'Door Security', 'Biometric Systems', 'Security Consulting']
  },
  {
    title: 'Printer Services',
    icon: Printer,
    description: 'Expert printer repair and maintenance services for all major brands.',
    features: ['Repairs & Service', 'Cartridge Refill', 'Network Setup', 'Maintenance']
  },
  {
    title: 'Server Solutions',
    icon: Server,
    description: 'Professional server setup, maintenance, and AMC services for businesses.',
    features: ['Server Setup', 'Maintenance', 'AMC Services', 'Performance Tuning']
  },
  {
    title: 'Hardware Sales',
    icon: HardDrive,
    description: 'Quality laptops, desktops, and hardware components at competitive prices.',
    features: ['New & Used Systems', 'Components', 'Accessories', 'Custom Builds']
  },
  {
    title: 'Networking',
    icon: Network,
    description: 'Complete networking solutions for homes and businesses.',
    features: ['Network Setup', 'WiFi Solutions', 'Troubleshooting', 'Security']
  },
  {
    title: 'Data Services',
    icon: Database,
    description: 'Professional data recovery and protection services.',
    features: ['Data Recovery', 'Backup Solutions', 'Anti-virus', 'Data Security']
  },
  {
    title: 'Business Solutions',
    icon: Receipt,
    description: 'Specialized software solutions for business operations.',
    features: ['GST Software', 'Accounting Tools', 'Business Apps', 'Technical Support']
  }
];

const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  
  return (
    <div className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10" />
      
      <div className="flex items-start gap-4">
        <div className="p-3 bg-secondary/10 rounded-xl">
          <Icon className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h3 className="text-xl font-sans font-semibold text-white mb-2">{service.title}</h3>
          <p className="text-white/60 mb-4 leading-relaxed">{service.description}</p>
          <ul className="grid grid-cols-2 gap-2">
            {service.features.map((feature, index) => (
              <li key={index} className="text-sm text-white/50 flex items-center gap-2">
                <span className="w-1 h-1 bg-secondary/70 rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ServiceCategories = () => {
  return (
    <section id="categories" className="py-20 bg-primary/80">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Discover our comprehensive range of IT solutions tailored to meet your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;

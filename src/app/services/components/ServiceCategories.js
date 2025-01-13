import Link from 'next/link';
import { Camera, HardDrive, Home, Laptop, Network, Printer } from 'lucide-react';
import { services } from '@/app/constants/services';

const iconMap = {
  Camera,
  Home,
  Laptop,
  Tool: HardDrive,
  Network,
  Printer
};

const ServiceCard = ({ service }) => {
  const Icon = iconMap[service.icon];
  
  return (
    <Link href={`/services/${service.id}`} className="block h-full">
      <div className="group relative bg-white rounded-2xl p-8 border border-slate/10 transition-all duration-300 hover:bg-cool/50 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.15)] h-full flex flex-col">
        <div className="flex items-start gap-6 mb-6">
          <div className="p-3 bg-cool rounded-xl border border-slate/10 transition-colors duration-300">
            {Icon && <Icon className="w-6 h-6 text-primary" />}
          </div>
          <div>
            <h3 className="text-2xl text-primary mb-3 font-bold">{service.title}</h3>
            <p className="text-slate-600 mb-4 flex-grow">{service.shortDescription}</p>
          </div>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
          {service.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="text-sm text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

const ServiceCategories = () => {
  return (
    <section id="categories" className="py-24 bg-gradient-to-b from-white to-cool/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Services</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Comprehensive tech solutions tailored to your needs, from security systems to IT support
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;

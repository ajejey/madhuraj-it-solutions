import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import Card from '../ui/Card';
import { services } from '@/app/constants/services';

const ServiceHighlight = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Our Professional Services
          </h2>
          <p className="text-slate/80 max-w-2xl mx-auto">
            From CCTV installation to smart home automation, we provide comprehensive 
            tech solutions tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = Icons[service.icon];
            
            return (
              <Link 
                key={service.id} 
                href={`/services/${service.id}`}
                className="group"
              >
                <Card className="h-full flex flex-col">
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      {IconComponent && (
                        <IconComponent className="h-6 w-6 text-primary" />
                      )}
                    </div>
                  </div>
                  <h3 className="font-playfair text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate/80 mb-4 flex-grow">
                    {service.shortDescription}
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    Learn More 
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlight;

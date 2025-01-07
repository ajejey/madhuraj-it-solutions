'use client';

import { Building2, Briefcase, School, Hospital, Store, Factory } from 'lucide-react';

const industries = [
  {
    icon: Building2,
    name: 'Corporate Offices',
    description: 'Comprehensive IT support for businesses of all sizes',
    color: 'text-primary'
  },
  {
    icon: School,
    name: 'Educational Institutions',
    description: 'Technology solutions for schools and learning centers',
    color: 'text-secondary'
  },
  {
    icon: Hospital,
    name: 'Healthcare',
    description: 'Secure and reliable IT infrastructure for medical facilities',
    color: 'text-accent'
  },
  {
    icon: Store,
    name: 'Retail',
    description: 'Point of sale and inventory management solutions',
    color: 'text-primary'
  },
  {
    icon: Briefcase,
    name: 'Small Businesses',
    description: 'Tailored IT services for startups and SMEs',
    color: 'text-secondary'
  },
  {
    icon: Factory,
    name: 'Manufacturing',
    description: 'Industrial computing and network solutions',
    color: 'text-accent'
  }
];

const IndustriesServed = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl text-primary font-bold mb-4">
            Industries We Serve
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Delivering specialized IT solutions across diverse sectors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div 
                key={index}
                className="bg-cool/30 p-6 rounded-2xl flex items-start gap-6 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="p-3 bg-cool rounded-full">
                    <Icon className={`w-8 h-8 ${industry.color}`} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {industry.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesServed;

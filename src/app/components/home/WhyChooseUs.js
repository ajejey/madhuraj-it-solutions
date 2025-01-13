import { Shield, Clock, Award, HeartHandshake } from 'lucide-react';
import Card from '../ui/Card';

const features = [
  {
    name: 'Expert Team',
    description: 'Our certified technicians bring years of experience and expertise to every project.',
    icon: Award,
  },
  {
    name: 'Quality Service',
    description: 'We use only the best equipment and follow industry best practices for all installations.',
    icon: Shield,
  },
  {
    name: 'Quick Response',
    description: '24/7 support and quick response times to ensure your systems run smoothly.',
    icon: Clock,
  },
  {
    name: 'Customer First',
    description: 'We prioritize your needs and provide personalized solutions that work for you.',
    icon: HeartHandshake,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-cool">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Why Choose Us
          </h2>
          <p className="text-slate/80 max-w-2xl mx-auto">
            With years of experience in the IT industry, we provide reliable and 
            professional services that you can trust.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.name} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mb-6">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-montserrat text-xl font-bold mb-2">
                {feature.name}
              </h3>
              <p className="text-slate/80 font-roboto">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

import { ArrowRight } from 'lucide-react';
import Button from '@/app/components/ui/Button';

const ServiceHero = () => {
  return (
    <section className="py-20 pt-40 bg-gradient-to-b from-cool to-white">
      <div className="container relative mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl text-primary font-bold mb-6">
            Professional IT Solutions
            <span className="block text-secondary mt-2">for Your Business</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-10">
            From advanced security systems to comprehensive IT infrastructure, 
            we deliver tailored solutions that drive your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              href="#categories"
              variant="default"
              size="lg"
              className="w-full sm:w-auto min-w-[200px] bg-primary hover:bg-primary/90 text-white font-montserrat"
            >
              Explore Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[200px] border-2 border-primary/80 text-primary hover:bg-primary/5 font-montserrat"
            >
              Get a Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;

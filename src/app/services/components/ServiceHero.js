import { ArrowRight } from 'lucide-react';
import Button from '@/app/components/ui/Button';

const ServiceHero = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/85 to-primary/75">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px] pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
            Comprehensive IT Solutions
            <span className="block text-secondary/90 mt-2">for Your Digital Needs</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
            From CCTV surveillance and smart home automation to computer services and networking solutions,
            we provide end-to-end technology services tailored to your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              href="#categories"
              className="bg-secondary/90 hover:bg-secondary text-white"
            >
              Explore Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/contact"
              className="border-white/80 text-white hover:bg-white/10"
            >
              Get a Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-secondary/10 rounded-full filter blur-3xl" />
      <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-secondary/10 rounded-full filter blur-3xl" />
    </section>
  );
};

export default ServiceHero;

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Camera, Home, Monitor, Smartphone } from 'lucide-react';
import Button from '../ui/Button';

const serviceCards = [
  {
    title: 'CCTV',
    icon: Camera,
    description: 'Advanced surveillance systems',
  },
  {
    title: 'Smart Home',
    icon: Home,
    description: 'Automated home solutions',
  },
  {
    title: 'IT Services',
    icon: Monitor,
    description: 'Complete tech support',
  },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Tech Services Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-12 gap-8 min-h-[calc(100vh-4rem)]">
              {/* Main Content */}
              <div className="col-span-7 flex flex-col justify-center">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
                  <h1 className="text-6xl font-bold leading-tight text-white mb-6">
                    <span className="inline-block transform hover:translate-x-2 transition-transform">Tech Services</span>
                    <br />
                    <span className="text-secondary">for Homes and</span>
                    <br />
                    <span className="text-secondary">Offices</span>
                  </h1>
                  <p className="text-xl text-white/90 mb-8 max-w-xl">
                    Professional IT solutions including CCTV surveillance, smart home automation, 
                    and comprehensive computer services tailored to your needs.
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      size="lg" 
                      href="/services"
                      className="bg-secondary hover:bg-secondary-hover text-white"
                    >
                      Explore Services
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      href="/contact"
                      className="border-white text-white hover:bg-white/10"
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="col-span-5 relative">
                <div className="absolute top-1/2 -translate-y-1/2 w-full">
                  {/* Service Cards */}
                  <div className="space-y-6">
                    {serviceCards.map((service, index) => {
                      const Icon = service.icon;
                      return (
                        <div
                          key={service.title}
                          className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 
                            transform hover:-translate-x-2 transition-all cursor-pointer
                            ${index === 0 ? 'translate-x-12' : index === 2 ? '-translate-x-12' : ''}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-secondary/20 rounded-xl">
                              <Icon className="w-6 h-6 text-secondary" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{service.title}</h3>
                              <p className="text-sm text-white/70">{service.description}</p>
                            </div>
                          </div>
                          <div className="h-1 w-12 bg-secondary mt-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="container mx-auto px-4 py-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-white mb-6 text-center">
                <span>Tech Services</span>
                <br />
                <span className="text-secondary">for Homes and</span>
                <br />
                <span className="text-secondary">Offices</span>
              </h1>
              <p className="text-lg text-white/90 mb-8 text-center">
                Professional IT solutions including CCTV surveillance, smart home automation, 
                and comprehensive computer services tailored to your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  href="/services"
                  className="bg-secondary text-white hover:bg-secondary-hover w-full sm:w-auto"
                >
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  href="/contact"
                  className="border-white text-white hover:bg-white/10 hover:text-white-hover w-full sm:w-auto"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Mobile Service Cards */}
            <div className="mt-8 relative">
              {/* Gradient Overlays for scroll indication */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-primary to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-primary to-transparent z-10" />
              
              {/* Scrollable Container */}
              <div className="flex overflow-x-auto gap-4 pb-4 px-4 snap-x snap-mandatory hide-scrollbar">
                {serviceCards.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={service.title}
                      className="flex-none w-[280px] snap-center"
                    >
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20
                        transform hover:scale-[1.02] transition-all h-full"
                      >
                        <div className="flex flex-col items-center text-center gap-4">
                          <div className="p-4 bg-secondary/20 rounded-full">
                            <Icon className="w-8 h-8 text-secondary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                            <p className="text-sm text-white/70">{service.description}</p>
                          </div>
                          <div className="h-1 w-12 bg-secondary mt-2" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-secondary/20 rounded-full filter blur-3xl" />
      <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-secondary/20 rounded-full filter blur-3xl" />
    </section>
  );
};

export default HeroSection;

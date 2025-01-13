import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MobileServiceSlider from './MobileServiceSlider';
import DesktopServiceCarousel from './DesktopServiceCarousel';
import Button from '../ui/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-cool to-white">
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-0 md:gap-12 items-center">
          {/* Desktop Layout */}
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary leading-tight">
            Tech Services 
              <span className="block text-secondary">for Homes and Offices</span> 
              <span className="block text-tertiary">In Bengaluru</span> 
            <span className="block text-secondary"> At your doorstep </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl">
              Comprehensive IT solutions tailored to your unique business needs. 
              From computer repairs to advanced security systems, we&apos;ve got you covered right at your doorstep.
            </p>
            <div className="flex space-x-4">
              <Button 
                href="/services" 
                variant="primary"
                className="flex items-center bg-primary hover:bg-primary/90 text-white"
              >
                Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                href="/contact" 
                variant="outline"
              >
                Contact Us
              </Button>
            </div>
          </div>

          {/* Desktop Service Cards */}
          <div>
            <DesktopServiceCarousel />
          </div>

          {/* Mobile Layout */}
          {/* <div className="md:hidden">
            <div className="relative">
              <MobileServiceSlider />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

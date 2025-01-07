'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Cctv, Cpu, Home, LaptopMinimalCheck, Monitor } from 'lucide-react';

const serviceCards = [
  {
    title: 'CCTV Solutions',
    Icon: Cctv,
    description: 'Advanced surveillance systems for comprehensive security',
    href: '/services/cctv'
  },
  {
    title: 'Smart Home',
    Icon: Home,
    description: 'Intelligent home automation and integration',
    href: '/services/smart-home'
  },
  {
    title: 'IT Services',
    Icon: LaptopMinimalCheck,
    description: 'Complete technical support and infrastructure management',
    href: '/services/it-support'
  },
  {
    title: 'Hardware Sales',
    Icon: Cpu,
    description: 'Quality hardware products at competitive prices',
    href: '/services/hardware-sales'
  },
  {
    title: 'Computer Sales',
    Icon: Monitor,
    description: 'Quality refurbished computers at affordable prices',
    href: '/services/computer-sales'
  },
  {
    title: 'Network Solutions',
    Icon: Monitor,
    description: 'Customized network solutions for businesses of all sizes',
    href: '/services/network-solutions'
  },
  {
    title: 'Printer Services',
    Icon: Monitor,
    description: 'Expert printer repair and maintenance services for all major brands',
    href: '/services/printer-services'
  },
  {
    title: 'Security Solutions',
    Icon: Monitor,
    description: 'Complete security solutions including door systems and surveillance',
    href: '/services/security-solutions'
  }
];

const MobileServiceSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = serviceCards.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => 
        (prevIndex + 1) % totalCards
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [totalCards]);

  const getTransform = (index) => {
    // Calculate the distance from the active index
    const distance = (index - activeIndex + totalCards) % totalCards;
    
    // Determine the transformation based on distance
    if (distance === 0) {
      return 'scale-100 translate-y-0 rotate-y-0 z-10 opacity-100';
    } else if (distance <= 2 || distance >= totalCards - 2) {
      const sign = distance < totalCards / 2 ? 1 : -1;
      const scale = 1 - Math.abs(distance - totalCards / 2) * 0.1;
      const rotation = sign * 10;
      const translateX = sign * (50 + Math.abs(distance - totalCards / 2) * 30);
      
      return `
        scale-${Math.round(scale * 100)} 
        ${sign > 0 ? 'translate-x-' : '-translate-x-'}${translateX} 
        rotate-y-${rotation} 
        z-${10 - Math.abs(distance - totalCards / 2)} 
        opacity-${Math.max(50, 100 - Math.abs(distance - totalCards / 2) * 20)}
      `;
    }
    
    return 'scale-50 translate-y-20 z-1 opacity-20';
  };

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      {serviceCards.map((service, index) => {
        const { Icon } = service;
        const transformClasses = getTransform(index);

        return (
          <div
            key={index}
            className={`
              absolute w-[280px] sm:w-[320px] transition-all duration-700 ease-in-out 
              bg-white/20 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-2xl
              ${transformClasses}
            `}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '800px'
            }}
          >
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6 flex items-center justify-center">
                <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-3 sm:mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 text-center mb-3 sm:mb-4 h-12 sm:h-16">
                {service.description}
              </p>
              <Link 
                href={service.href}
                className="group inline-flex items-center text-primary hover:text-primary/80 text-sm sm:text-base"
              >
                Learn More
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileServiceSlider;

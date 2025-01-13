'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Cctv, Cpu, Home, LaptopMinimalCheck, Monitor, Globe } from 'lucide-react';

const serviceCards = [
  {
    title: 'Computer Sales',
    Icon: Monitor,
    description: 'Quality refurbished computers at affordable prices',
    href: '/services/computer-sales'
  },
  {
    title: 'Hardware Sales',
    Icon: Cpu,
    description: 'Quality hardware products at competitive prices',
    href: '/services/hardware-sales'
  },
  {
    title: 'Web Development',
    Icon: Globe,
    description: 'Custom website design and development solutions',
    href: '/services/web-development'
  },
  {
    title: 'IT Services',
    Icon: LaptopMinimalCheck,
    description: 'Complete technical support and infrastructure management',
    href: '/services/it-support'
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
    title: 'Security Solutions',
    Icon: Monitor,
    description: 'Complete security solutions including door systems and surveillance',
    href: '/services/security-solutions'
  }
];

const DesktopServiceCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    if (!isPaused) {
      setActiveIndex(prev => (prev + 1) % serviceCards.length);
    }
  }, [isPaused]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const getCardStyles = (index) => {
    const isFocused = index === activeIndex;
    const isPrevious = index === (activeIndex - 1 + serviceCards.length) % serviceCards.length;
    const isNext = index === (activeIndex + 1) % serviceCards.length;

    if (isFocused) return 'scale-100 translate-y-0 rotate-x-0 z-10';
    if (isPrevious) return 'scale-90 translate-x-20 rotate-x-10 z-5';
    if (isNext) return 'scale-90 -translate-x-20 -rotate-x-10 z-5';
    return 'scale-80 translate-y-0 z-1 opacity-50';
  };

  return (
    <div 
      className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {serviceCards.map((service, index) => {
        const { Icon } = service;
        
        return (
          <div
            key={service.title}
            className={`
              absolute w-[350px] will-change-transform
              transition-all duration-700 ease-in-out 
              bg-white/50 backdrop-blur-md rounded-2xl p-6 shadow-2xl
              ${getCardStyles(index)}
              ${index === activeIndex ? 'ring-4 ring-primary/50' : ''}
            `}
            style={{
              transform: `perspective(1000px) ${getCardStyles(index)}`,
              containIntrinsic: 'size layout',
              contain: 'paint'
            }}
          >
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full w-24 h-24 mb-6 flex items-center justify-center">
                <Icon className="w-12 h-12 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center mb-4 h-16">
                {service.description}
              </p>
              <Link 
                href={service.href}
                className="group inline-flex items-center text-primary hover:text-primary/80"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DesktopServiceCarousel;





// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { ArrowRight, Camera, Cctv, Cpu, Home, LaptopMinimalCheck, Monitor } from 'lucide-react';

// const serviceCards = [
//   {
//     title: 'CCTV Solutions',
//     Icon: Cctv,
//     description: 'Advanced surveillance systems for comprehensive security',
//     href: '/services/cctv'
//   },
//   {
//     title: 'Smart Home',
//     Icon: Home,
//     description: 'Intelligent home automation and integration',
//     href: '/services/smart-home'
//   },
//   {
//     title: 'IT Services',
//     Icon: LaptopMinimalCheck,
//     description: 'Complete technical support and infrastructure management',
//     href: '/services/it-support'
//   },
//   {
//     title: 'Hardware Sales',
//     Icon: Cpu,
//     description: 'Quality hardware products at competitive prices',
//     href: '/services/hardware-sales'
//   },
//   {
//     title: 'Computer Sales',
//     Icon: Monitor,
//     description: 'Quality refurbished computers at affordable prices',
//     href: '/services/computer-sales'
//   },
//   {
//     title: 'Network Solutions',
//     Icon: Monitor,
//     description: 'Customized network solutions for businesses of all sizes',
//     href: '/services/network-solutions'
//   },
//   {
//     title: 'Printer Services',
//     Icon: Monitor,
//     description: 'Expert printer repair and maintenance services for all major brands',
//     href: '/services/printer-services'
//   },
//   {
//     title: 'Security Solutions',
//     Icon: Monitor,
//     description: 'Complete security solutions including door systems and surveillance',
//     href: '/services/security-solutions'
//   }
// ];

// const DesktopServiceCarousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prevIndex) => 
//         (prevIndex + 1) % serviceCards.length
//       );
//     }, 3000); // Change card every 3 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
//       {serviceCards.map((service, index) => {
//         const { Icon } = service;
//         const isFocused = index === activeIndex;
//         const isPrevious = index === (activeIndex - 1 + serviceCards.length) % serviceCards.length;
//         const isNext = index === (activeIndex + 1) % serviceCards.length;

//         const getTransform = () => {
//           if (isFocused) return 'scale-100 translate-y-0 rotate-x-0 z-10';
//           if (isPrevious) return 'scale-90 translate-x-20 rotate-x-10 z-5';
//           if (isNext) return 'scale-90 -translate-x-20 -rotate-x-10 z-5';
//           return 'scale-80 translate-y-0 z-1 opacity-50';
//         };

//         return (
//           <div
//             key={index}
//             className={`
//               absolute w-[350px] transition-all duration-700 ease-in-out 
//               bg-white/50 backdrop-blur-md rounded-2xl p-6 shadow-2xl
//               ${getTransform()}
//               ${isFocused ? 'ring-4 ring-primary/50' : ''}
//             `}
//             style={{
//               transformStyle: 'preserve-3d',
//               perspective: '1000px'
//             }}
//           >
//             <div className="flex flex-col items-center">
//               <div className="bg-primary/10 rounded-full w-24 h-24 mb-6 flex items-center justify-center">
//                 <Icon className="w-12 h-12 text-primary" strokeWidth={1.5} />
//               </div>
//               <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
//                 {service.title}
//               </h3>
//               <p className="text-gray-600 text-center mb-4 h-16">
//                 {service.description}
//               </p>
//               <Link 
//                 href={service.href}
//                 className="group inline-flex items-center text-primary hover:text-primary/80"
//               >
//                 Learn More
//                 <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//               </Link>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default DesktopServiceCarousel;


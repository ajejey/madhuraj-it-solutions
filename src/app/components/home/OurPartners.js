import Image from 'next/image'
import React from 'react'

const PARTNERS = [
    { name: 'BUSY', logo: '/images/partners/BUSYLogo.jpg' },
    { name: 'Canon', logo: '/images/partners/CanonLogo.png' },
    { name: 'Dell', logo: '/images/partners/DellLogo.png' },
    { name: 'Epson', logo: '/images/partners/EpsonLogo.png' },
    { name: 'HP', logo: '/images/partners/HPLogo.png' },
    { name: 'Hikvision', logo: '/images/partners/HikvisionLogo.png' },
    { name: 'Lenovo', logo: '/images/partners/LenovoLogo.png' },
    { name: 'QuickHeal', logo: '/images/partners/QuickHealLogo.png' },
    { name: 'TP-LINK', logo: '/images/partners/TPLINKLogo.png' }
  ];

const OurPartners = () => {
  return (
    <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Trusted Partners
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We collaborate with leading technology brands to deliver the best solutions for our customers.
            </p>
          </div>

          {/* Infinite Scroll Partners */}
          <div className="relative w-full overflow-hidden">
            <div className="flex items-center animate-infinite-scroll-left-mobile md:animate-infinite-scroll-left">
              {/* First Row */}
              {PARTNERS.map((partner, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 mx-8  hover:opacity-100 transition-opacity duration-300 "
                >
                  <Image 
                    src={partner.logo} 
                    alt={`${partner.name} Logo`} 
                    width={120} 
                    height={60} 
                    className="object-contain"
                  />
                </div>
              ))}
　
              {/* Duplicate Row for Infinite Scroll Effect */}
              {PARTNERS.map((partner, index) => (
                <div 
                  key={`duplicate-${index}`} 
                  className="flex-shrink-0 mx-8  hover:opacity-100 transition-opacity duration-300 "
                >
                  <Image 
                    src={partner.logo} 
                    alt={`${partner.name} Logo`} 
                    width={120} 
                    height={60} 
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}

export default OurPartners
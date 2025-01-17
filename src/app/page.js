import HeroSection from './components/home/HeroSection';
import ServiceHighlight from './components/home/ServiceHighlight';
import WhyChooseUs from './components/home/WhyChooseUs';
import ProjectAchievements from './components/home/ProjectAchievements';
import IndustriesServed from './components/home/IndustriesServed';
import ContactCTA from './components/home/ContactCTA';
import Testimonials from './services/components/Testimonials';
import Footer from './components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import OurPartners from './components/home/OurPartners';

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

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex flex-col">
        <HeroSection />
        <OurPartners />
        <ServiceHighlight />
        <ProjectAchievements />
        <IndustriesServed />
        <WhyChooseUs />
        <Testimonials />
        <ContactCTA />
      </div>

   
      <Footer />
    </main>
  );
}

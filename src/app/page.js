import HeroSection from './components/home/HeroSection';
import ServiceHighlight from './components/home/ServiceHighlight';
import WhyChooseUs from './components/home/WhyChooseUs';
import ProjectAchievements from './components/home/ProjectAchievements';
import IndustriesServed from './components/home/IndustriesServed';
import ContactCTA from './components/home/ContactCTA';
import Testimonials from './services/components/Testimonials';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ServiceHighlight />
      <ProjectAchievements />
      <IndustriesServed />
      <WhyChooseUs />
      <Testimonials />
      <ContactCTA />
    </div>
  );
}

import HeroSection from './components/home/HeroSection';
import ServiceHighlight from './components/home/ServiceHighlight';
import WhyChooseUs from './components/home/WhyChooseUs';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ServiceHighlight />
      <WhyChooseUs />
    </div>
  );
}

import ServiceHero from './components/ServiceHero';
import ServiceCategories from './components/ServiceCategories';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';

export const metadata = {
  title: 'Services - Madhuraj System Solutions',
  description: 'Professional IT services including CCTV surveillance, smart home automation, computer services, and more in Bangalore.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServiceHero />
      <ServiceCategories />
      <Testimonials />
      <CallToAction />
    </main>
  );
}

import ServiceHero from './components/ServiceHero';
import ServiceCategories from './components/ServiceCategories';
import Testimonials from './components/Testimonials';
import Footer from '../components/layout/Footer';

export const metadata = {
  title: 'Services - Madhuraj System Solutions',
  description: 'Professional IT services including CCTV surveillance, smart home automation, computer services, and more in Bangalore.',
};

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <ServiceHero />
      <ServiceCategories />
      <Footer />
    </div>
  );
}

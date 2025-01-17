import ContactHero from './components/ContacttHero';
import CompanyInfo from './components/CompanyInfo';
import BusinessHours from './components/BusinessHours';
import Location from './components/Location';
import Footer from '../components/layout/Footer';

export default function ContactPage() {
  return (
    <div className="bg-white pt-16">
      <ContactHero />
      <CompanyInfo />
      <BusinessHours />
      <Location />
      <Footer />
    </div>
  );
}

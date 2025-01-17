import AboutHero from './components/AboutHero';
import Story from './components/Story';
import Values from './components/Values';
import Team from './components/Team';
import Footer from '../components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="bg-white">
      <AboutHero />
      <Story />
      <Values />
      <Team />
      <Footer />
    </div>
  );
}

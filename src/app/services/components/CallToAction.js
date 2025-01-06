import { Phone, Mail } from 'lucide-react';
import Button from '@/app/components/ui/Button';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/90">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and let us help you find the perfect IT solution for your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              href="tel:+919876543210"
              className="bg-secondary hover:bg-secondary-hover text-white flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/contact"
              className="border-white text-white hover:bg-white/10 flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import Button from '@/app/components/ui/Button';

const ContactCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-cool to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            {/* Contact Information */}
            <div className="p-8 bg-primary/5">
              <h2 className="text-2xl text-primary font-bold mb-4">
                Ready to Transform Your IT Infrastructure?
              </h2>
              <p className="text-slate-600 mb-6">
                Get expert IT solutions tailored to your business needs. 
                Reach out today for a free consultation.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-slate-800 font-semibold">Call Us</p>
                    <a 
                      href="tel:+917899113311" 
                      className="text-slate-600 hover:text-primary transition-colors"
                    >
                      +91 78991 13311
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-slate-800 font-semibold">Our Location</p>
                    <a 
                      href="https://maps.app.goo.gl/c6z44uuTa6LGvEhp9" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-secondary transition-colors"
                    >
                      Rajarajeshwari Nagar, Bengaluru
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-secondary" />
                  <div>
                    <p className="text-slate-800 font-semibold">Email Us</p>
                    <a 
                      href="mailto:bharath.rdhanraj@gmail.com" 
                      className="text-slate-600 hover:text-secondary transition-colors"
                    >
                      bharath.rdhanraj@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Form */}
            <div className="p-8">
              <form className="space-y-4">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-slate-700 mb-2"
                  >
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Enter your name" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="phone" 
                    className="block text-slate-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="Enter your phone number" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-white hover:bg-primary/90"
                >
                  Request Callback
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;

import { MapPin, Phone, Mail } from 'lucide-react';

const CompanyInfo = () => {
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Company Description */}
            <div>
              <h2 className="text-2xl text-primary font-bold mb-6">About Us</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                At Madhuraj System Solutions, we provide comprehensive IT services including CCTV surveillance, 
                door security systems, smart home automation, and computer sales and services. Our expertise 
                extends to motherboard repairs, monitor servicing, printer maintenance, and network solutions.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We also offer specialized services in data recovery, antivirus solutions, 
                GST accounting software implementation, and AMC server management.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-cool/50 rounded-2xl p-8">
              <h3 className="text-xl text-primary font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-slate-600">
                    11, 1st floor, 12th Cross Rd, opp. to HDFC Bank,<br />
                    Remco Bhel Layout, Ideal Homes Twp,<br />
                    Rajarajeshwari Nagar, Bengaluru,<br />
                    Karnataka 560098
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                  <a 
                    href="tel:+917899113311" 
                    className="text-slate-600 hover:text-primary transition-colors"
                  >
                    +91 78991 13311
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                  <a 
                    href="mailto:bharath.rdhanraj@gmail.com" 
                    className="text-slate-600 hover:text-primary transition-colors"
                  >
                    bharath.rdhanraj@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;

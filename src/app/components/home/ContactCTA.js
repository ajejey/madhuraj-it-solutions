'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import Button from '@/app/components/ui/Button';
import BusinessHours from './BusinessHours';
import { submitContactForm } from '@/app/lib/actions/contact';

const ContactCTA = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isBusinessHoursOpen, setIsBusinessHoursOpen] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setFormErrors({});

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        toast.success(result.message);
        // Reset form
        document.getElementById('contactForm').reset();
      } else {
        // Handle validation errors
        if (result.errors) {
          const errors = {};
          result.errors.forEach(err => {
            errors[err.path] = err.message;
          });
          setFormErrors(errors);
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-cool to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 items-stretch">
            {/* Contact Information */}
            <div className="p-10 bg-primary/5 flex flex-col justify-center">
              <h2 className="text-3xl text-primary font-bold mb-6 leading-tight">
                Ready to Transform Your IT Infrastructure?
              </h2>
              <p className="text-slate-600 mb-8 text-lg">
                Get expert IT solutions tailored to your business needs.
                Reach out today for a free consultation.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold text-lg">Call Us</p>
                    <a
                      href="tel:+917899113311"
                      className="text-slate-600 hover:text-primary transition-colors text-base"
                    >
                      +91 78991 13311
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold text-lg">Our Location</p>
                    <a
                      href="https://maps.app.goo.gl/c6z44uuTa6LGvEhp9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-secondary transition-colors text-base"
                    >
                      Rajarajeshwari Nagar, Bengaluru
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center">
                    <Mail className="w-7 h-7 text-secondary" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold text-lg">Email Us</p>
                    <a
                      href="mailto:bharath.rdhanraj@gmail.com"
                      className="text-slate-600 hover:text-secondary transition-colors text-base"
                    >
                      bharath.rdhanraj@gmail.com
                    </a>
                  </div>
                </div>

                <BusinessHours isOpen={isBusinessHoursOpen} onClose={() => setIsBusinessHoursOpen(false)} />
              </div>
            </div>

            {/* CTA Form */}
            <div className="p-10 bg-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                Request a Free Consultation
              </h3>
              <form
                id="contactForm"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  handleSubmit(formData);
                }}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-slate-700 mb-2 font-medium"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 text-base
                      ${formErrors.name ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-primary/50'}`}
                    required
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-slate-700 mb-2 font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your 10-digit mobile number"
                    className={`w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 text-base
                      ${formErrors.phone ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-primary/50'}`}
                    required
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-slate-700 mb-2 font-medium"
                  >
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    className={`w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 text-base
                      ${formErrors.email ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-primary/50'}`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-slate-700 mb-2 font-medium"
                  >
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Share any additional details"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white hover:bg-primary/90 disabled:opacity-50 py-3 text-base"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Callback'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Business Hours Modal */}
    </section>
  );
};

export default ContactCTA;

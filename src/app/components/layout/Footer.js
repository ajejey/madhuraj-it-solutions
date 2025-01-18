import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

const services = [
  { name: 'Computer Service', href: '/services#computer-service' },
  { name: 'Laptop Service', href: '/services#laptop-service' },
  { name: 'Network Solutions', href: '/services#network-solutions' },
  { name: 'Security Systems', href: '/services#security-systems' },
];

const contactInfo = [
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 78991 13311',
    href: 'tel:+917899113311',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'bharath.rdhanraj@gmail.com',
    href: 'mailto:bharath.rdhanraj@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Rajarajeshwari Nagar, Bengaluru',
    href: 'https://maps.app.goo.gl/c6z44uuTa6LGvEhp9',
  },
];

const socialLinks = [
  {
    icon: Facebook,
    href: 'https://www.facebook.com/bharathraj.compu/',
    label: 'Facebook',
  },
  {
    icon: Instagram,
    href: 'https://instagram.com',
    label: 'Instagram',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com',
    label: 'LinkedIn',
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="block ">
              <Image 
                src="/images/MSSLogo.jpg" 
                alt="Madhuraj System Solutions" 
                width={180} 
                height={48} 
                className="p-4 bg-white rounded-lg"
              />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your trusted partner for comprehensive IT solutions. We provide expert services
              in computer repair, networking, and security systems.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <li key={info.label}>
                    <a
                      href={info.href}
                      className="flex items-start gap-3 text-slate-300 hover:text-white transition-colors"
                    >
                      <Icon className="w-5 h-5 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{info.label}</p>
                        <p className="text-sm">{info.value}</p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} Madhuraj System Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy"
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

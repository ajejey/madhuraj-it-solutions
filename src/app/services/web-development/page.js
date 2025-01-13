import { Code, Layout, Rocket, Smartphone, Globe, Gauge, Sparkles, Zap, Check, Cloud, Palette, Users } from 'lucide-react';
import Link from 'next/link';

export default function WebDevelopmentPage() {
  const features = [
    {
      title: 'Modern Technology Stack',
      description: 'Next.js, React, and cutting-edge tools',
      icon: <Code className="w-12 h-12 text-primary" />
    },
    {
      title: 'Responsive Design',
      description: 'Perfect on all devices and screens',
      icon: <Smartphone className="w-12 h-12 text-primary" />
    },
    {
      title: 'Performance Optimized',
      description: 'Lightning-fast loading and interactions',
      icon: <Gauge className="w-12 h-12 text-primary" />
    }
  ];

  const webServices = [
    {
      title: 'Custom Development',
      description: 'Tailored web solutions for your business',
      icon: <Layout className="w-16 h-16 text-primary" />
    },
    {
      title: 'E-commerce',
      description: 'Online store development and integration',
      icon: <Globe className="w-16 h-16 text-primary" />
    },
    {
      title: 'Web Applications',
      description: 'Powerful and scalable web apps',
      icon: <Rocket className="w-16 h-16 text-primary" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Professional Web Development Services
          </h1>
          <p className="text-gray-700 mb-6">
            Transform your digital presence with our expert web development services. From stunning websites to powerful web applications, we create modern, fast, and scalable solutions that drive your business forward.
          </p>
          
          <div className="flex space-x-4">
            <Link 
              href="/contact"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
            >
              Get Started
            </Link>
            <Link 
              href="/portfolio"
              className="border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary-light transition"
            >
              View Portfolio
            </Link>
          </div>
        </div>
        {/* <iframe src="https://lottie.host/embed/3a823471-721b-45e8-936d-3fd4c1383284/zsYuLXzMnK.lottie"></iframe> */}
        {/* <iframe src="https://lottie.host/embed/109050a0-e2ee-472f-ab47-3c46998f4d55/8B0Z2dzY5q.lottie"></iframe> */}
        <div className="w-full md:w-1/2 relative h-[400px] rounded-2xl overflow-hidden">
          <iframe
            src="https://lottie.host/embed/109050a0-e2ee-472f-ab47-3c46998f4d55/8B0Z2dzY5q.lottie"
            className="absolute inset-0 w-full h-full border-none"
            title="Web Development Animation"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold font-montserrat mb-8 text-center">Why Choose Our Web Development Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold font-montserrat mb-2">{feature.title}</h3>
              <p className="text-gray-600 font-roboto">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Web Services Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold font-montserrat mb-8 text-center">Our Web Development Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {webServices.map((service, index) => (
            <Link 
              key={index} 
              href={`/contact?service=${service.title.toLowerCase().replace(' ', '-')}`}
              className="group"
            >
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all text-center">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold font-montserrat mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 font-roboto">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Detailed Web Development Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-montserrat text-center mb-12 text-primary">
            Comprehensive Web Solutions
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold font-montserrat mb-4 text-primary flex items-center gap-3">
                <Layout className="w-8 h-8" /> Custom Development
              </h3>
              <p className="text-gray-700 font-roboto mb-4">
                Tailor-made websites and web applications that perfectly align with your business goals. We focus on creating unique, user-friendly experiences that engage your audience.
              </p>
              <ul className="space-y-2 text-slate-600 font-roboto">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Responsive Design
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Modern UI/UX
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  SEO Optimization
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold font-montserrat mb-4 text-primary flex items-center gap-3">
                <Globe className="w-8 h-8" /> E-commerce Solutions
              </h3>
              <p className="text-gray-700 font-roboto mb-4">
                Complete e-commerce solutions with secure payment integration, inventory management, and user-friendly shopping experiences that drive sales.
              </p>
              <ul className="space-y-2 text-slate-600 font-roboto">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Secure Payments
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Inventory System
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Analytics Integration
                </li>
              </ul>
            </div>

            <div className="bg-cool/10 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold font-montserrat mb-4 text-primary flex items-center gap-3">
                <Rocket className="w-8 h-8" /> Web Applications
              </h3>
              <p className="text-gray-700 font-roboto mb-4">
                Powerful, scalable web applications built with modern technologies. From simple tools to complex enterprise solutions.
              </p>
              <ul className="space-y-2 text-slate-600 font-roboto">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Cloud Integration
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Real-time Features
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  API Development
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      {/* <section className="bg-cool/10 p-12 rounded-2xl">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl">
            <Zap className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Next.js</h3>
              <p className="text-sm text-gray-600">Modern Framework</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl">
            <Palette className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Tailwind CSS</h3>
              <p className="text-sm text-gray-600">Styling Framework</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl">
            <Cloud className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">MongoDB</h3>
              <p className="text-sm text-gray-600">Database</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl">
            <Sparkles className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">React</h3>
              <p className="text-sm text-gray-600">UI Library</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-4">Ready to Start Your Web Project?</h2>
        <p className="text-gray-600 font-roboto mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss how we can help you achieve your digital goals with our expert web development services.
        </p>
        <Link 
          href="/contact"
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition"
        >
          <Users className="w-5 h-5" />
          Schedule a Consultation
        </Link>
      </section>
    </div>
  );
}

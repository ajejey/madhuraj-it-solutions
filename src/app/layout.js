import { Montserrat, Playfair_Display, Roboto } from 'next/font/google';
import { CartProvider } from '@/app/lib/contexts/CartContext';
import { Toaster } from 'sonner';
import './globals.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/shared/WhatsAppButton';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://madhurajsystems.com'),
  title: {
    default: 'Madhuraj System Solutions - IT Services & Computer Sales in Rajarajeshwari Nagar, Bangalore',
    template: '%s | Madhuraj System Solutions'
  },
  description: 'Leading IT service provider specializing in computer sales, repair, and professional web development. Expert solutions for computer services, networking, CCTV, smart home automation, and custom web applications in Rajarajeshwari Nagar, Bangalore. Full-stack web development using modern technologies like Next.js and React.',
  keywords: [
    // Computer Sales Priority
    'computer sales Rajarajeshwari Nagar',
    'laptop sales RR Nagar',
    'used laptop dealer Bangalore',
    
    // Computer Repair Priority
    'computer repair Bangalore',
    'computer service center RR Nagar',
    'computer repair shop Rajarajeshwari Nagar',
    'laptop repair services',
    
    // Web Development Priority
    'web development services Bangalore',
    'custom web application development',
    'next.js web development',
    'react web development',
    'responsive website design',
    
    // Additional Services
    'IT services Bangalore',
    'networking solutions',
    'smart home automation',
    'CCTV installation',
    'data recovery services',
    'printer repair',
    'security system installation'
  ],
  authors: [{ name: 'Bharath', url: 'https://madhurajsystems.com' }],
  creator: 'Madhuraj System Solutions',
  publisher: 'Madhuraj System Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: 'KTC9HsGvGyKPhbqIJG8UDgQb5vGpmHQGVj7V75sBNeE', // Add your Google verification code
  },
  openGraph: {
    title: 'Madhuraj System Solutions - Your Trusted IT Partner in Bangalore',
    description: 'Expert IT services, computer sales & repair, CCTV installation, and web development in Rajarajeshwari Nagar, Bangalore. Visit our showroom near HDFC Bank, RR Nagar.',
    url: 'https://madhurajsystems.com',
    siteName: 'Madhuraj System Solutions',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://madhurajsystems.com/opengraph-image.jpg', // Add your OG image
        width: 1200,
        height: 630,
        alt: 'Madhuraj System Solutions - IT Services in Bangalore',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
    ],
  },
  alternates: {
    canonical: 'https://madhurajsystems.com',
  },
  category: 'technology',
  twitter: {
    card: 'summary_large_image',
    title: 'Madhuraj System Solutions - IT Services in Bangalore',
    description: 'Professional IT services, computer solutions & repair, CCTV installation, and web development in Rajarajeshwari Nagar, Bangalore. Expert team led by Mr. Bharath.',
    images: ['https://madhurajsystems.com/opengraph-image.jpg'], // Add your Twitter card image
  },
  other: {
    'google-site-verification': 'KTC9HsGvGyKPhbqIJG8UDgQb5vGpmHQGVj7V75sBNeE', // Add your Google verification code
    'msvalidate.01': 'YOUR_VERIFICATION_CODE', // Add your Bing verification code
    'facebook-domain-verification': 'YOUR_VERIFICATION_CODE', // Add your Facebook verification code
    'og:region': 'Karnataka',
    'og:locality': 'Bangalore',
    'business:contact_data:locality': 'Rajarajeshwari Nagar',
    'business:contact_data:region': 'Karnataka',
    'business:contact_data:postal_code': '560098',
    'business:contact_data:country_name': 'India',
    'business:contact_data:email': 'bharath.rdhanraj@gmail.com',
    'business:contact_data:phone_number': '+91 78991 13311',
    'business:hours:day': [
      'Monday 09:00-19:00',
      'Tuesday 09:00-19:00',
      'Wednesday 09:00-19:00',
      'Thursday 09:00-19:00',
      'Friday 10:00-19:00',
      'Saturday 10:00-19:00',
      'Sunday 10:00-17:00'
    ],
  },
  // Schema.org markup for local business
  script: [
    {
      type: 'application/ld+json',
      text: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ComputerStore',
        name: 'Madhuraj System Solutions',
        image: 'https://madhurajsystems.com/store-image.jpg', // Add your store image
        '@id': 'https://madhurajsystems.com',
        url: 'https://madhurajsystems.com',
        telephone: '+917899113311',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '11, 1st floor, 12th Cross Rd, opp. to HDFC Bank, Remco Bhel Layout',
          addressLocality: 'Rajarajeshwari Nagar',
          addressRegion: 'Karnataka',
          postalCode: '560098',
          addressCountry: 'IN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 12.926249, // Add your exact coordinates 12.926249,77.5155563
          longitude: 77.5155563
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '09:00',
            closes: '19:00'
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Friday', 'Saturday'],
            opens: '10:00',
            closes: '19:00'
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Sunday',
            opens: '10:00',
            closes: '17:00'
          }
        ],
        sameAs: [
          'https://www.facebook.com/bharathraj.compu/', // Add your social media links
        ],
        priceRange: '₹₹',
        servesCuisine: 'IT Services',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '151'
        }
      })
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable} ${roboto.variable}`}>
      <body className={`${montserrat.variable} ${playfair.variable} ${roboto.variable} antialiased min-h-screen flex flex-col`}>
        <main className="flex-grow overflow-x-hidden">
          <CartProvider>
            <Toaster position="top-center" expand={true} richColors />
            <Header />
            {children}
          </CartProvider>
        </main>
        {/* <Footer /> */}
        <WhatsAppButton />
      </body>
    </html>
  );
}

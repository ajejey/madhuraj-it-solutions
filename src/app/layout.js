import { Montserrat, Playfair_Display } from 'next/font/google';
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

export const metadata = {
  title: 'Madhuraj System Solutions',
  description: 'Your trusted partner for comprehensive IT solutions in Bengaluru',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className={`${montserrat.variable} ${playfair.variable} font-montserrat antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow overflow-x-hidden">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

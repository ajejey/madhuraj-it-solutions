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
  variable: '--font-roboto',
  weight: '400',
  display: 'swap',
});

export const metadata = {
  title: 'Madhuraj System Solutions',
  description: 'Your trusted partner for comprehensive IT solutions in Bengaluru',
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
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

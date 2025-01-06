import { Inter, DM_Serif_Display, Roboto } from 'next/font/google';
import './globals.css';
import Header from './components/layout/Header';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata = {
  title: 'Madhuraj System Solutions',
  description: 'Professional IT solutions including CCTV surveillance, smart home automation, and comprehensive computer services in Bangalore.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.variable} ${dmSerif.variable} ${roboto.variable} font-sans antialiased overflow-x-hidden`}>
        <Header />
        <main className="overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}

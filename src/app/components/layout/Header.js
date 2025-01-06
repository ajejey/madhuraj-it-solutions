'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { mainNavigation } from '@/app/constants/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50">
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100">
        <nav className="container mx-auto">
          <div className="flex justify-between items-center h-16 px-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-serif text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Madhuraj
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-slate hover:text-primary p-2 -mr-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
            <nav className="container mx-auto">
              <div className="px-4 py-2 space-y-1">
                {mainNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-slate hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

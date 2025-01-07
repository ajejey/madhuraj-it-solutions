'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { mainNavigation } from '@/app/constants/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => {
    // Exact match for home, otherwise check if path starts with href
    return href === '/' 
      ? pathname === href 
      : pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/MSSLogo.jpg" 
              alt="Madhuraj System Solutions" 
              width={150} 
              height={40} 
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  transition-colors 
                  ${isActive(item.href) 
                    ? 'text-primary font-semibold' 
                    : 'text-slate-600 hover:text-primary'}
                `}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-white backdrop-blur-md border-b border-slate-100">
            <nav className="container mx-auto">
              <div className="px-4 py-2 space-y-1">
                {mainNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      block py-2 transition-colors 
                      ${isActive(item.href) 
                        ? 'text-primary font-semibold' 
                        : 'text-slate-600 hover:text-primary'}
                    `}
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

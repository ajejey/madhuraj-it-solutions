'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { CartIcon } from '@/components/CartIcon';
import { mainNavigation } from '@/app/constants/navigation';
import { verifyAuth } from '@/app/lib/auth';
import { logout } from '@/app/lib/actions/auth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await verifyAuth();
      setIsAuthenticated(!!user);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    router.push('/');
  };

  const isActive = (href) => {
    return href === '/' ? pathname === href : pathname.startsWith(href);
  };

  // Filter out Login/Orders from main navigation
  const filteredNavigation = mainNavigation.filter(item => 
    item.name !== 'Login' && (!isAuthenticated ? item.name !== 'Orders' : true)
  );

  const AuthButton = () => (
    isAuthenticated ? (
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    ) : (
      <Link
        href="/login"
        className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
      >
        <LogIn className="w-4 h-4" />
        <span>Login</span>
      </Link>
    )
  );

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
            {filteredNavigation.map((item) => (
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
            <AuthButton />
            <CartIcon />
          </nav>

          {/* Mobile Right Section */}
          <div className="md:hidden flex items-center gap-4">
            <CartIcon />
            <button
              className="p-2"
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
                  {filteredNavigation.map((item) => (
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
                  <div className="py-2">
                    <AuthButton />
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

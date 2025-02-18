import { Suspense } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Box, 
  ShoppingCart, 
  Users, 
  Settings, 
  Menu 
} from 'lucide-react';
// import { requireRole } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { requireRole } from '../lib/auth';

const SIDEBAR_ITEMS = [
  { 
    href: '/admin', 
    icon: LayoutDashboard, 
    label: 'Dashboard' 
  },
  { 
    href: '/admin/products', 
    icon: Box, 
    label: 'Products' 
  },
  { 
    href: '/admin/orders', 
    icon: ShoppingCart, 
    label: 'Orders' 
  },
  { 
    href: '/admin/users', 
    icon: Users, 
    label: 'Users' 
  },
  // { 
  //   href: '/admin/settings', 
  //   icon: Settings, 
  //   label: 'Settings' 
  // }
];

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  try {
    console.log("Entering admin layout");
    const user = await requireRole(['admin']);
    // console.log("Admin role verified for user:", user);

    if (!user) {
      console.log("No user found, redirecting to login");
      redirect('/login');
    }

    return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md fixed left-0 top-0 bottom-0 z-40">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {SIDEBAR_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition group"
                  >
                    <item.icon 
                      className="mr-3 text-gray-500 group-hover:text-primary transition" 
                      size={20} 
                    />
                    <span className="text-gray-700 group-hover:text-primary transition">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 bg-gray-50 overflow-y-auto">
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error in admin layout:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // If it's an authentication error, redirect to login
    if (error.message === 'Authentication required' || error.message === 'Unauthorized') {
      console.log("Authentication error, redirecting to login");
      redirect('/login');
    }
    
    // For other errors, throw them to be caught by error boundary
    throw error;
  }
}
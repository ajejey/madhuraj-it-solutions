// import { requireRole } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LucideLayoutDashboard, LucideBox, LucideUsers, LucideSettings } from 'lucide-react';
import Link from 'next/link';
import { requireRole } from '@/app/lib/auth';

const adminNavItems = [
  { 
    href: '/admin/products', 
    icon: LucideBox, 
    label: 'Products' 
  },
  { 
    href: '/admin/orders', 
    icon: LucideLayoutDashboard, 
    label: 'Orders' 
  },
  { 
    href: '/admin/users', 
    icon: LucideUsers, 
    label: 'Users' 
  },
  { 
    href: '/admin/settings', 
    icon: LucideSettings, 
    label: 'Settings' 
  }
];

export default async function AdminLayout({ children }) {
  try {
    // Verify admin role
    await requireRole(['admin']);

    return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        {/* <aside className="w-64 bg-white shadow-md">
          <nav className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
            <ul className="space-y-2">
              {adminNavItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition"
                  >
                    <item.icon className="mr-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside> */}

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    );
  } catch (error) {
    // Redirect to login if not authorized
    redirect('/login');
  }
}

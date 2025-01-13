'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  Edit, 
  CheckCircle 
} from 'lucide-react';
import { toast } from 'sonner';
import { updateUserRole } from '../../actions';

export default function UserDetailsView({ user }) {
  const [currentRole, setCurrentRole] = useState(user.role);
  const [isEditingRole, setIsEditingRole] = useState(false);

  const handleRoleChange = async (newRole) => {
    try {
      await updateUserRole(user.id, newRole);
      setCurrentRole(newRole);
      setIsEditingRole(false);
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* User Profile Section */}
      <div className="md:col-span-1 bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 mb-4">{user.email}</p>
          
          <div className="w-full">
            <div className="flex items-center gap-3 mb-3">
              <User className="h-5 w-5 text-gray-500" />
              <div className="flex-1 flex justify-between">
                <span>Role</span>
                {isEditingRole ? (
                  <div className="flex gap-2">
                    {['user', 'admin', 'support'].map(role => (
                      <button
                        key={role}
                        onClick={() => handleRoleChange(role)}
                        className={`px-2 py-1 text-xs rounded-full capitalize 
                          ${currentRole === role 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {role}
                      </button>
                    ))}
                    <button
                      onClick={() => setIsEditingRole(false)}
                      className="text-gray-500 hover:text-gray-700 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs capitalize 
                        ${currentRole === 'admin' 
                          ? 'bg-green-50 text-green-600' 
                          : 'bg-gray-50 text-gray-600'
                        }`}
                    >
                      {currentRole}
                    </span>
                    <button 
                      onClick={() => setIsEditingRole(true)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div className="flex-1 flex justify-between">
                <span>Email</span>
                <span className="text-gray-700">{user.email}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <div className="flex-1 flex justify-between">
                <span>Phone</span>
                <span className="text-gray-700">
                  {user.phoneNumber || 'Not provided'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-gray-500" />
              <div className="flex-1 flex justify-between">
                <span>Status</span>
                <span 
                  className={`px-2 py-1 rounded-full text-xs capitalize 
                    ${user.isActive 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-red-50 text-red-600'
                    }`}
                >
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Addresses Section */}
      <div className="md:col-span-1 bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-gray-500" />
          Addresses
        </h3>
        {user.addresses.length === 0 ? (
          <p className="text-gray-500 text-center">No addresses found</p>
        ) : (
          user.addresses.map((address, index) => (
            <div 
              key={index} 
              className={`border-b pb-4 mb-4 last:border-b-0 last:pb-0 
                ${address.isDefault ? 'bg-blue-50 p-3 rounded-lg' : ''}`}
            >
              {address.isDefault && (
                <div className="flex items-center text-blue-600 mb-2">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="text-xs">Default Address</span>
                </div>
              )}
              <p className="font-medium">{address.fullName}</p>
              <p>{address.addressLine1}</p>
              {address.addressLine2 && <p>{address.addressLine2}</p>}
              <p>
                {address.city}, {address.state} {address.pincode}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Recent Orders Section */}
      <div className="md:col-span-1 bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <ShoppingBag className="h-5 w-5 mr-2 text-gray-500" />
          Recent Orders
        </h3>
        {user.orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders found</p>
        ) : (
          user.orders.map((order) => (
            <Link 
              key={order.id} 
              href={`/admin/orders/${order.id}`}
              className="block border-b pb-4 mb-4 last:border-b-0 last:pb-0 hover:bg-gray-50 rounded-lg p-3 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  Order #{order.id.slice(-8)}
                </span>
                <span 
                  className={`px-2 py-1 rounded-full text-xs capitalize 
                    ${
                      order.orderStatus === 'delivered' 
                        ? 'bg-green-50 text-green-600'
                        : order.orderStatus === 'cancelled'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-yellow-50 text-yellow-600'
                    }`}
                >
                  {order.orderStatus}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span className="text-sm font-semibold">
                  ₹{order.totalAmount.toLocaleString()}
                </span>
              </div>
            </Link>
          ))
        )}
        {user.orders.length > 0 && (
          <Link 
            href={`/admin/orders?userId=${user.id}`} 
            className="block text-center text-blue-500 hover:text-blue-600 mt-4"
          >
            View All Orders
          </Link>
        )}
      </div>
    </div>
  );
}

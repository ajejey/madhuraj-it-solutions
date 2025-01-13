'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Edit, 
  Trash2, 
  Search, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { toast } from 'sonner';
import { updateUserRole, deleteUser, fetchUsers } from '../actions';

export default function UsersList({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers.users);
  const [pagination, setPagination] = useState(initialUsers.pagination);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    
    try {
      const updatedUser = await updateUserRole(userId, newRole);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: updatedUser.role } : user
      ));
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await fetchUsers(1, 10, searchTerm);
      setUsers(result.users);
      setPagination(result.pagination);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (newPage) => {
    setIsLoading(true);
    try {
      const result = await fetchUsers(newPage, 10, searchTerm);
      setUsers(result.users);
      setPagination(result.pagination);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm">
      {/* Search Bar */}
      <form 
        onSubmit={handleSearch} 
        className="p-4 border-b flex items-center gap-4"
      >
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Search users by name or email" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 disabled:opacity-50"
        >
          Search
        </button>
      </form>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-600">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-center">Role</th>
              <th className="px-6 py-3 text-center">Registered</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr 
                key={user.id} 
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 flex items-center gap-3">
                  <Link 
                    href={`/admin/users/${user.id}`} 
                    className="flex items-center gap-3 hover:bg-gray-100 rounded-lg p-2 -ml-2"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="text-blue-500" />
                    </div>
                    {user.name}
                  </Link>
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 text-center">
                  <span 
                    className={`px-3 py-1 rounded-full text-xs uppercase font-medium 
                      ${user.role === 'admin' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-gray-50 text-gray-600'
                      }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="p-2 hover:bg-blue-50 rounded-full text-blue-500 hover:text-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    {/* <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 hover:bg-red-50 rounded-full text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 flex justify-between items-center border-t">
        <p className="text-sm text-gray-500">
          Showing {(pagination.currentPage - 1) * 10 + 1} to{' '}
          {Math.min(pagination.currentPage * 10, pagination.totalUsers)} of{' '}
          {pagination.totalUsers} users
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1 || isLoading}
            className="px-3 py-2 bg-white border rounded-full hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages || isLoading}
            className="px-3 py-2 bg-white border rounded-full hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

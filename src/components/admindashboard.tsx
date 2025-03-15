import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Package, Bell, User, LogOut } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 p-6 w-64 h-full fixed md:relative z-20 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <h1 className="text-2xl font-bold text-green-500">CargoTrack</h1>
        <nav className="mt-10 space-y-6">
          {[
            { to: '/admin', icon: <Home />, label: 'Dashboard' },
            { to: '/admin/shipments', icon: <Package />, label: 'Shipments' },
            { to: '/admin/tracking', icon: <Package />, label: 'Tracking' },
            { to: '/admin/notifications', icon: <Bell />, label: 'Notifications' },
            { to: '/admin/profile', icon: <User />, label: 'Profile' }
          ].map((item, index) => (
            <Link key={index} to={item.to} className="flex items-center space-x-3 p-2 hover:text-green-400">
              {item.icon}
              <span className="block md:block">{item.label}</span>
            </Link>
          ))}
          <button onClick={handleLogout} className="flex items-center space-x-3 p-2 hover:text-red-400">
            <LogOut />
            <span className="block md:block">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-margin duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        <header className="bg-gray-800 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-green-500">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

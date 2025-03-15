import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Home, Package, Bell, User, LogOut } from 'lucide-react'; 


const CustomerDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleNavigationClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 h-full fixed md:relative z-20 shadow-lg transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-green-600">CargoTrack</h1>
        </div>
        <nav className="mt-10 space-y-6">
          {[{ to: '/customer', icon: <Home />, label: 'Dashboard' },
           { to: '/customer/profile', icon: <User />, label: 'Profile' },
            { to: '/customer/shipments', icon: <Package />, label: 'Shipments' },
            { to: '/customer/tracking', icon: <Package />, label: 'Tracking' },
            { to: '/customer/notifications', icon: <Bell />, label: 'Notifications' }
           ].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex items-center space-x-3 p-2 hover:bg-green-100 rounded-md text-gray-800"
              onClick={handleNavigationClick}
            >
              {item.icon}
              <span className="block md:block">{item.label}</span>
            </Link>
          ))}
          <button onClick={handleLogout} className="flex items-center space-x-3 p-2 hover:bg-red-100 rounded-md text-red-600">
            <LogOut />
            <span className="block md:block">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-margin duration-300 ${
          isSidebarOpen ? 'md:ml-64' : 'md:ml-0'
        }`}
      >
        <header className="bg-white shadow-md p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">Customer Dashboard</h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-gray-600"
          >
            {isSidebarOpen ? 'Close' : 'Open'} Menu
          </button>
        </header>

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:bg-green-50 transition duration-200">
              <h3 className="font-semibold text-lg text-gray-700">Your Shipments</h3>
              <p className="text-sm text-gray-500">Manage and view your shipments here.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:bg-blue-50 transition duration-200">
              <h3 className="font-semibold text-lg text-gray-700">Track Shipments</h3>
              <p className="text-sm text-gray-500">Track the status of your shipments.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500 hover:bg-yellow-50 transition duration-200">
              <h3 className="font-semibold text-lg text-gray-700">Notifications</h3>
              <p className="text-sm text-gray-500">See the latest updates and notifications.</p>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;

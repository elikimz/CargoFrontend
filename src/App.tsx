// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Home from './pages/home';
// import Login from './features/login/login';
// import RegisterPage from './features/register/register';
// import AdminDashboard from './components/admindashboard';
// import TrackingManagement from './features/tracking/tracking';
// import User from './features/users/users';
// // import Dashboard from './components/Dashboard'; // Create this component
// import CargoManagement from './features/cargo/cargo';
// import NotificationManagement from './features/notifications/notification';
// // import Profile from './components/Profile'; // Create this component

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
//   {
//     path: '/register',
//     element: <RegisterPage />,
//   },
//   {
//     path: '/admin',
//     element: <AdminDashboard />,
//     children: [
//       // {
//       //   path: 'dashboard',
//       //   element: <Dashboard />,
//       // },
//       {
//         path: 'shipments',
//         element: <CargoManagement />,
//       },
//       {
//         path: 'tracking',
//         element: <TrackingManagement/>,
//       },
//       {
//         path: 'notifications',
//         element: <NotificationManagement />,
//       },
//       {
//         path: 'profile',
//         element: <User />,
//       },
//       {
//         path: '',
//         element: <h2>Welcome to the Admin Dashboard</h2>,
//       },
//     ],
//   },
// ]);

// const App: React.FC = () => {
//   return <RouterProvider router={router} />;
// };

// export default App;


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Login from './features/login/login';
import RegisterPage from './features/register/register';
import AdminDashboard from './components/admindashboard';
import CustomerDashboard from './components/customerdashboard'; // Add the customer dashboard component
import TrackingManagement from './features/tracking/tracking';
import User from './features/users/users';
import CargoManagement from './features/cargo/cargo';
import NotificationManagement from './features/notifications/notification';
import UserProfile from './pages/customerprofile';
import CustomerCargo from './pages/customercargo';
import Tracking from './pages/tracking';
import About from './pages/About';
import ServicesPage from './pages/services';
import ContactPage from './pages/contact';




const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/about',
    element: <About/>,
  },
  {
    path: '/services',
    element: <ServicesPage/>,
  },
  {
    path: '/contact',
    element: <ContactPage/>,
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
    children: [
      {
        path: 'shipments',
        element: <CargoManagement />,
      },
      {
        path: 'tracking',
        element: <TrackingManagement />,
      },
      {
        path: 'notifications',
        element: <NotificationManagement />,
      },
      {
        path: 'profile',
        element: <User />,
      },
      {
        path: '',
        element: <h2>Welcome to the Admin Dashboard</h2>,
      },
    ],
  },
  {
    path: '/customer',
    element: <CustomerDashboard />, // Link to the customer dashboard component
    children: [
      {
        path: 'shipments',
        element: <CustomerCargo />, // Manage customer's cargo/shipments
      },
      {
        path: 'tracking',
        element: <Tracking />, // Track the shipments
      },
      {
        path: 'notifications',
        element: <NotificationManagement />, // Show customer notifications
      },
      {
        path: 'profile',
        element: <UserProfile />, // Customer's profile page
      },
      {
        path: '',
        element: <h2>Welcome to the Customer Dashboard</h2>, // Default view when no child route is selected
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;

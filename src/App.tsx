import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Login from './features/login/login';
import RegisterPage from './features/register/register';
import AdminDashboard from './components/admindashboard';
import TrackingManagement from './features/tracking/tracking';
// import Dashboard from './components/Dashboard'; // Create this component
import CargoManagement from './features/cargo/cargo';
import NotificationManagement from './features/notifications/notification';
// import Profile from './components/Profile'; // Create this component

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
    path: '/admin',
    element: <AdminDashboard />,
    children: [
      // {
      //   path: 'dashboard',
      //   element: <Dashboard />,
      // },
      {
        path: 'shipments',
        element: <CargoManagement />,
      },
      {
        path: 'tracking',
        element: <TrackingManagement/>,
      },
      {
        path: 'notifications',
        element: <NotificationManagement />,
      },
      {
        path: '',
        element: <h2>Welcome to the Admin Dashboard</h2>,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;

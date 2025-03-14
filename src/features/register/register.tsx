import React, { useState } from 'react';
import { useRegisterUserMutation } from "../register/registerAPI";
import { Mail, Lock, User, Phone, MapPin, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
    phone_number: '',
    address: '',
  });

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-t-4 border-green-600">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Cargo Management Register</h2>
          <form onSubmit={handleSubmit}>
            {[ 
              { id: 'name', label: 'Name', icon: <User />, type: 'text' },
              { id: 'email', label: 'Email', icon: <Mail />, type: 'email' },
              { id: 'password', label: 'Password', icon: <Lock />, type: 'password' },
              { id: 'phone_number', label: 'Phone Number', icon: <Phone />, type: 'text' },
              { id: 'address', label: 'Address', icon: <MapPin />, type: 'text' },
            ].map((field) => (
              <div key={field.id} className="mb-4">
                <label htmlFor={field.id} className="block text-gray-700 font-medium">{field.label}</label>
                <div className="relative">
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                  <div className="absolute right-3 top-3 text-gray-400">
                    {field.icon}
                  </div>
                </div>
              </div>
            ))}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors duration-300"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-green-600 hover:underline flex items-center justify-center">
              <ChevronLeft size={16} className="mr-1" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
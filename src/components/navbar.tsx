import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg w-full z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-extrabold text-green-700">
              CargoTrack
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-lg text-gray-800 hover:text-green-700">
              Home
            </Link>
            <Link to="/about" className="text-lg text-gray-800 hover:text-green-700">
              About
            </Link>
            <Link to="/services" className="text-lg text-gray-800 hover:text-green-700">
              Services
            </Link>
            <Link to="/contact" className="text-lg text-gray-800 hover:text-green-700">
              Contact
            </Link>
            <Link
              to="/login"
              className="text-lg text-gray-800 border border-green-700 px-4 py-1 rounded hover:bg-green-700 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-lg text-gray-800 border border-green-700 px-4 py-1 rounded hover:bg-green-700 hover:text-white"
            >
              Register
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-md absolute w-full">
          <Link to="/" className="block px-6 py-3 text-lg text-gray-800 hover:bg-gray-200">
            Home
          </Link>
          <Link to="/about" className="block px-6 py-3 text-lg text-gray-800 hover:bg-gray-200">
            About
          </Link>
          <Link to="/services" className="block px-6 py-3 text-lg text-gray-800 hover:bg-gray-200">
            Services
          </Link>
          <Link to="/contact" className="block px-6 py-3 text-lg text-gray-800 hover:bg-gray-200">
            Contact
          </Link>
          <Link to="/login" className="block px-6 py-3 text-lg text-gray-800 hover:bg-gray-200">
            Login
          </Link>
          <Link to="/register" className="block px-6 py-3 text-lg text-gray-800 hover:bg-gray-200">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

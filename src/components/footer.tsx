import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold">CargoTrack</h2>
          <p className="mt-2 text-sm">
            Reliable cargo tracking solutions for your business. Track your shipments with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="#" className="hover:text-green-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-300">
                Track Shipment
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-300">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-300">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center">
              <MapPin size={18} className="mr-2 hover:text-green-300" />
              Nairobi, Kenya
            </li>
            <li className="flex items-center">
              <Phone size={18} className="mr-2 hover:text-green-300" />
              +254 712 345 678
            </li>
            <li className="flex items-center">
              <Mail size={18} className="mr-2 hover:text-green-300" />
              support@cargotrack.com
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="border-t border-green-600 mt-8 pt-6 text-center">
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-green-300">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-green-300">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-green-300">
            <Linkedin size={20} />
          </a>
        </div>
        <p className="mt-4 text-sm">
          &copy; {new Date().getFullYear()} CargoTrack. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

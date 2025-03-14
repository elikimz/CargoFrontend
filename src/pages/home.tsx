

import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-green-700 text-white h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to CargoTrack</h1>
          <p className="text-xl mb-8">
            Reliable, efficient, and real-time cargo tracking for your business.
          </p>
          <Link
            to="/tracking"
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full text-lg font-semibold"
          >
            Track Your Shipment
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg shadow-md">
              <img
                src="https://www.locate2u.com/wp-content/uploads/A-1-29.webp"
                alt="Real-time Tracking"
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">Get live updates on your cargo's location and status.</p>
            </div>
            <div className="text-center p-6 border rounded-lg shadow-md">
              <img
                src="https://odsglobal.com/wp-content/uploads/2024/05/how-to-build-an-efficient-logistics-network.jpg"
                alt="Efficient Logistics"
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2">Efficient Logistics</h3>
              <p className="text-gray-600">Streamline your shipping operations with our advanced system.</p>
            </div>
            <div className="text-center p-6 border rounded-lg shadow-md">
              <img
                src="https://images.examples.com/wp-content/uploads/2017/06/Delivery-Order-Examples-Samples1.jpg"
                alt="Fast Delivery"
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Ensure timely delivery with precise tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose CargoTrack?</h2>
            <p className="text-gray-600 mb-6">
              CargoTrack offers a seamless solution for managing and tracking shipments in real time. With our intuitive dashboard and advanced technology, you can monitor your cargo's journey from origin to destination.
            </p>
            <Link
              to="/contact"
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full text-lg font-semibold"
            >
              Get in Touch
            </Link>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://www.emotrans-global.com/wp-content/uploads/2023/01/01-cargo-vs-freight.jpg"
              alt="Cargo Tracking"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

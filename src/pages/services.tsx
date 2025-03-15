import Navbar from "../components/navbar";
import Footer from "../components/footer";

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At <span className="font-semibold">SwiftCargo</span>, we provide a range of cargo and logistics services to ensure smooth and efficient transportation of goods worldwide. Our expertise guarantees timely and secure delivery for businesses of all sizes.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">What We Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Freight Transportation</h4>
              <p className="text-gray-600 mt-2">Safe and reliable freight services across various regions.</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Warehousing Solutions</h4>
              <p className="text-gray-600 mt-2">Secure storage facilities for short and long-term needs.</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Customs Clearance</h4>
              <p className="text-gray-600 mt-2">Hassle-free customs and regulatory compliance services.</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Express Delivery</h4>
              <p className="text-gray-600 mt-2">Fast and secure delivery for time-sensitive shipments.</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">International Shipping</h4>
              <p className="text-gray-600 mt-2">Global logistics solutions tailored for international clients.</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Cargo Insurance</h4>
              <p className="text-gray-600 mt-2">Protecting your goods with comprehensive insurance plans.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-200 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">24/7 Support</h4>
              <p className="text-gray-600 mt-2">Round-the-clock assistance for all logistics inquiries.</p>
            </div>
            <div className="bg-green-200 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Real-Time Tracking</h4>
              <p className="text-gray-600 mt-2">Monitor your shipments with our advanced tracking system.</p>
            </div>
            <div className="bg-green-200 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Cost-Effective</h4>
              <p className="text-gray-600 mt-2">Competitive pricing without compromising quality.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ServicesPage;

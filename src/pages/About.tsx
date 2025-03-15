import Navbar from "../components/navbar";
import Footer from "../components/footer";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At <span className="font-semibold">SwiftCargo</span>, we redefine cargo management by providing seamless, efficient, and reliable logistics solutions. Our mission is to ensure that businesses and individuals can move goods swiftly and securely across regions with real-time tracking and transparency.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">Our Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-200 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">10+ Years in Service</h4>
              <p className="text-gray-600 mt-2">Delivering excellence in cargo transportation for over a decade.</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">500K+ Deliveries</h4>
              <p className="text-gray-600 mt-2">Ensuring on-time and safe delivery for thousands of satisfied clients.</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Global Reach</h4>
              <p className="text-gray-600 mt-2">Expanding networks to connect businesses worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">Our Legacy</h3>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Founded with a vision to transform logistics, SwiftCargo has grown into a trusted name in the cargo industry. From humble beginnings to becoming a leading player in the market, our journey is built on reliability, innovation, and a commitment to excellence.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">Awards & Recognition</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-yellow-200 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Best Logistics Company 2023</h4>
              <p className="text-gray-600 mt-2">Awarded for excellence in cargo transportation.</p>
            </div>
            <div className="bg-yellow-200 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Innovation in Freight Management</h4>
              <p className="text-gray-600 mt-2">Recognized for cutting-edge logistics solutions.</p>
            </div>
            <div className="bg-yellow-200 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Customer Satisfaction Award</h4>
              <p className="text-gray-600 mt-2">Rated #1 for exceptional service and reliability.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;

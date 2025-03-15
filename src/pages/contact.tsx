import { useState, ChangeEvent, FormEvent } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  // Explicitly type the event parameter
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = (e: FormEvent) => {
    e.preventDefault();
    
    const { name, email, message } = formData;
    const subject = encodeURIComponent("New Message from Contact Page");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:elijahkimani1293@gmail.com?subject=${subject}&body=${body}`;

    setSent(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => {
      setSent(false);
    }, 5000);
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have a question or need assistance? Send us an email, and we’ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-lg">
          <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">Send a Message</h3>
          <form onSubmit={handleSendEmail} className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Your Message"
                rows={4} // ✅ Fixed: Now using a number
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

          {sent && (
            <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center">
              ✅ Your message has been sent! Check your email client to confirm.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactPage;

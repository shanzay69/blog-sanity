 "use client";
import { useState } from "react";
import Image from "next/image";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () =>
    formData.name && formData.email && formData.message && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus("Sab fields bharna zaroori hain ya email galat hai.");
      return;
    }
    setStatus("Sending...");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message successfully bheja gaya!");
        setFormData({ name: "", email: "", message: "" }); 
        setTimeout(() => setStatus(""), 2000); 
      } else {
        const { error } = await response.json();
        setStatus(error || "Kuch galat hua, dobara koshish karein.");
      }
    } catch (error) {
      setStatus("Message bhejne mein error. Dobara koshish karein.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gray-400">
      <div className="z-10 flex flex-col lg:flex-row items-center lg:space-x-20 bg-white rounded-lg shadow-lg px-8 py-12 lg:py-16 w-11/12 max-w-5xl transition duration-300 transform hover:scale-110">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
          <Image
            src="/images/contact.png"
            alt="contact"
            layout="responsive"
            width={100}
            height={50}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 text-center lg:text-left mb-6 transition duration-300 transform hover:scale-110">
            Get in Touch
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-6 bg-purple-600 text-white font-semibold rounded-md shadow-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </form>
          {status && (
            <div
              className={`mt-4 text-center text-sm ${
                status.includes("successfully") ? "text-green-600" : "text-red-600"
              }`}
            >
              {status}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;

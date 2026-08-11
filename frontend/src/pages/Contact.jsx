import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
} from "lucide-react";
import toast from "react-hot-toast";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }

    toast.success("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}

      <section className="relative overflow-hidden">

        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <p className="text-yellow-400 uppercase tracking-[0.4em] text-sm font-semibold">
              Get In Touch
            </p>

            <h1 className="text-5xl md:text-6xl font-bold mt-5">
              Contact
              <span className="text-yellow-400"> KDX.</span>
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg mt-6 leading-8">
              Have a question, need help with an order, or simply
              want to talk to us? We'd love to hear from you.
            </p>

          </motion.div>

        </div>

      </section>

      {/* Contact Section */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Information */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
          >

            <div className="mb-10">

              <h2 className="text-3xl md:text-4xl font-bold">
                Let's talk.
              </h2>

              <p className="text-gray-400 leading-7 mt-5">
                Our team is here to help you with questions about
                products, orders, accounts, or anything related to
                your KDX experience.
              </p>

            </div>

            <div className="space-y-5">

              {/* Email */}

              <div className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6 flex items-center gap-5 hover:border-yellow-500/30 transition">

                <div className="w-14 h-14 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">

                  <Mail
                    size={25}
                    className="text-yellow-400"
                  />

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Email
                  </p>

                  <p className="text-lg font-medium mt-1">
                    support@kdx.com
                  </p>

                </div>

              </div>

              {/* Phone */}

              <div className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6 flex items-center gap-5 hover:border-yellow-500/30 transition">

                <div className="w-14 h-14 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">

                  <Phone
                    size={25}
                    className="text-yellow-400"
                  />

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Phone
                  </p>

                  <p className="text-lg font-medium mt-1">
                    +91 98765 43210
                  </p>

                </div>

              </div>

              {/* Location */}

              <div className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6 flex items-center gap-5 hover:border-yellow-500/30 transition">

                <div className="w-14 h-14 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">

                  <MapPin
                    size={25}
                    className="text-yellow-400"
                  />

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Location
                  </p>

                  <p className="text-lg font-medium mt-1">
                    India
                  </p>

                </div>

              </div>

            </div>

          </motion.div>

          {/* Contact Form */}

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="bg-[#0d0d0d] border border-zinc-800 rounded-3xl p-8 md:p-10"
          >

            <div className="flex items-center gap-4 mb-8">

              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">

                <MessageCircle
                  className="text-yellow-400"
                  size={24}
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Send us a message
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  We'll get back to you soon.
                </p>

              </div>

            </div>

            <div className="space-y-5">

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-white outline-none focus:border-yellow-500 transition"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-white outline-none focus:border-yellow-500 transition"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={6}
                className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-white outline-none resize-none focus:border-yellow-500 transition"
              />

              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition"
              >
                <Send size={18} />
                Send Message
              </button>

            </div>

          </motion.form>

        </div>

      </section>

    </div>
  );
}

export default Contact;
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaPaperPlane,
} from "react-icons/fa";

const contactInfo = [
  { icon: FaEnvelope, text: "faalodev@gmail.com", href: "mailto:faalodev@gmail.com" },
  { icon: FaPhone, text: "+6288291079026", href: "tel:+6288291079026" },
  { icon: FaMapMarkerAlt, text: "Indonesia", href: null },
];

const socialLinks = [
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaGithub, href: "https://github.com/vellumgracia-del", label: "GitHub" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("success");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setFormStatus("idle"), 3000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 section-gradient"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-white text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Get In <span className="gradient-text">Touch</span>
        </motion.h2>

        <motion.p
          className="text-gray-500 text-center mb-16 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Let&apos;s collaborate! I am always open to discussing exciting projects and new opportunities.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-6 mb-10">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <motion.div
                  key={text}
                  className="flex items-center space-x-4 group"
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600/20 transition-colors">
                    <Icon className="text-lg" />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-gray-300 text-lg hover:text-indigo-400 transition-colors"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-gray-300 text-lg">{text}</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-indigo-600/10 hover:border-indigo-500/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                >
                  <Icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: "name", type: "text", placeholder: "Your Name" },
              { name: "email", type: "email", placeholder: "Your Email" },
            ].map((field) => (
              <motion.div key={field.name} whileFocus={{ scale: 1.01 }}>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-5 py-3.5 bg-[#0d0d14] border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 placeholder-gray-600 transition-all duration-300"
                />
              </motion.div>
            ))}

            <textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              required
              className="w-full px-5 py-3.5 bg-[#0d0d14] border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 placeholder-gray-600 transition-all duration-300 resize-none"
            />

            <motion.button
              type="submit"
              className="w-full relative group px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaPaperPlane />
                SEND MESSAGE
              </span>
            </motion.button>

            {formStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center text-green-400 py-2 px-4 bg-green-500/10 rounded-lg border border-green-500/20"
              >
                ✨ Message sent successfully! (Demo)
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

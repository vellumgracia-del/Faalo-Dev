"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="relative py-10 border-t border-white/5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          className="text-gray-600 text-sm"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-gray-400">Faalo-dev</span>. {" "}
          <span className="text-indigo-400"></span>
        </motion.p>
      </div>
    </motion.footer>
  );
}

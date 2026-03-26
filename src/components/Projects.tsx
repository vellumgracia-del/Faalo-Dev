"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  gradient: string;
  icon: string;
  image?: any;
}

interface ProjectsProps {
  projects: Project[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Projects({ projects = [] }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col justify-center items-center py-24 px-4 sm:px-6 lg:px-8"
    >
      <motion.h2
        className="text-4xl lg:text-5xl font-bold text-white text-center mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        My <span className="gradient-text">Projects</span>
      </motion.h2>

      <motion.p
        className="text-gray-500 text-center mb-16 max-w-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        A collection of projects I&apos;ve built, from web applications to management systems.
      </motion.p>

      <motion.div
        className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {projects.map((project) => (
          <motion.div
            key={project._id}
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative bg-[#0d0d14] border border-white/5 rounded-2xl overflow-hidden"
          >
            {/* Card Top Gradient or Image */}
            <div
              className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
            >
              {project.image ? (
                <Image
                  src={urlForImage(project.image).url()}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <>
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                  }} />
                  <motion.span
                    className="text-6xl relative z-10"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {project.icon}
                  </motion.span>
                </>
              )}

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors duration-500" />
            </div>

            {/* Card Body */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-500 text-sm mb-5 line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600/20 text-indigo-300 rounded-lg border border-indigo-500/20 hover:bg-indigo-600/30 hover:border-indigo-500/40 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt className="text-xs" />
                  Live Demo
                </motion.a>
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-white/5 text-gray-400 rounded-lg border border-white/5 hover:bg-white/10 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub />
                  Code
                </motion.a>
              </div>
            </div>

            {/* Bottom Gradient Line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

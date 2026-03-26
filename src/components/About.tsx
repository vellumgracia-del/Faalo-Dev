"use client";

import { motion, type Variants } from "framer-motion";
import { type IconType } from "react-icons";
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact,
  SiNextdotjs, SiNodedotjs, SiGit, SiFirebase, SiTailwindcss,
} from "react-icons/si";
import { FaMobileAlt, FaPaintBrush } from "react-icons/fa";

interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

const skills: Skill[] = [
  { name: "HTML5", icon: SiHtml5, color: "#E44D26" },
  { name: "CSS3", icon: SiCss, color: "#2965f1" },
  { name: "JavaScript", icon: SiJavascript, color: "#F0DB4F" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Responsive", icon: FaMobileAlt, color: "#818CF8" },
  { name: "UI/UX", icon: FaPaintBrush, color: "#A78BFA" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
];

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const badgeVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 section-gradient"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-white text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          About <span className="gradient-text">Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Description & Skills */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              I&apos;m faalo, a computer science student exploring diverse fields of
              technology — from software and web development to artificial intelligence
              solutions. My goal is to continuously grow my skills and expand my
              horizons.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-6">
              Skills & Technologies
            </h3>

            <motion.div
              className="flex flex-wrap gap-3"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {skills.map((skill) => {
                const IconComp = skill.icon;
                return (
                  <motion.span
                    key={skill.name}
                    variants={badgeVariant}
                    className="skill-badge inline-flex items-center gap-2 bg-white/5 text-gray-300 px-4 py-2 rounded-lg font-medium border border-white/5 cursor-default"
                    whileHover={{ scale: 1.08, borderColor: `${skill.color}40` }}
                  >
                    <motion.span
                      style={{ color: skill.color }}
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
                    >
                      <IconComp size={16} />
                    </motion.span>
                    {skill.name}
                  </motion.span>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right: Code Snippet */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="relative group">
              {/* Glow Effect Behind Card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-[#0d0d14] border border-white/10 rounded-xl p-6 font-mono text-sm overflow-hidden">
                {/* Window Dots */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-gray-600">developer.ts</span>
                </div>

                <pre className="text-gray-400 leading-relaxed">
                  <code>
                    <span className="text-gray-600">{"// "} about me</span>{"\n"}
                    <span className="text-purple-400">const</span> developer{" "}
                    <span className="text-indigo-400">=</span> {"{"}{"\n"}
                    {"  "}<span className="text-blue-400">name</span>:{" "}
                    <span className="text-green-400">&apos;faalo&apos;</span>,{"\n"}
                    {"  "}<span className="text-blue-400">role</span>:{" "}
                    <span className="text-green-400">&apos;CS Student&apos;</span>,{"\n"}
                    {"  "}<span className="text-blue-400">passion</span>:{" "}
                    <span className="text-green-400">&apos;Building & innovating&apos;</span>,{"\n"}
                    {"};"}{"\n\n"}
                    <span className="text-purple-400">const</span> goals{" "}
                    <span className="text-indigo-400">=</span> [{"\n"}
                    {"  "}<span className="text-green-400">&apos;Build cool stuff&apos;</span>,{"\n"}
                    {"  "}<span className="text-green-400">&apos;Learn everyday&apos;</span>,{"\n"}
                    {"  "}<span className="text-green-400">&apos;Collaborate & grow&apos;</span>,{"\n"}
                    ];
                  </code>
                </pre>

                {/* Decorative Gradient Line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

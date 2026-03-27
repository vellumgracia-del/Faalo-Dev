"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaGithub, FaDownload } from "react-icons/fa";
import { SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiGit } from "react-icons/si";
import { type IconType } from "react-icons";

const words = ["Problem Solver", "Code Explorer", "AI Explorer", "Innovator"];

interface FloatingIcon {
  icon: IconType;
  color: string;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  delay: number;
  size: number;
}

const floatingIcons: FloatingIcon[] = [
  { icon: SiHtml5, color: "#E44D26", top: "10%", left: "8%", delay: 0, size: 50 },
  { icon: SiCss, color: "#2965f1", bottom: "20%", left: "5%", delay: 2, size: 55 },
  { icon: SiJavascript, color: "#F0DB4F", bottom: "25%", right: "8%", delay: 1, size: 45 },
  { icon: SiReact, color: "#61DAFB", top: "50%", left: "2%", delay: 3, size: 48 },
  { icon: SiNextdotjs, color: "#ffffff", top: "-2%", right: "30%", delay: 5, size: 52 },
  { icon: SiTypescript, color: "#3178C6", top: "20%", right: "3%", delay: 4, size: 46 },
  { icon: SiNodedotjs, color: "#339933", bottom: "10%", right: "30%", delay: 1.5, size: 44 },
  { icon: SiGit, color: "#F05032", top: "5%", left: "35%", delay: 3.5, size: 42 },
];

function useTypingAnimation(wordList: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = wordList[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % wordList.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentWord.substring(0, text.length - 1)
              : currentWord.substring(0, text.length + 1)
          );
        },
        isDeleting ? 80 : 150
      );
    }

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, wordList]);

  return text;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const count = Math.min(60, Math.floor(canvas.width / 20));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const cleanup = animate();
    const handleResize = () => animate();
    window.addEventListener("resize", handleResize);
    return () => {
      cleanup?.();
      window.removeEventListener("resize", handleResize);
    };
  }, [animate]);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const typedText = useTypingAnimation(words);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.12)_0%,_transparent_70%)]" />
      <ParticleCanvas />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Column: Text */}
        <motion.div
          className="text-center md:text-left md:order-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-lg text-gray-500 tracking-wider uppercase"
          >
            Hello, I&apos;m faalo
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-3 mb-5 min-h-[4rem]"
          >
            <span className="gradient-text typing-cursor">{typedText}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed"
          >
            Expanding skills and discovering new ways to innovate.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center md:items-start gap-4"
          >
            <motion.a
              href="#"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FaDownload className="relative z-10" />
              <span className="relative z-10">Download CV</span>
            </motion.a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex justify-center md:justify-start space-x-6"
          >
            {[
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/zulfa-fahmiy-924a19362?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
              { icon: FaInstagram, href: "https://www.instagram.com/z.faalo?igsh=NjZrejIxcm85OWFv", label: "Instagram" },
              { icon: FaGithub, href: "https://github.com/vellumgracia-del", label: "GitHub" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-3xl text-gray-500 hover:text-indigo-400 transition-colors duration-300"
                whileHover={{ scale: 1.3, y: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Avatar & Floating Icons */}
        <motion.div
          className="relative flex justify-center items-center h-80 sm:h-96 md:order-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          {/* Avatar */}
          <motion.div
            className="relative z-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-indigo-500/50 glow-indigo relative group">
              <Image 
                src="/profile.jpg"
                alt="Profile"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Floating Tech Icons */}
          {floatingIcons.map((item, i) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={i}
                className={`absolute ${i % 2 === 0 ? "float-anim" : "float-anim-reverse"}`}
                style={{
                  top: item.top,
                  left: item.left,
                  bottom: item.bottom,
                  right: item.right,
                  animationDelay: `${-item.delay}s`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
              >
                <div
                  className="rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10"
                  style={{
                    width: item.size,
                    height: item.size,
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                  }}
                >
                  <IconComp size={item.size * 0.5} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

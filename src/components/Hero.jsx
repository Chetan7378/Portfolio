import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, DownloadCloud } from "lucide-react";

const Hero = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-dark-bg">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          animate={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-neon-purple/20 rounded-full blur-[120px] animate-pulse-slow"
        />
        <motion.div
          animate={{ x: mousePosition.x, y: mousePosition.y }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-neon-blue/20 rounded-full blur-[120px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Particles Layer */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 100 + "%"}
              cy={Math.random() * 100 + "%"}
              r={Math.random() * 2 + 1}
              fill="#fff"
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.5, 0],
                y: [0, -20],
                x: [0, Math.random() * 10 - 5],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-neon-blue font-mono mb-4 tracking-wider">
            HELLO, WORLD
          </h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold mb-6 tracking-tight"
        >
          I Build{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink animate-gradient-x">
            Smart, Efficient Digital Experiences
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Backend & AI developer focused on building intelligent, accessible,
          and human-centered systems using Java, Python, FastAPI, and modern AI
          tools.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-transparent border border-neon-blue text-neon-blue hover:bg-neon-blue/10 rounded-sm font-mono transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.3)]"
          >
            View Work
          </a>
          <a
            href="/chetan_shivade_AI_DEV.pdf"
            download
            className="px-8 py-4 bg-transparent border border-neon-green text-neon-green hover:bg-neon-green/10 rounded-sm font-mono transition-all duration-300 hover:shadow-[0_0_20px_rgba(10,255,0,0.12)] flex items-center gap-2"
          >
            <DownloadCloud size={18} /> Resume
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-sm font-mono transition-all duration-300"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="text-gray-500" size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;

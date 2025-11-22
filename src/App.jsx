import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const mouseEnter = () => setCursorVariant("text");
    const mouseLeave = () => setCursorVariant("default");
    const mouseDown = () => setCursorVariant("click");
    const mouseUp = () => setCursorVariant("default");

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    // Add hover listeners to all interactive elements
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, .project-card");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", mouseEnter);
      el.addEventListener("mouseleave", mouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", mouseEnter);
        el.removeEventListener("mouseleave", mouseLeave);
      });
    };
  }, []); // Note: In a real app, you might want to use a MutationObserver to attach listeners to new elements

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "transparent",
      border: "2px solid #00f3ff",
      mixBlendMode: "difference"
    },
    text: {
      height: 80,
      width: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: "rgba(0, 243, 255, 0.1)",
      border: "2px solid #00f3ff",
      mixBlendMode: "screen"
    },
    click: {
      height: 24,
      width: 24,
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      backgroundColor: "#00f3ff",
      border: "2px solid #00f3ff",
      mixBlendMode: "difference"
    }
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      backgroundColor: "#00f3ff"
    },
    text: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      backgroundColor: "#bc13fe"
    },
    click: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      backgroundColor: "#fff"
    }
  };

  return (
    <div className="bg-dark-bg min-h-screen text-white selection:bg-neon-blue selection:text-black cursor-none">
      {/* Custom Cursor - Hidden on touch devices via CSS media query in index.css usually, but we can also conditionally render */}
      <div className="hidden md:block pointer-events-none fixed z-[9999] top-0 left-0">
        <motion.div
          className="rounded-full fixed top-0 left-0"
          variants={variants}
          animate={cursorVariant}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full fixed top-0 left-0"
          variants={dotVariants}
          animate={cursorVariant}
          transition={{ type: "spring", stiffness: 1000, damping: 50 }}
        />
      </div>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React from "react";
import { Github, Linkedin, Twitter, Heart, X } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark-card py-8 border-t border-glass-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-4">
        <div className="flex space-x-6">
          <a
            href="https://github.com/Chetan7378"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-neon-blue transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/chetan-shivade-b84aa7221/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-neon-blue transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://x.com/chetan_shivade5"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-neon-blue transition-colors"
          >
            <X size={20} />
          </a>
        </div>

        <p className="text-gray-500 text-sm font-mono text-center leading-relaxed flex flex-wrap justify-center gap-1">
          Designed & Built with{" "}
          <Heart size={14} className="inline text-neon-pink fill-neon-pink" />{" "}
          <span className="w-full sm:w-auto text-center">
            by Chetan Shivade © {new Date().getFullYear()}
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { motion } from "framer-motion";
import {
  Layout,
  Server,
  BrainCircuit,
  Terminal,
  Database,
  Code2,
} from "lucide-react";

const skills = [
  {
    name: "Frontend",
    icon: Layout,
    level: 90,
    items: ["React", "JavaScript", "TypeScript", "TailwindCSS", "HTML", "CSS"],
  },
  {
    name: "Backend",
    icon: Server,
    level: 95,
    items: ["Java", "Python", "FastAPI", "Spring Boot", "PostgreSQL", "MySQL"],
  },
  {
    name: "AI & ML",
    icon: BrainCircuit,
    level: 90,
    items: [
      "RAG",
      "LangChain",
      "HuggingFace",
      "VectorDB",
      "LLMs",
      "Prompt Engineering",
    ],
  },
  {
    name: "DevOps",
    icon: Terminal,
    level: 75,
    items: [
      "GitLab CI/CD",
      "Docker",
      "Linux",
      "Azure",
      "Nginx",
      "Model Deployment",
    ],
  },
];
const About = () => {
  return (
    <section id="about" className="py-20 bg-dark-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
            <span className="text-neon-purple">01.</span> About Me
          </h2>
          <div className="h-1 w-20 bg-neon-purple rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Hello! My name is{" "}
              <span className="text-neon-blue">Chetan Shivade</span> and I love
              building things that live on the internet. My journey into
              development began back in college when I started experimenting
              with Java and solving DSA problems — turns out breaking down logic
              and building clean systems is pretty fun!
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Fast-forward to today, and I’ve had the opportunity to work across
              diverse domains, from{" "}
              <span className="text-neon-pink">internal automation </span>to{" "}
              <span className="text-neon-green">AI-driven applications</span>,
              and a <span className="text-neon-purple">huge corporation</span>.
              My main focus now is creating reliable, scalable, and user-centric
              backend systems and tools. I enjoy working with Java, Python,
              FastAPI, and modern databases to bring ideas to life through clean
              architecture and thoughtful engineering.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="p-6 bg-glass-100 border border-glass-200 rounded-lg overflow-hidden hover:border-neon-green/50 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(10,255,0,0.1)] cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <skill.icon className="w-8 h-8 text-neon-green group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold group-hover:text-neon-green transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="text-neon-green font-mono">
                    {skill.level}%
                  </span>
                </div>

                <div className="h-2 bg-dark-bg rounded-full overflow-hidden mb-4 border border-glass-200">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.5 + index * 0.1,
                      ease: "easeOut",
                    }}
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                  />
                </div>

                <ul className="space-y-1">
                  {skill.items.map((item) => (
                    <li
                      key={item}
                      className="text-gray-400 text-sm flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-neon-purple rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

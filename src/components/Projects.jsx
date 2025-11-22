import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Maximize2 } from "lucide-react";
import projectsData from "../data/projects.json";

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ["All", ...new Set(projectsData.map((p) => p.category))];

  const filteredProjects =
    filter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 bg-dark-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
            <span className="text-neon-green">02.</span> Some Things I've Built
          </h2>
          <div className="h-1 w-20 bg-neon-green rounded-full mb-8" />

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
                  filter === cat
                    ? "bg-neon-green/20 text-neon-green border border-neon-green"
                    : "bg-glass-100 text-gray-400 border border-transparent hover:border-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-glass-100 rounded-xl overflow-hidden border border-glass-200 hover:border-neon-green/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(10,255,0,0.1)]"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"; // Fallback image
                    }}
                  />
                  <div className="absolute inset-0 bg-dark-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-mono flex items-center gap-2">
                      <Maximize2 size={20} /> View Details
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-neon-green text-xs font-mono mb-2 block">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-neon-green transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={18} />
                      </a>
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-xs text-gray-500 bg-glass-200 px-2 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs text-gray-500 bg-glass-200 px-2 py-1 rounded">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-dark-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-glass-200 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-glass-200 rounded-full hover:bg-glass-300 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-full relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent md:bg-gradient-to-r" />
                </div>

                <div className="p-8">
                  <span className="text-neon-green font-mono text-sm mb-2 block">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-3xl font-bold mb-4">
                    {selectedProject.title}
                  </h2>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 bg-glass-100 text-neon-blue text-sm rounded-full border border-neon-blue/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-neon-green/10 text-neon-green border border-neon-green py-3 rounded-lg hover:bg-neon-green/20 transition-colors font-mono"
                    >
                      <ExternalLink size={18} /> Live Demo
                    </a>
                    <a
                      href={selectedProject.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-glass-100 text-white border border-glass-200 py-3 rounded-lg hover:bg-glass-200 transition-colors font-mono"
                    >
                      <Github size={18} /> Source Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

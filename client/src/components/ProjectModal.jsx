import { X, Github, ExternalLink, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative"
        >
          
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors z-10">
            <X size={24} className="text-slate-500 dark:text-slate-300" />
          </button>

          {/* Media Section */}
          <div className="h-64 sm:h-80 w-full bg-slate-100 dark:bg-slate-800 relative">
            {project.image && (project.image.includes('video') || project.image.includes('.mp4')) ? (
              <video src={project.image} controls className="w-full h-full object-contain bg-black" />
            ) : (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            )}
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h2>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                  {project.category}
                </span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-lg">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-8">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                <Code2 size={16} /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                  <ExternalLink size={20} /> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                  <Github size={20} /> View Code
                </a>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
import { Github, ExternalLink, PlayCircle, Monitor, LayoutDashboard, Smartphone, Terminal, Play } from 'lucide-react';

const ProjectCard = ({ project }) => {
  
  // Helper for icons
  const getTypeIcon = (type) => {
    switch(type) {
      case 'MOBILE_APP': return <Smartphone size={14} />;
      case 'DASHBOARD': return <LayoutDashboard size={14} />;
      case 'SCRIPT': return <Terminal size={14} />;
      default: return <ExternalLink size={14} />;
    }
  };

  // Helper to check for video
  const isVideo = (project) => {
    if (project.projectType === 'SCRIPT') return true;
    const url = project.image || '';
    return url.includes('video') || url.includes('.mp4') || url.includes('.webm');
  };

  const isVideoContent = project.image && isVideo(project);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 group h-full flex flex-col">
      
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-3 flex gap-2 items-center">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
        <div className="ml-auto text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">
          {getTypeIcon(project.projectType)}
          {project.projectType}
        </div>
      </div>

      {/* Media Area (Hover to Play Preview) */}
      <div className="h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
        {project.image ? (
          isVideoContent ? (
            <>
              <video 
                src={project.image} 
                className="w-full h-full object-cover" 
                muted 
                loop 
                playsInline
                onMouseEnter={(e) => e.target.play()} 
                onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
              />
              {/* Play Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                <div className="bg-black/20 p-3 rounded-full backdrop-blur-sm border border-white/20">
                    <Play className="text-white fill-white" size={32} />
                </div>
              </div>
            </>
          ) : (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          )
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
             <PlayCircle size={30} />
             <span className="text-sm">No Preview</span>
          </div>
        )}
      </div>

      {/* Info Area */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">{project.title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack?.map((tech, i) => (
            <span key={i} className="text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded border border-blue-100 dark:border-blue-800">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
import React from 'react';
import { Github, ExternalLink, Zap } from 'lucide-react';
import { ProjectCardProps } from '../../types/portfolio';

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  return (
    <div className={`group relative overflow-hidden rounded-[40px] bg-white border border-gray-100 h-[600px] flex flex-col transition-all hover:shadow-3xl ${className}`}>
      <div className={`h-80 bg-gradient-to-br ${project.color} p-12 flex items-center justify-center overflow-hidden relative`}>
        {/* Abstract shape representing ML/Code */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" stroke="white" fill="none" strokeWidth="0.5" strokeDasharray="5,5" />
            <rect x="20" y="20" width="60" height="60" stroke="white" fill="none" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="relative z-10 w-full aspect-video bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 transform translate-y-12 group-hover:translate-y-4 transition-transform duration-700 shadow-2xl flex items-center justify-center">
          <Zap className="text-white opacity-40" size={48} />
        </div>
      </div>
      
      <div className="p-10 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              {project.category}
            </span>
            <div className="flex gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-black cursor-pointer transition-colors"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github size={16} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-black cursor-pointer transition-colors"
                  aria-label={`View ${project.title} live demo`}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
          <h3 className="text-3xl font-black mt-3 leading-tight">{project.title}</h3>
          <p className="text-gray-500 mt-4 text-sm leading-relaxed font-medium">
            {project.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-8">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="px-4 py-1.5 bg-gray-50 text-[10px] font-black uppercase tracking-widest border border-gray-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
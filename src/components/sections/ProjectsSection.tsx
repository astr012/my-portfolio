import React from 'react';
import { projects, projectsContent } from '../../config/projects';
import { ProjectCard } from '../ui';

const ProjectsSection: React.FC = () => {
  return (
    <section id="work" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-xs font-black tracking-[0.3em] uppercase text-gray-400 mb-4">
              {projectsContent.sectionTitle}
            </h2>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              {projectsContent.heading.split(' ').map((word, index) => (
                <React.Fragment key={index}>
                  {index === 1 ? <br /> : index > 0 ? ' ' : ''}
                  {word}
                </React.Fragment>
              ))}
            </h3>
          </div>
          <p className="text-gray-500 font-medium max-w-sm leading-relaxed">
            {projectsContent.description}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="mt-20 flex justify-center">
          <button className="group relative px-12 py-5 bg-white border-2 border-black rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              {projectsContent.archiveButtonText} <span className="text-lg">→</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
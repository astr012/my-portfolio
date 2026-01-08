import React from 'react';
import { Layers, Terminal, Sparkles, Database } from 'lucide-react';
import { skills, skillsContent } from '../../config/skills';
import { SkillCard } from '../ui';
import { Skill } from '../../types/portfolio';

const SkillsSection: React.FC = () => {
  // Map icons to skills based on their names
  const getSkillIcon = (skillName: string) => {
    switch (skillName.toLowerCase()) {
      case 'frontend':
        return <Layers size={18} />;
      case 'backend':
        return <Terminal size={18} />;
      case 'ml/ai':
        return <Sparkles size={18} />;
      case 'cloud':
        return <Database size={18} />;
      default:
        return <Terminal size={18} />;
    }
  };

  // Create skills with icons
  const skillsWithIcons: Skill[] = skills.map(skill => ({
    ...skill,
    icon: getSkillIcon(skill.name)
  }));

  return (
    <section id="skills" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-xs font-black tracking-[0.3em] uppercase text-gray-400 mb-4">
            {skillsContent.sectionTitle}
          </h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
            {skillsContent.heading}
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsWithIcons.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
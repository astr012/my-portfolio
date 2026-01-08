import React from 'react';
import { SkillCardProps } from '../../types/portfolio';

const SkillCard: React.FC<SkillCardProps> = ({ skill, className = '' }) => {
  return (
    <div className={`${skill.color} p-8 rounded-[32px] border border-white shadow-sm hover:shadow-md transition-all group ${className}`}>
      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
        {skill.icon}
      </div>
      
      <h4 className="text-xl font-bold mb-1">{skill.name}</h4>
      <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-6">
        {skill.level}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {skill.items.map(item => (
          <span 
            key={item} 
            className="px-3 py-1 bg-white/50 border border-white/80 rounded-full text-xs font-medium text-gray-700"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;
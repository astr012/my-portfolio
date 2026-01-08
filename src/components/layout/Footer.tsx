import React from 'react';
import { FooterProps } from '../../types/portfolio';

const Footer: React.FC<FooterProps> = ({ personalInfo, className = '' }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`py-12 border-t border-gray-100 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xs font-bold tracking-widest text-gray-400 uppercase">
          © {currentYear} {personalInfo.name.toUpperCase()} — {personalInfo.title.toUpperCase()}
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">
          ESTABLISHED IN {personalInfo.establishedYear} <span className="text-black ml-2">{personalInfo.location.toUpperCase()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
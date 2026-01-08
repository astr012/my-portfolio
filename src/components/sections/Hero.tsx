import React from 'react';
import { ChevronRight } from 'lucide-react';
import { personalInfo, heroContent } from '../../config/personal';
import { SocialLinks } from '../ui';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-48 pb-24 px-6 min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-100/50 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-100/50 rounded-full blur-[120px] -z-10 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-white rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span>
          {personalInfo.availability}
        </div>
        
        <h1 className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-[0.85] mb-12">
          {heroContent.tagline.split(' & ').map((part, index) => (
            <React.Fragment key={index}>
              {index === 0 ? part : (
                <>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">& </span> 
                  {part}
                </>
              )}
            </React.Fragment>
          ))}
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <p className="max-w-xl text-lg md:text-2xl text-gray-500 font-medium leading-tight">
            Hello, I&apos;m <span className="text-black">{personalInfo.name}</span>. {personalInfo.bio}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 md:justify-end">
            <a 
              href="#work" 
              className="px-10 py-5 bg-black text-white rounded-2xl font-bold text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-3"
            >
              {heroContent.ctaText} <ChevronRight size={18} />
            </a>
            
            <div className="flex items-center gap-6 px-4 justify-center">
              <SocialLinks 
                socialLinks={personalInfo.socialLinks} 
                variant="hero"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
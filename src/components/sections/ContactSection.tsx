import React from 'react';
import { ChevronRight } from 'lucide-react';
import { personalInfo, heroContent } from '../../config/personal';
import { SocialLinks } from '../ui';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-40 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="inline-block px-4 py-1 bg-gray-100 rounded-full text-[10px] font-black tracking-widest text-gray-400 mb-10 uppercase">
          {heroContent.availabilityDetails}
        </div>
        
        <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-16 text-center leading-[0.85]">
          {heroContent.contactCta.title.split(' ').map((word, index) => (
            <React.Fragment key={index}>
              {index === 2 ? <br /> : index > 0 ? ' ' : ''}
              {index === 2 ? (
                <span className="text-gray-300">{word}</span>
              ) : (
                word
              )}
            </React.Fragment>
          ))}
        </h2>
        
        <div className="flex flex-col items-center gap-8">
          <a 
            href={`mailto:${personalInfo.email}`}
            className="group relative text-2xl md:text-5xl font-black tracking-tight flex items-center gap-4 hover:scale-105 transition-transform"
          >
            {personalInfo.email}
            <div className="w-12 h-12 md:w-20 md:h-20 bg-black rounded-full flex items-center justify-center text-white rotate-[-45deg] group-hover:rotate-0 transition-transform duration-500">
              <ChevronRight size={32} />
            </div>
          </a>
          
          <div className="flex gap-12 mt-12">
            <SocialLinks 
              socialLinks={personalInfo.socialLinks} 
              variant="footer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
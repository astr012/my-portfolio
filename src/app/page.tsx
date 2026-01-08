'use client';

import React from 'react';

// Import extracted components
import { Navbar, Footer } from '@/components/layout';
import { 
  Hero, 
  ProjectsSection, 
  SkillsSection, 
  ServicesSection, 
  ContactSection 
} from '@/components/sections';

// Import configuration data for Footer
import { personalInfo } from '@/config';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <ProjectsSection />
        <SkillsSection />
        <ServicesSection />
        <ContactSection />
      </main>

      <Footer personalInfo={personalInfo} />
    </div>
  );
};

export default App;
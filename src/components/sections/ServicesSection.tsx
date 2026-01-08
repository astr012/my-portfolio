import React from 'react';
import { Cpu, Code2, Database, Sparkles } from 'lucide-react';
import { services, servicesContent } from '../../config/services';

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-32 px-6 bg-black text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-900 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-xs font-black tracking-[0.3em] uppercase text-gray-500 mb-6">
              {servicesContent.sectionTitle}
            </h2>
            <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-12 leading-none">
              {servicesContent.heading.split(' ').map((word, index) => (
                <React.Fragment key={index}>
                  {index === 3 ? <br /> : index > 0 ? ' ' : ''}
                  {word}
                </React.Fragment>
              ))}
            </h3>
            
            <div className="space-y-12">
              {services.map((service, i) => (
                <div key={i} className="group border-l-2 border-gray-800 pl-8 hover:border-white transition-colors">
                  <h4 className="text-xl font-bold mb-2 group-hover:translate-x-2 transition-transform">
                    {service.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square border-2 border-dashed border-gray-800 rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-xl">
                <Cpu size={20} />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-xl">
                <Code2 size={20} />
              </div>
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-xl">
                <Database size={20} />
              </div>
              <div className="w-1/2 h-1/2 border-2 border-gray-800 rounded-full flex items-center justify-center">
                <Sparkles className="text-gray-500" size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationItems, navigationContent } from '../../config/navigation';
import { NavbarProps } from '../../types/portfolio';

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'py-8 bg-transparent'} ${className}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-black tracking-tighter flex items-center gap-2 group">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white transition-all duration-500 group-hover:rounded-[20px] group-hover:rotate-6">
            <span className="text-sm">{navigationContent.logo.initials}</span>
          </div>
          <span className="hidden sm:block uppercase letter-spacing-widest">{navigationContent.logo.fullName}</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navigationItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              className="text-[13px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href={navigationContent.ctaButton.href}
            className="px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            {navigationContent.ctaButton.text}
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-8 md:hidden flex flex-col gap-6 animate-in slide-in-from-top-4 duration-300">
          {navigationItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              className="text-2xl font-black tracking-tight"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
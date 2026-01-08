import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { SocialLinksProps } from '../../types/portfolio';

const SocialLinks: React.FC<SocialLinksProps> = ({
  socialLinks,
  className = '',
  variant = 'default'
}) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'footer':
        return 'font-bold uppercase tracking-[0.2em] text-xs hover:text-blue-600 transition-colors';
      case 'hero':
        return 'text-gray-400 hover:text-black cursor-pointer transition-colors';
      default:
        return 'text-gray-400 hover:text-black cursor-pointer transition-colors';
    }
  };

  const containerClasses = variant === 'footer' ? 'flex gap-12' : 'flex items-center gap-6';

  return (
    <div className={`${containerClasses} ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          className={getVariantClasses()}
          target={link.platform !== 'email' ? '_blank' : undefined}
          rel={link.platform !== 'email' ? 'noopener noreferrer' : undefined}
          aria-label={link.label}
        >
          {variant === 'footer' ? link.label : getIcon(link.platform)}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
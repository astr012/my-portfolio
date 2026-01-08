import { PersonalInfo, SocialLink } from '../types/portfolio';

export const socialLinks: SocialLink[] = [
  {
    platform: 'github',
    url: 'https://github.com/lalitmohan',
    label: 'GitHub'
  },
  {
    platform: 'linkedin', 
    url: 'https://linkedin.com/in/lalitmohan',
    label: 'LinkedIn'
  },
  {
    platform: 'email',
    url: 'mailto:lalitmohan.engineer@gmail.com',
    label: 'Email'
  }
];

export const personalInfo: PersonalInfo = {
  name: 'Lalit Mohan',
  title: 'Full Stack & ML Engineer',
  email: 'lalitmohan.engineer@gmail.com',
  bio: 'I build intelligent systems that bridge the gap between robust software architecture and machine intelligence.',
  availability: 'Open for collaborations',
  location: 'India',
  establishedYear: '199X',
  socialLinks
};

// Additional content constants
export const heroContent = {
  tagline: 'FULL STACK & ML ENGINEER.',
  description: 'Exploring the intersection of scalable software and intelligent data processing through purposeful engineering.',
  availabilityDetails: 'Available for projects starting Feb 2024',
  ctaText: 'View My Work',
  contactCta: {
    title: "LET'S BUILD SOMETHING GREAT.",
    subtitle: 'Available for projects starting Feb 2024'
  }
};

export const footerContent = {
  copyright: `© ${new Date().getFullYear()} LALIT MOHAN — FULL STACK & ML ENGINEER`,
  established: `ESTABLISHED IN ${personalInfo.establishedYear} ${personalInfo.location.toUpperCase()}`
};
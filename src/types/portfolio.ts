import { ReactNode } from 'react';

// Core data interfaces
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  bio: string;
  availability: string;
  location: string;
  establishedYear: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email';
  url: string;
  label: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  color: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Proficient' | 'Advanced' | 'Expert';
  icon: ReactNode;
  items: string[];
  color: string;
}

export interface Service {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface NavItem {
  label: string;
  id: string;
}

// Component prop interfaces
export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export interface SkillCardProps {
  skill: Skill;
  className?: string;
}

export interface NavbarProps {
  className?: string;
}

export interface HeroProps {
  personalInfo: PersonalInfo;
  className?: string;
}

export interface ProjectsSectionProps {
  projects: Project[];
  className?: string;
}

export interface SkillsSectionProps {
  skills: Skill[];
  className?: string;
}

export interface ServicesSectionProps {
  services: Service[];
  className?: string;
}

export interface ContactSectionProps {
  personalInfo: PersonalInfo;
  className?: string;
}

export interface FooterProps {
  personalInfo: PersonalInfo;
  className?: string;
}

export interface SocialLinksProps {
  socialLinks: SocialLink[];
  className?: string;
  variant?: 'default' | 'footer' | 'hero';
}

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

// Layout component props
export interface LayoutProps {
  children: ReactNode;
  className?: string;
}

// Configuration types
export interface PortfolioConfig {
  personal: PersonalInfo;
  projects: Project[];
  skills: Skill[];
  services: Service[];
  navigation: NavItem[];
}

// Utility types
export type SkillLevel = Skill['level'];
export type ProjectCategory = string;
export type SocialPlatform = SocialLink['platform'];

// Theme and styling types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface ResponsiveBreakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

// Animation and interaction types
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface ScrollConfig {
  offset: number;
  smooth: boolean;
}

// Error and loading states
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// Form and validation types (for contact forms, etc.)
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

// SEO and metadata types
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

// Performance and analytics types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

export interface AnalyticsEvent {
  name: string;
  category: string;
  label?: string;
  value?: number;
}
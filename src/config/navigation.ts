import { NavItem } from '../types/portfolio';

export const navigationItems: NavItem[] = [
  { label: "Selected Work", id: "work" },
  { label: "Expertise", id: "skills" },
  { label: "Process", id: "services" },
  { label: "Contact", id: "contact" }
];

export const navigationContent = {
  logo: {
    initials: "LM",
    fullName: "Lalit Mohan"
  },
  ctaButton: {
    text: "Get in touch",
    href: "#contact"
  }
};
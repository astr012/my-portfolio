import { Skill } from '../types/portfolio';

export const skills: Skill[] = [
  { 
    name: "Frontend", 
    level: "Expert", 
    icon: null, // Will be set in component
    items: ["React", "Next.js", "Tailwind", "Three.js"], 
    color: "bg-blue-50" 
  },
  { 
    name: "Backend", 
    level: "Expert", 
    icon: null, // Will be set in component
    items: ["Node.js", "Go", "Python", "FastAPI"], 
    color: "bg-emerald-50" 
  },
  { 
    name: "ML/AI", 
    level: "Advanced", 
    icon: null, // Will be set in component
    items: ["PyTorch", "Scikit-Learn", "NLP", "CV"], 
    color: "bg-purple-50" 
  },
  { 
    name: "Cloud", 
    level: "Proficient", 
    icon: null, // Will be set in component
    items: ["Docker", "K8s", "AWS", "CI/CD"], 
    color: "bg-orange-50" 
  },
];

export const skillsContent = {
  sectionTitle: "Core Expertise",
  heading: "TECHNICAL ARSENAL"
};
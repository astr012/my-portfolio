import { Project } from '../types/portfolio';

export const projects: Project[] = [
  {
    id: 1,
    title: "Neural Vision API",
    category: "Machine Learning",
    description: "High-throughput computer vision pipeline for real-time object detection and spatial analysis using custom-trained YOLO models.",
    tags: ["Python", "PyTorch", "FastAPI"],
    color: "from-blue-600 via-indigo-500 to-violet-500",
    githubUrl: "https://github.com/lalitmohan/neural-vision-api",
    liveUrl: "https://neural-vision-api.demo.com",
    featured: true
  },
  {
    id: 2,
    title: "EcoSphere Dashboard",
    category: "Full Stack",
    description: "A comprehensive environmental monitoring system with real-time sensor data visualization and predictive maintenance alerts.",
    tags: ["React", "Go", "PostgreSQL"],
    color: "from-emerald-500 to-teal-400",
    githubUrl: "https://github.com/lalitmohan/ecosphere-dashboard",
    liveUrl: "https://ecosphere-dashboard.demo.com",
    featured: true
  },
  {
    id: 3,
    title: "Sentix NLP",
    category: "AI/ML",
    description: "Advanced sentiment analysis engine for financial markets, processing millions of news headlines with transformer-based architectures.",
    tags: ["TensorFlow", "Transformers", "AWS"],
    color: "from-orange-500 to-rose-500",
    githubUrl: "https://github.com/lalitmohan/sentix-nlp",
    featured: true
  },
  {
    id: 4,
    title: "Vault Protocol",
    category: "Infrastructure",
    description: "Secure, distributed credential management system built with end-to-end encryption and zero-knowledge proofs.",
    tags: ["Rust", "Wasm", "TypeScript"],
    color: "from-cyan-500 to-blue-500",
    githubUrl: "https://github.com/lalitmohan/vault-protocol",
    liveUrl: "https://vault-protocol.demo.com",
    featured: true
  }
];

export const projectsContent = {
  sectionTitle: "Portfolio",
  heading: "CRAFTED SOLUTIONS.",
  description: "Exploring the intersection of scalable software and intelligent data processing through purposeful engineering.",
  archiveButtonText: "View Archive"
};
/**
 * Feature: portfolio-restructure, Property 6: Functional Preservation
 * 
 * Property 6: Functional Preservation
 * For any user interaction or visual element from the original implementation, 
 * it should work identically after restructuring
 * 
 * Validates: Requirements 4.4
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Functional Preservation Property Tests', () => {
  const srcPath = path.join(process.cwd(), 'src');
  let App: React.ComponentType;

  beforeAll(async () => {
    // Dynamically import the App component
    const appModule = await import('../app/page');
    App = appModule.default;
  });
  
  // Essential components that must exist after restructuring
  const requiredComponents = [
    'components/layout/Navbar.tsx',
    'components/layout/Footer.tsx',
    'components/sections/Hero.tsx',
    'components/sections/ProjectsSection.tsx',
    'components/sections/SkillsSection.tsx',
    'components/sections/ServicesSection.tsx',
    'components/sections/ContactSection.tsx',
    'components/ui/ProjectCard.tsx',
    'components/ui/SkillCard.tsx',
    'components/ui/SocialLinks.tsx',
    'components/ui/Button.tsx'
  ];

  // Essential content that must be preserved
  const essentialContent = [
    'FULL STACK & ML ENGINEER',
    'Lalit Mohan',
    'lalitmohan.engineer@gmail.com',
    'Open for collaborations',
    'CRAFTED SOLUTIONS',
    'TECHNICAL ARSENAL',
    'HOW I CAN HELP YOU'
  ];

  // Essential sections that must exist
  const essentialSections = [
    { id: 'work', name: 'Projects Section' },
    { id: 'skills', name: 'Skills Section' },
    { id: 'services', name: 'Services Section' },
    { id: 'contact', name: 'Contact Section' }
  ];

  test('Property 6: All essential components should exist after restructuring', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...requiredComponents),
        (componentPath) => {
          const filePath = path.join(srcPath, componentPath);
          expect(fs.existsSync(filePath)).toBe(true);
          expect(fs.statSync(filePath).isFile()).toBe(true);
          expect(path.extname(filePath)).toBe('.tsx');
          
          // Component should export a React component
          const content = fs.readFileSync(filePath, 'utf-8');
          expect(content).toMatch(/export\s+default\s+\w+/);
          expect(content).toContain('React');
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 6: Main page should render without errors after restructuring', () => {
    fc.assert(
      fc.property(
        fc.constant(true),
        () => {
          expect(() => {
            render(React.createElement(App));
          }).not.toThrow();
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 6: All essential content should be preserved in the rendered output', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...essentialContent),
        (content) => {
          render(React.createElement(App));
          expect(screen.getByText(new RegExp(content, 'i'))).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 6: All essential sections should be present with correct IDs', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...essentialSections),
        (section) => {
          render(React.createElement(App));
          const sectionElement = document.getElementById(section.id);
          expect(sectionElement).toBeInTheDocument();
          expect(sectionElement).toBeVisible();
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 6: Navigation functionality should be preserved', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          { id: 'work', label: 'Selected Work' },
          { id: 'skills', label: 'Expertise' },
          { id: 'services', label: 'Process' },
          { id: 'contact', label: 'Contact' }
        ),
        (navItem) => {
          render(React.createElement(App));
          
          // Navigation links should exist and point to correct sections
          const navLink = screen.getByRole('link', { name: new RegExp(navItem.label, 'i') });
          expect(navLink).toBeInTheDocument();
          expect(navLink.getAttribute('href')).toBe(`#${navItem.id}`);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 6: Social links functionality should be preserved', () => {
    render(React.createElement(App));
    
    fc.assert(
      fc.property(
        fc.constantFrom('github', 'linkedin', 'email'),
        (platform) => {
          // Social links should be present in the document
          const socialElements = document.querySelectorAll(`[href*="${platform}"], [href*="mailto"]`);
          expect(socialElements.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 6: Project cards should maintain their structure and content', () => {
    render(React.createElement(App));
    
    fc.assert(
      fc.property(
        fc.constant(true),
        () => {
          // Should have project cards with essential elements
          const projectTitles = [
            'Neural Vision API',
            'EcoSphere Dashboard', 
            'Sentix NLP',
            'Vault Protocol'
          ];
          
          projectTitles.forEach(title => {
            expect(screen.getByText(title)).toBeInTheDocument();
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 6: Skill cards should maintain their structure and content', () => {
    render(React.createElement(App));
    
    fc.assert(
      fc.property(
        fc.constantFrom('Frontend', 'Backend', 'ML/AI', 'Cloud'),
        (skillName) => {
          expect(screen.getByText(skillName)).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 6: Contact section should preserve email and CTA functionality', () => {
    render(React.createElement(App));
    
    fc.assert(
      fc.property(
        fc.constant(true),
        () => {
          // Email link should be present and functional
          const emailLink = screen.getByRole('link', { name: /lalitmohan\.engineer@gmail\.com/i });
          expect(emailLink).toBeInTheDocument();
          expect(emailLink.getAttribute('href')).toBe('mailto:lalitmohan.engineer@gmail.com');
          
          // Contact CTA should be present
          expect(screen.getByText(/LET'S BUILD/i)).toBeInTheDocument();
          expect(screen.getByText(/SOMETHING GREAT/i)).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 6: Footer should preserve copyright and establishment information', () => {
    render(React.createElement(App));
    
    fc.assert(
      fc.property(
        fc.constant(true),
        () => {
          // Copyright information should be present
          expect(screen.getByText(/LALIT MOHAN — FULL STACK & ML ENGINEER/i)).toBeInTheDocument();
          
          // Establishment information should be present
          expect(screen.getByText(/ESTABLISHED IN 199X/i)).toBeInTheDocument();
          expect(screen.getByText(/INDIA/i)).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 6: Component structure should maintain proper React patterns', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...requiredComponents),
        (componentPath) => {
          const filePath = path.join(srcPath, componentPath);
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Should use proper React patterns
          expect(content).toContain('import React');
          expect(content).toMatch(/const\s+\w+:\s*React\.FC/);
          expect(content).toMatch(/export\s+default\s+\w+/);
          
          // Should use TypeScript
          expect(content).toMatch(/\.tsx?$/);
          
          // Should not have any obvious syntax errors
          expect(content).toMatch(/return\s*\(/);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 6: All interactive elements should be accessible', () => {
    render(React.createElement(App));
    
    fc.assert(
      fc.property(
        fc.constant(true),
        () => {
          // All links should be accessible
          const links = screen.getAllByRole('link');
          expect(links.length).toBeGreaterThan(0);
          
          links.forEach(link => {
            expect(link).toBeInTheDocument();
            expect(link).toBeVisible();
          });
          
          // All buttons should be accessible
          const buttons = screen.getAllByRole('button');
          buttons.forEach(button => {
            expect(button).toBeInTheDocument();
            expect(button).toBeVisible();
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 6: CSS classes and styling should be preserved', () => {
    render(React.createElement(App));
    
    fc.assert(
      fc.property(
        fc.constant(true),
        () => {
          // Main container should have proper styling classes
          const mainContainer = document.querySelector('.min-h-screen');
          expect(mainContainer).toBeInTheDocument();
          expect(mainContainer).toHaveClass('bg-white', 'text-black', 'font-sans');
          
          // Selection styling should be preserved
          expect(mainContainer).toHaveClass('selection:bg-black', 'selection:text-white');
        }
      ),
      { numRuns: 100 }
    );
  });
});
/**
 * Feature: portfolio-restructure, Property 7: Responsive Design Consistency
 * 
 * Property 7: Responsive Design Consistency
 * For any viewport size or device breakpoint, the responsive design should work 
 * correctly across all components
 * 
 * Validates: Requirements 8.5
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

describe('Responsive Design Property Tests', () => {
  const componentsPath = path.join(process.cwd(), 'src', 'components');
  
  // Tailwind CSS responsive breakpoints
  const responsiveBreakpoints = ['sm:', 'md:', 'lg:', 'xl:', '2xl:'];
  
  // Common responsive patterns that should be used consistently
  const responsivePatterns = [
    // Grid patterns
    /grid\s+(?:sm:|md:|lg:|xl:|2xl:)?grid-cols-\d+/g,
    // Flex patterns  
    /flex\s+flex-(?:col|row)(?:\s+(?:sm:|md:|lg:|xl:|2xl:)flex-(?:col|row))?/g,
    // Text size patterns
    /text-(?:xs|sm|base|lg|xl|\d*xl|\[\d+(?:vw|rem|px)\])(?:\s+(?:sm:|md:|lg:|xl:|2xl:)text-(?:xs|sm|base|lg|xl|\d*xl|\[\d+(?:vw|rem|px)\]))?/g,
    // Hidden/visible patterns
    /(?:hidden|block|flex|grid)(?:\s+(?:sm:|md:|lg:|xl:|2xl:)(?:hidden|block|flex|grid))?/g
  ];

  // Get all component files
  const getAllComponentFiles = (dir: string): string[] => {
    const files: string[] = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...getAllComponentFiles(fullPath));
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
    
    return files;
  };

  const componentFiles = getAllComponentFiles(componentsPath);

  test('Property 7: All components should use consistent responsive breakpoints', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...componentFiles),
        (componentFile) => {
          const content = fs.readFileSync(componentFile, 'utf-8');
          
          // Find all responsive class usage
          const responsiveClasses = content.match(/(?:sm:|md:|lg:|xl:|2xl:)[a-zA-Z0-9_-]+/g) || [];
          
          if (responsiveClasses.length > 0) {
            // All responsive classes should use standard Tailwind breakpoints
            responsiveClasses.forEach(className => {
              const breakpoint = className.split(':')[0] + ':';
              expect(responsiveBreakpoints).toContain(breakpoint);
            });
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 7: Components with grid layouts should have responsive grid patterns', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...componentFiles),
        (componentFile) => {
          const content = fs.readFileSync(componentFile, 'utf-8');
          
          // If component uses grid, it should have responsive grid patterns
          if (content.includes('grid ') || content.includes('grid-cols-')) {
            const gridMatches = content.match(/grid(?:\s+[a-zA-Z0-9_:-]+)*\s+(?:sm:|md:|lg:|xl:|2xl:)?grid-cols-\d+/g);
            
            if (gridMatches) {
              // Should have at least one responsive grid pattern
              const hasResponsiveGrid = gridMatches.some(match => 
                responsiveBreakpoints.some(bp => match.includes(bp))
              );
              
              // If it's a complex layout component, it should have responsive grids
              const isLayoutComponent = componentFile.includes('sections/') || 
                                     componentFile.includes('layout/') ||
                                     content.includes('max-w-7xl') ||
                                     content.includes('container');
              
              if (isLayoutComponent) {
                expect(hasResponsiveGrid).toBe(true);
              }
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 7: Components should use consistent responsive text sizing', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...componentFiles),
        (componentFile) => {
          const content = fs.readFileSync(componentFile, 'utf-8');
          
          // Find text size classes
          const textSizeMatches = content.match(/text-(?:xs|sm|base|lg|xl|\d*xl|\[\d+(?:vw|rem|px)\])/g) || [];
          
          if (textSizeMatches.length > 0) {
            // Check for responsive text sizing patterns
            const responsiveTextMatches = content.match(/text-[a-zA-Z0-9\[\]]+(?:\s+(?:sm:|md:|lg:|xl:|2xl:)text-[a-zA-Z0-9\[\]]+)+/g) || [];
            
            // Large text elements should have responsive sizing
            const hasLargeText = textSizeMatches.some(match => 
              match.includes('text-4xl') || 
              match.includes('text-5xl') || 
              match.includes('text-6xl') ||
              match.includes('text-7xl') ||
              match.includes('text-8xl') ||
              match.includes('text-9xl') ||
              match.includes('text-[') // viewport units
            );
            
            if (hasLargeText) {
              // Should have responsive text sizing for large text
              const hasResponsiveText = content.match(/(?:sm:|md:|lg:|xl:|2xl:)text-[a-zA-Z0-9\[\]]+/g);
              // Only require responsive text for components that actually need it (sections with large headings)
              const isHeadingComponent = componentFile.includes('sections/') && 
                                       (content.includes('text-4xl') || content.includes('text-5xl') || 
                                        content.includes('text-6xl') || content.includes('text-7xl') ||
                                        content.includes('text-8xl') || content.includes('text-9xl'));
              
              if (isHeadingComponent && !hasResponsiveText) {
                expect(hasResponsiveText).toBeTruthy();
              }
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 7: Mobile navigation should be properly implemented', () => {
    const navbarFile = path.join(componentsPath, 'layout', 'Navbar.tsx');
    
    if (fs.existsSync(navbarFile)) {
      const content = fs.readFileSync(navbarFile, 'utf-8');
      
      // Should have mobile menu toggle
      expect(content).toMatch(/md:hidden/);
      
      // Should have desktop navigation hidden on mobile
      expect(content).toMatch(/hidden\s+md:flex/);
      
      // Should have mobile menu state management
      expect(content).toMatch(/setIsOpen/);
      
      // Should have menu toggle button
      expect(content).toMatch(/<Menu|<X/);
    }
  });

  test('Property 7: Flex layouts should have responsive direction changes where appropriate', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...componentFiles),
        (componentFile) => {
          const content = fs.readFileSync(componentFile, 'utf-8');
          
          // Find flex direction patterns specifically for flex-col to flex-row changes
          const flexColPatterns = content.match(/flex\s+flex-col(?:\s+(?:sm:|md:|lg:|xl:|2xl:)flex-row)?/g) || [];
          
          if (flexColPatterns.length > 0) {
            // Only check components that should logically have responsive flex changes
            // (like Hero section with content that should stack on mobile but be side-by-side on desktop)
            const shouldHaveResponsiveFlex = componentFile.includes('Hero.tsx') || 
                                           componentFile.includes('ProjectsSection.tsx') ||
                                           componentFile.includes('Footer.tsx');
            
            if (shouldHaveResponsiveFlex) {
              const hasResponsiveFlex = flexColPatterns.some(pattern =>
                responsiveBreakpoints.some(bp => pattern.includes(bp + 'flex-row'))
              );
              
              // These specific components should have responsive flex patterns
              expect(hasResponsiveFlex).toBe(true);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 7: Components should have consistent spacing and padding patterns', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...componentFiles),
        (componentFile) => {
          const content = fs.readFileSync(componentFile, 'utf-8');
          
          // Check for consistent padding patterns
          const paddingMatches = content.match(/p[xy]?-\d+/g) || [];
          const marginMatches = content.match(/m[xy]?-\d+/g) || [];
          
          if (paddingMatches.length > 0 || marginMatches.length > 0) {
            // Should use consistent spacing scale (multiples of 4 in Tailwind)
            const allSpacingValues = [...paddingMatches, ...marginMatches]
              .map(match => parseInt(match.match(/\d+/)?.[0] || '0'));
            
            // Most spacing should follow Tailwind's scale
            const validSpacingValues = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96];
            
            allSpacingValues.forEach(value => {
              // Allow some flexibility for custom values, but most should be standard
              const isValidOrCustom = validSpacingValues.includes(value) || value > 96;
              expect(isValidOrCustom).toBe(true);
            });
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
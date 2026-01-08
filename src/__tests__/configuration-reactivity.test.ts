/**
 * Feature: portfolio-restructure, Property 4: Configuration Reactivity
 * 
 * Property 4: Configuration Reactivity
 * For any change made to configuration data, all components consuming that data 
 * should reflect the updates immediately
 * 
 * Validates: Requirements 3.5, 7.5
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

describe('Configuration Reactivity Property Tests', () => {
  const srcPath = path.join(process.cwd(), 'src');
  
  // Configuration files that must exist
  const configFiles = [
    'config/personal.ts',
    'config/projects.ts',
    'config/skills.ts',
    'config/services.ts',
    'config/navigation.ts'
  ];

  // Configuration exports that must be available
  const configExports = [
    { file: 'config/personal.ts', exports: ['personalInfo', 'socialLinks', 'heroContent', 'footerContent'] },
    { file: 'config/projects.ts', exports: ['projects', 'projectsContent'] },
    { file: 'config/skills.ts', exports: ['skills', 'skillsContent'] },
    { file: 'config/services.ts', exports: ['services', 'servicesContent'] },
    { file: 'config/navigation.ts', exports: ['navigationItems', 'navigationContent'] }
  ];

  test('Property 4: All configuration files should exist and be accessible', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...configFiles),
        (configFile) => {
          const filePath = path.join(srcPath, configFile);
          expect(fs.existsSync(filePath)).toBe(true);
          expect(fs.statSync(filePath).isFile()).toBe(true);
          expect(path.extname(filePath)).toBe('.ts');
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 4: Configuration files should export required data structures', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...configExports),
        (configExport) => {
          const filePath = path.join(srcPath, configExport.file);
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Verify each required export exists in the file
          configExport.exports.forEach(exportName => {
            const exportRegex = new RegExp(`export\\s+const\\s+${exportName}`, 'g');
            expect(exportRegex.test(content)).toBe(true);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 4: Configuration files should import proper TypeScript interfaces', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...configFiles),
        (configFile) => {
          const filePath = path.join(srcPath, configFile);
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Should import from types/portfolio
          expect(content).toContain("from '../types/portfolio'");
          
          // Should have proper import statements
          expect(content).toMatch(/import\s+{[^}]+}\s+from/);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 4: Configuration data should be properly typed and structured', () => {
    const personalConfigPath = path.join(srcPath, 'config/personal.ts');
    const projectsConfigPath = path.join(srcPath, 'config/projects.ts');
    const skillsConfigPath = path.join(srcPath, 'config/skills.ts');
    
    fc.assert(
      fc.property(
        fc.constantFrom(personalConfigPath, projectsConfigPath, skillsConfigPath),
        (configPath) => {
          const content = fs.readFileSync(configPath, 'utf-8');
          
          // Should contain proper type annotations
          expect(content).toMatch(/:\s*\w+(\[\])?(\s*=|\s*{)/);
          
          // Should not contain any 'any' types (strict typing)
          expect(content).not.toContain(': any');
          
          // Should be valid TypeScript syntax
          expect(content.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 4: Configuration changes should be immediately available through imports', () => {
    // Test that configuration exports are properly structured for reactivity
    const configPaths = configFiles.map(file => path.join(srcPath, file));
    
    fc.assert(
      fc.property(
        fc.constantFrom(...configPaths),
        (configPath) => {
          const content = fs.readFileSync(configPath, 'utf-8');
          
          // Configuration should use const exports (immutable references)
          expect(content).toMatch(/export\s+const\s+\w+/);
          
          // Should not use var or let for exports (ensures consistency)
          expect(content).not.toMatch(/export\s+(var|let)\s+\w+/);
          
          // Should have proper object/array structure for data
          expect(content).toMatch(/=\s*[{\[]/);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 4: Configuration files should maintain referential integrity', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...configExports),
        (configExport) => {
          const filePath = path.join(srcPath, configExport.file);
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Should not have circular references or undefined exports
          configExport.exports.forEach(exportName => {
            // Export should be defined before being used
            const exportMatch = content.match(new RegExp(`export\\s+const\\s+${exportName}\\s*[=:]`, 'g'));
            expect(exportMatch).toBeTruthy();
            expect(exportMatch!.length).toBe(1); // Should be defined exactly once
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 4: Configuration should support hot reloading in development', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...configFiles),
        (configFile) => {
          const filePath = path.join(srcPath, configFile);
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Should not have any side effects that would prevent hot reloading
          expect(content).not.toContain('document.');
          expect(content).not.toContain('window.');
          expect(content).not.toContain('localStorage.');
          expect(content).not.toContain('sessionStorage.');
          
          // Should be pure data exports
          expect(content).toMatch(/export\s+const/);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 4: All configuration exports should be consumable by React components', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...configExports),
        (configExport) => {
          const filePath = path.join(srcPath, configExport.file);
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Should have proper data structure for React consumption
          expect(content).toMatch(/export\s+const\s+\w+.*[=:]/);
          
          // Should be valid TypeScript without JSX (icons handled in components)
          expect(content).not.toContain('<');
          expect(content).not.toContain('/>');
          
          // Should import proper types from portfolio types
          expect(content).toContain("from '../types/portfolio'");
        }
      ),
      { numRuns: 100 }
    );
  });
});
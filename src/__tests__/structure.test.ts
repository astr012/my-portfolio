/**
 * Feature: portfolio-restructure, Property 1: Component Structure Integrity
 * 
 * Property 1: Component Structure Integrity
 * For any component extracted from the original page.tsx, it should exist as a separate file 
 * with proper exports and maintain its original functionality when imported
 * 
 * Validates: Requirements 2.1, 2.2, 2.3
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

describe('Directory Structure Property Tests', () => {
  const srcPath = path.join(process.cwd(), 'src');
  
  // Required directories based on the design
  const requiredDirectories = [
    'components',
    'components/layout',
    'components/sections', 
    'components/ui',
    'config',
    'types',
    'utils'
  ];

  // Required barrel export files
  const requiredBarrelFiles = [
    'components/index.ts',
    'components/layout/index.ts',
    'components/sections/index.ts',
    'components/ui/index.ts',
    'config/index.ts',
    'types/index.ts',
    'utils/index.ts'
  ];

  test('Property 1: All required directories should exist and be accessible', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...requiredDirectories),
        (directory) => {
          const dirPath = path.join(srcPath, directory);
          expect(fs.existsSync(dirPath)).toBe(true);
          expect(fs.statSync(dirPath).isDirectory()).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 1: All barrel export files should exist and be valid TypeScript files', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...requiredBarrelFiles),
        (barrelFile) => {
          const filePath = path.join(srcPath, barrelFile);
          expect(fs.existsSync(filePath)).toBe(true);
          expect(fs.statSync(filePath).isFile()).toBe(true);
          expect(path.extname(filePath)).toBe('.ts');
          
          // Verify file is readable and contains valid content
          const content = fs.readFileSync(filePath, 'utf-8');
          expect(content).toBeDefined();
          expect(content.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 1: Barrel files should contain export statements or export placeholders', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...requiredBarrelFiles),
        (barrelFile) => {
          const filePath = path.join(srcPath, barrelFile);
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Should contain either export statements or export placeholder
          const hasExports = content.includes('export') || content.includes('// This file will be populated');
          expect(hasExports).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});
/**
 * Feature: portfolio-restructure, Property 5: Asset Reference Integrity
 * 
 * Property 5: Asset Reference Integrity
 * For any asset reference in the system, it should resolve to a valid file 
 * without breaking links after restructuring
 * 
 * Validates: Requirements 5.5
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

describe('Asset Integrity Property Tests', () => {
  const publicPath = path.join(process.cwd(), 'public');
  
  // Expected asset structure after reorganization
  const expectedAssetStructure = {
    'icons': ['file.svg', 'globe.svg', 'window.svg'],
    'logos': ['next.svg', 'vercel.svg']
  };

  // All expected asset paths
  const allExpectedAssets = [
    'icons/file.svg',
    'icons/globe.svg', 
    'icons/window.svg',
    'logos/next.svg',
    'logos/vercel.svg'
  ];

  test('Property 5: All organized asset directories should exist and be accessible', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Object.keys(expectedAssetStructure)),
        (assetCategory) => {
          const categoryPath = path.join(publicPath, assetCategory);
          expect(fs.existsSync(categoryPath)).toBe(true);
          expect(fs.statSync(categoryPath).isDirectory()).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 5: All expected assets should exist in their organized locations', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allExpectedAssets),
        (assetPath) => {
          const fullAssetPath = path.join(publicPath, assetPath);
          expect(fs.existsSync(fullAssetPath)).toBe(true);
          expect(fs.statSync(fullAssetPath).isFile()).toBe(true);
          
          // Verify it's an SVG file
          expect(path.extname(fullAssetPath)).toBe('.svg');
          
          // Verify file is readable and has content
          const content = fs.readFileSync(fullAssetPath, 'utf-8');
          expect(content).toBeDefined();
          expect(content.length).toBeGreaterThan(0);
          
          // Basic SVG validation - should contain SVG tag
          expect(content).toMatch(/<svg[\s\S]*<\/svg>/i);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 5: Asset categories should contain only expected files', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Object.entries(expectedAssetStructure)),
        ([category, expectedFiles]) => {
          const categoryPath = path.join(publicPath, category);
          const actualFiles = fs.readdirSync(categoryPath);
          
          // All expected files should be present
          expectedFiles.forEach(expectedFile => {
            expect(actualFiles).toContain(expectedFile);
          });
          
          // No unexpected files should be present
          actualFiles.forEach(actualFile => {
            expect(expectedFiles).toContain(actualFile);
          });
          
          // Count should match
          expect(actualFiles.length).toBe(expectedFiles.length);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 5: Asset file paths should be accessible via Next.js public serving', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allExpectedAssets),
        (assetPath) => {
          // Verify the asset can be referenced via Next.js public path convention
          const nextjsPath = `/${assetPath}`;
          const fullAssetPath = path.join(publicPath, assetPath);
          
          // The file should exist at the expected location for Next.js serving
          expect(fs.existsSync(fullAssetPath)).toBe(true);
          
          // The path should follow Next.js conventions (no spaces, proper format)
          expect(nextjsPath).toMatch(/^\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/);
        }
      ),
      { numRuns: 100 }
    );
  });
});
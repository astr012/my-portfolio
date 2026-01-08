/**
 * Feature: portfolio-restructure, Property 2: Naming Convention Consistency
 * 
 * Property 2: Naming Convention Consistency  
 * For any component or asset file in the system, it should follow the established naming conventions 
 * (PascalCase for components, kebab-case for assets)
 * 
 * Validates: Requirements 2.5, 5.2
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

describe('Naming Convention Property Tests', () => {
  const srcPath = path.join(process.cwd(), 'src');
  const publicPath = path.join(process.cwd(), 'public');

  // Helper functions for naming convention validation
  const isPascalCase = (name: string): boolean => {
    return /^[A-Z][a-zA-Z0-9]*$/.test(name);
  };

  const isKebabCase = (name: string): boolean => {
    return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(name);
  };

  const isCamelCase = (name: string): boolean => {
    return /^[a-z][a-zA-Z0-9]*$/.test(name);
  };

  const isValidComponentFileName = (fileName: string): boolean => {
    const nameWithoutExt = path.parse(fileName).name;
    // Component files should be PascalCase or specific allowed names
    const allowedSpecialNames = ['index', 'layout', 'page', 'globals'];
    return isPascalCase(nameWithoutExt) || allowedSpecialNames.includes(nameWithoutExt);
  };

  const isValidAssetFileName = (fileName: string): boolean => {
    const nameWithoutExt = path.parse(fileName).name;
    // Asset files should be kebab-case or specific allowed names
    return isKebabCase(nameWithoutExt) || nameWithoutExt === 'favicon';
  };

  const isValidConfigFileName = (fileName: string): boolean => {
    const nameWithoutExt = path.parse(fileName).name;
    // Config files should be camelCase or kebab-case
    return isCamelCase(nameWithoutExt) || isKebabCase(nameWithoutExt) || nameWithoutExt === 'index';
  };

  const isValidTypeFileName = (fileName: string): boolean => {
    const nameWithoutExt = path.parse(fileName).name;
    // Type files should be camelCase or kebab-case
    return isCamelCase(nameWithoutExt) || isKebabCase(nameWithoutExt) || nameWithoutExt === 'index';
  };

  test('Property 2: All React component files should follow PascalCase naming convention', async () => {
    const componentFiles = await glob('**/*.{tsx,jsx}', { 
      cwd: path.join(srcPath, 'components'),
      absolute: false 
    });

    fc.assert(
      fc.property(
        fc.constantFrom(...componentFiles),
        (componentFile) => {
          const fileName = path.basename(componentFile);
          expect(isValidComponentFileName(fileName)).toBe(true);
        }
      ),
      { numRuns: Math.max(100, componentFiles.length) }
    );
  });

  test('Property 2: All asset files should follow kebab-case naming convention', async () => {
    if (fs.existsSync(publicPath)) {
      const assetFiles = await glob('**/*.{svg,png,jpg,jpeg,gif,ico,webp}', { 
        cwd: publicPath,
        absolute: false 
      });

      if (assetFiles.length > 0) {
        fc.assert(
          fc.property(
            fc.constantFrom(...assetFiles),
            (assetFile) => {
              const fileName = path.basename(assetFile);
              expect(isValidAssetFileName(fileName)).toBe(true);
            }
          ),
          { numRuns: Math.max(100, assetFiles.length) }
        );
      }
    }
  });

  test('Property 2: All configuration files should follow camelCase or kebab-case naming convention', async () => {
    const configFiles = await glob('**/*.{ts,js}', { 
      cwd: path.join(srcPath, 'config'),
      absolute: false 
    });

    fc.assert(
      fc.property(
        fc.constantFrom(...configFiles),
        (configFile) => {
          const fileName = path.basename(configFile);
          expect(isValidConfigFileName(fileName)).toBe(true);
        }
      ),
      { numRuns: Math.max(100, configFiles.length) }
    );
  });

  test('Property 2: All type definition files should follow camelCase or kebab-case naming convention', async () => {
    const typeFiles = await glob('**/*.{ts,d.ts}', { 
      cwd: path.join(srcPath, 'types'),
      absolute: false 
    });

    fc.assert(
      fc.property(
        fc.constantFrom(...typeFiles),
        (typeFile) => {
          const fileName = path.basename(typeFile);
          expect(isValidTypeFileName(fileName)).toBe(true);
        }
      ),
      { numRuns: Math.max(100, typeFiles.length) }
    );
  });

  test('Property 2: Directory names should follow kebab-case convention', async () => {
    const getAllDirectories = (dirPath: string): string[] => {
      if (!fs.existsSync(dirPath)) return [];
      
      const items = fs.readdirSync(dirPath, { withFileTypes: true });
      const directories: string[] = [];
      
      for (const item of items) {
        if (item.isDirectory() && !item.name.startsWith('.')) {
          directories.push(item.name);
          const subDirPath = path.join(dirPath, item.name);
          directories.push(...getAllDirectories(subDirPath));
        }
      }
      
      return directories;
    };

    const allDirectories = getAllDirectories(srcPath);
    const allowedSpecialDirs = ['__tests__', 'app']; // Next.js specific directories

    fc.assert(
      fc.property(
        fc.constantFrom(...allDirectories),
        (dirName) => {
          const isValid = isKebabCase(dirName) || allowedSpecialDirs.includes(dirName);
          expect(isValid).toBe(true);
        }
      ),
      { numRuns: Math.max(100, allDirectories.length) }
    );
  });

  test('Property 2: Test files should follow the component naming convention with .test or .spec suffix', async () => {
    const testFiles = await glob('**/*.{test,spec}.{ts,tsx,js,jsx}', { 
      cwd: srcPath,
      absolute: false 
    });

    fc.assert(
      fc.property(
        fc.constantFrom(...testFiles),
        (testFile) => {
          const fileName = path.basename(testFile);
          const nameWithoutTestSuffix = fileName
            .replace(/\.(test|spec)\.(ts|tsx|js|jsx)$/, '');
          
          // Test files should follow kebab-case or camelCase naming
          const isValid = isKebabCase(nameWithoutTestSuffix) || 
                          isCamelCase(nameWithoutTestSuffix) ||
                          nameWithoutTestSuffix === 'setup';
          expect(isValid).toBe(true);
        }
      ),
      { numRuns: Math.max(100, testFiles.length) }
    );
  });
});
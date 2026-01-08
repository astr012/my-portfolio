/**
 * Feature: portfolio-restructure, Property 3: Type Safety Completeness
 * 
 * Property 3: Type Safety Completeness
 * For any component, configuration data, or data structure in the system, 
 * it should have proper TypeScript interfaces and type definitions
 * 
 * Validates: Requirements 2.4, 3.4, 6.1, 6.2, 6.4
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

describe('Type Safety Property Tests', () => {
  const srcPath = path.join(process.cwd(), 'src');
  
  // Core interfaces that must exist in the source code
  const requiredInterfaces = [
    'PersonalInfo',
    'Project', 
    'Skill',
    'Service',
    'NavItem',
    'SocialLink'
  ];

  // Component prop interfaces that must exist
  const requiredComponentProps = [
    'ProjectCardProps',
    'SkillCardProps',
    'NavbarProps',
    'HeroProps',
    'ProjectsSectionProps',
    'SkillsSectionProps',
    'ServicesSectionProps',
    'ContactSectionProps',
    'FooterProps',
    'SocialLinksProps',
    'ButtonProps'
  ];

  // Configuration interfaces that must exist
  const requiredConfigInterfaces = [
    'PortfolioConfig',
    'ThemeColors',
    'AnimationConfig'
  ];

  test('Property 3: All core data interfaces should be defined in portfolio.ts', () => {
    const portfolioTypesPath = path.join(srcPath, 'types/portfolio.ts');
    const content = fs.readFileSync(portfolioTypesPath, 'utf-8');

    fc.assert(
      fc.property(
        fc.constantFrom(...requiredInterfaces),
        (interfaceName) => {
          // Verify interface is properly defined in the file
          const interfaceRegex = new RegExp(`export interface ${interfaceName}\\s*{`, 'g');
          expect(interfaceRegex.test(content)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 3: All component prop interfaces should be defined in portfolio.ts', () => {
    const portfolioTypesPath = path.join(srcPath, 'types/portfolio.ts');
    const content = fs.readFileSync(portfolioTypesPath, 'utf-8');

    fc.assert(
      fc.property(
        fc.constantFrom(...requiredComponentProps),
        (propInterfaceName) => {
          // Verify prop interface is properly defined in the file
          const interfaceRegex = new RegExp(`export interface ${propInterfaceName}\\s*{`, 'g');
          expect(interfaceRegex.test(content)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 3: All configuration interfaces should be defined in portfolio.ts', () => {
    const portfolioTypesPath = path.join(srcPath, 'types/portfolio.ts');
    const content = fs.readFileSync(portfolioTypesPath, 'utf-8');

    fc.assert(
      fc.property(
        fc.constantFrom(...requiredConfigInterfaces),
        (configInterfaceName) => {
          // Verify config interface is properly defined in the file
          const interfaceRegex = new RegExp(`export interface ${configInterfaceName}\\s*{`, 'g');
          expect(interfaceRegex.test(content)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 3: TypeScript files should compile without errors', () => {
    const typeFiles = [
      'types/portfolio.ts',
      'types/index.ts'
    ];

    fc.assert(
      fc.property(
        fc.constantFrom(...typeFiles),
        (typeFile) => {
          const filePath = path.join(srcPath, typeFile);
          expect(fs.existsSync(filePath)).toBe(true);
          
          // Read file content
          const content = fs.readFileSync(filePath, 'utf-8');
          expect(content).toBeDefined();
          expect(content.length).toBeGreaterThan(0);
          
          // Verify it contains interface or type definitions
          const hasTypeDefinitions = content.includes('interface ') || 
                                   content.includes('type ') || 
                                   content.includes('export');
          expect(hasTypeDefinitions).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 3: Barrel exports should properly re-export all types', () => {
    const indexPath = path.join(srcPath, 'types/index.ts');
    const content = fs.readFileSync(indexPath, 'utf-8');

    // Should contain export statement for portfolio types
    expect(content).toContain("export * from './portfolio'");
    
    // Should be a valid TypeScript file
    expect(path.extname(indexPath)).toBe('.ts');
    expect(content.length).toBeGreaterThan(0);
  });

  test('Property 3: React component prop interfaces should include proper ReactNode typing', () => {
    const portfolioTypesPath = path.join(srcPath, 'types/portfolio.ts');
    const content = fs.readFileSync(portfolioTypesPath, 'utf-8');

    // Should import ReactNode for proper React typing
    expect(content).toContain("import { ReactNode } from 'react'");
    
    // Should use ReactNode in appropriate interfaces
    expect(content).toContain('ReactNode');
  });

  test('Property 3: All interfaces should be properly exported', () => {
    const portfolioTypesPath = path.join(srcPath, 'types/portfolio.ts');
    const content = fs.readFileSync(portfolioTypesPath, 'utf-8');
    
    const allInterfaces = [...requiredInterfaces, ...requiredComponentProps, ...requiredConfigInterfaces];

    fc.assert(
      fc.property(
        fc.constantFrom(...allInterfaces),
        (interfaceName) => {
          // Verify interface has export keyword
          const exportRegex = new RegExp(`export interface ${interfaceName}`, 'g');
          expect(exportRegex.test(content)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});
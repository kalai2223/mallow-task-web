// eslint.config.js
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { defineConfig } from 'eslint/config';
import pluginReact from 'eslint-plugin-react';
import pluginImport from 'eslint-plugin-import';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import pluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  // TypeScript / TSX files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: pluginReact,
      import: pluginImport,
      'unused-imports': pluginUnusedImports,
      '@typescript-eslint': tsPlugin,
      prettier: pluginPrettier,
    },
    rules: {
      // Prettier formatting
      'prettier/prettier': ['error'],

      // Basic rules
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],

      // Variables / Unused checks
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      // Code quality
      'prefer-const': 'warn',
      'no-console': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 1 }],
      'max-len': [
        'error',
        { code: 200, ignoreComments: true, ignoreStrings: true, ignoreUrls: true },
      ],
      'space-before-function-paren': [
        'error',
        { anonymous: 'never', named: 'never', asyncArrow: 'always' },
      ],
      'no-multi-spaces': 'error',
      'prefer-destructuring': ['error', { object: true, array: true }],
      'eol-last': ['error', 'always'],

      // React
      'react/react-in-jsx-scope': 'off',

      // Imports
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'type',
            'object',
            'unknown',
          ],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: '@/**', group: 'internal', position: 'before' },
            { pattern: './**', group: 'internal', position: 'after' },
            { pattern: '../**', group: 'internal', position: 'after' },
            { pattern: '*.{css,scss,sass,less,styl}', group: 'unknown', position: 'after' },
            { pattern: '*.module.{css,scss,sass,less,styl}', group: 'unknown', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-cycle': 'error',
    },
    settings: { react: { version: 'detect' } },
  },

  // JavaScript / JSX files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
    },
    plugins: {
      react: pluginReact,
      import: pluginImport,
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error'],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'no-mixed-spaces-and-tabs': 'error',
      'no-console': 'error',
      'prefer-const': 'warn',
      'react/react-in-jsx-scope': 'off',
    },
    settings: { react: { version: 'detect' } },
  },

  // Recommended React rules
  {
    ...pluginReact.configs.flat.recommended,
    rules: { 'react/react-in-tsx-scope': 'off' },
  },
]);

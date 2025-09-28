import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import pluginImport from 'eslint-plugin-import'; // <-- add this
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

export default defineConfig([
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true }, // <-- important
            },
            globals: globals.browser,
        },
        plugins: { js, react: pluginReact },
        rules: {
            'prefer-const': 'warn',
            'no-constant-binary-expression': 'error',
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            'react/react-in-jsx-scope': 'off',
            'no-console': 'error',
            'no-multiple-empty-lines': [
                'error',
                { max: 1, maxEOF: 1, maxBOF: 1 },
            ],
            'max-len': [
                'error',
                { code: 200, ignoreComments: true, ignoreStrings: true, ignoreUrls: true },
            ],
            'space-before-function-paren': [
                'error',
                { anonymous: 'never', named: 'never', asyncArrow: 'always' },
            ],
            'no-multi-spaces': ['error'],
            'prefer-destructuring': ['error', { object: true, array: true }],
            'eol-last': ['error', 'always'],

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
        // plugins: { js, import: pluginImport },
        extends: ['js/recommended'],
        // languageOptions: { globals: globals.browser },
        settings: { react: { version: 'detect' } },
    },
    {
        ...pluginReact.configs.flat.recommended,
        rules: { 'react/react-in-jsx-scope': 'off' },
    },
]);

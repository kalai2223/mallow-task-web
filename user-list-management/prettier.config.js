export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  overrides: [
    { files: '*.ts', options: { parser: 'typescript' } },
    { files: '*.tsx', options: { parser: 'typescript' } },
    { files: '*.js', options: { parser: 'babel' } },
    { files: '*.jsx', options: { parser: 'babel' } },
  ],
};

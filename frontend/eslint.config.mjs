import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      },
      globals: {
        ...globals.browser
      }
    }
  }
];

import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import jestPlugin from 'eslint-plugin-jest';

export default [
  {
    files: ['**/*.js', '**/*.jsx'], // Lintattavat tiedostot
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        jsx: true, // JSX-tuki
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      react: reactPlugin,
      jest: jestPlugin,
    },
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      eqeqeq: 'off',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
      'react/prop-types': 0,
    },
  },
  {
    files: ['**/*.jsx', '**/*.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import jestPlugin from 'eslint-plugin-jest';
import parser from '@babel/eslint-parser';

export default [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser,
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: {
          jsx: true,
        },
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
    settings: {
      react: {
        version: 'detect',
      },
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
];
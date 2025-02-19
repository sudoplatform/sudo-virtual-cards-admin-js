// @ts-check

import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import tsesparser from '@typescript-eslint/parser'
import jestPlugin from 'eslint-plugin-jest'
import prettierPlugin from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'
import treeshaking from 'eslint-plugin-tree-shaking'
import {fixupPluginRules} from "@eslint/compat";

export default tseslint.config(
  {
    name: 'javascript',
    extends: [eslint.configs.recommended],
    files: ['*.js'],
    languageOptions: {
      ecmaVersion: 2018,
      parser: eslint.parser,
      globals: {
        ...globals.node,
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    name: 'main',
    files: ['src/**/*.ts'],
    ignores: ['**/*.test.ts'],
    plugins: {
      jest: jestPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
      "tree-shaking": fixupPluginRules(treeshaking),
    },
    languageOptions: {
      parser: tsesparser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      // Disallow `any`.  (This is overridden for test files, below)
      '@typescript-eslint/no-explicit-any': 'error',

      // Allow "newspaper" code structure
      '@typescript-eslint/no-use-before-define': 'off',

      // Allow property definition of prop: string = ""
      // instead of inferred type such as prop = ""
      '@typescript-eslint/no-inferrable-types': 'off',

      // Allow TS convention of ignoring args
      // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#flag-unused-declarations-with---nounusedparameters-and---nounusedlocals
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],

      // Soften eslint defaults so that callbacks don't need to be as verbose
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],

      // Allow use of unbound static methods
      '@typescript-eslint/unbound-method': [
        'error',
        {
          ignoreStatic: true,
        },
      ],
      'tree-shaking/no-side-effects-in-initialization': 'error',
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    name: 'test rules',
    files: ['**/*.test.ts', 'test/**/*.ts', 'jest.setup.ts'],
    plugins: { jest: jestPlugin,  },
    languageOptions: {
      parser: tsesparser,
      parserOptions: {
        project: './tsconfig.test.json',
      },
    },
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
)

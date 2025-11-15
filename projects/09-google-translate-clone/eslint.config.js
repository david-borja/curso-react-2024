import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  { ignores: ['eslint.config.js'] },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser, parserOptions: { project: './tsconfig.app.json' } },
    rules: {
      // 🎨 Estilo tipo "StandardJS"
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-single'],
      indent: ['error', 2],
      'comma-dangle': ['error', 'never'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      // '@typescript-eslint/explicit-function-return-type': ['error'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react/react-in-jsx-scope': 'off',
      // 🚫 Espacios raros en JSX
      'react/jsx-tag-spacing': ['error', {
        closingSlash: 'never',
        afterOpening: 'never',
        beforeClosing: 'never',
      }],
      // 'react/prop-types': 'off',
      // ❌ Desactiva la regla base de ESLint (que no entiende TS)
      'no-unused-vars': 'off',
      // ✅ Usa la versión de @typescript-eslint
      '@typescript-eslint/no-unused-vars': ['warn'],
      // Con esta regla, nos ayuda a usar la inferencia de tipos de TypeScript para lo que retornan las funciones
      // y de este modo evitamos tener que tipar cosas innecesariamente
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface']
    },
    settings: {
      react: { version: 'detect' },
    }
  },
]);

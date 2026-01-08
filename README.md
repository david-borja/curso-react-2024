# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Commands

## Si inicializamos un proyecto vanilla con Vite y queremos agregar React a mano:
Necesitaremos el plugin de react
- npm i @vitest/plugin-react -D -E
o, si queremos una alternativa un poco más rápida, plugin-react-swc
- npm i @vitest/plugin-react-swc -D -E

Luego, para que funcione, tendríamos que crear el vite.config.js y usar el plugin:

  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react-swc'

  export default defineConfig({
    plugins: [react()]
  })

Importante, instalar el linter:

- npm i standard -D -E

y en el package ponemos esto
  "eslintConfig": {
    "extends": "./node_modules/standard/eslintrc.json"
  }

En este caso, no hace falta porque tenemos el linter configurado a nivel de monorepo

Para añadir test e2e -> npm init playwright@latest

Si hay problema instalando los navegadores:
Instalar versión compatible: npm install playwright@1.25.0
Instalar navegadores
Para instalar solo chromium (recomendado):
- npx playwright install chromium

## Para configurar un proyecto con TS en este monorepo, seguir estos pasos:
- npm create vite@latest
- No instalar deps automaticamente
- Quitar los carets del package.json
- pnpm i
- Borramos algunas props inexistentes los archivos tsconfig
- npx eslint --init
- Ir al eslint.config.js
  - Mover estas líneas al principio del array:
      tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
  - Añadir también al inicio del array:
      { ignores: ['eslint.config.js'] },
  - Dentro de languageOptions, añadir:
      parserOptions: { project: './tsconfig.app.json' }
  - A continuación, al nivel de languageOptions, añadimos estas rules :
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
- Para comprobar que todo funciona, vamos a App.tsx y guardamos para ver el auto formateo
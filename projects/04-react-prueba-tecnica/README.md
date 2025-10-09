Si inicializamos un proyecto vanilla con Vite y queremos agregar react a mano,
necesitaremos el plugin de react

npm i @vitest/plugin-react -D -E

o, si queremos una alternativa un poco más rápida, plugin-react-swc

npm i @vitest/plugin-react-swc -D -E

Luego, para que funcione, tendríamos que crear el vite.config.js

Importante, instalar el linter:

npm i standard -D -E

y en el package ponemos esto
  "eslintConfig": {
    "extends": "./node_modules/standard/eslintrc.json"
  }

En este caso, no hace falta porque tenemos el linter configurado a nivel de monorepo
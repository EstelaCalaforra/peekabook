module.exports = {
  root: true,
  env: { browser: true, es2020: true, 'vitest-globals/env': true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:vitest-globals/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    "no-unused-vars": ["error", {
            "vars": "all"}],
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'react/prop-types': 'off',
    'react/jsx-no-target-blank': 'off',
    'no-unused-vars': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'no-debugger': 'off'
  }
}

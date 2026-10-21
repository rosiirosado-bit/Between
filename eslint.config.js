// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  {
    ignores: ['dist/*', '.expo/*', 'node_modules/*'],
  },
  {
    rules: {
      // Privacy (CLAUDE.md, PRD §9): use src/lib/log.ts, which never accepts journal content.
      'no-console': 'error',
      // Design tokens only: no raw hex colors in components.
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/^#[0-9a-fA-F]{3,8}$/]',
          message: 'Use a color token from src/theme instead of a raw hex value.',
        },
      ],
    },
  },
  {
    files: ['src/theme/**', '**/__tests__/**'],
    rules: { 'no-restricted-syntax': 'off' },
  },
]);

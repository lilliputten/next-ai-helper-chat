// @ts-check

module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-recommended-scss',
    'stylelint-config-tailwindcss',
  ],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'scss/operator-no-newline-after': null,
    'at-rule-no-deprecated': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          // Tailwind rules
          'custom-variant',
          'forward',
          'function',
          'include',
          'mixin',
          'return',
          'tailwind',
          'theme',
          'use',
          // SCSS control directives
          'each',
          'if',
          'else',
          'for',
          'while',
        ],
      },
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          // Tailwind rules
          'apply',
          'custom-variant',
          'layer',
          'responsive',
          'screen',
          'tailwind',
          'theme',
          'variants',
          // SCSS control directives
          'each',
          'if',
          'else',
          'for',
          'while',
        ],
      },
    ],
  },
};

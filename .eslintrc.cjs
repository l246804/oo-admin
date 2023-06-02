const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  extends: ['@antfu', '@unocss'],
  rules: {
    'vue/max-attributes-per-line': ['error', { singleline: 1 }],
    'vue/component-name-in-template-casing': [
      'error', 'PascalCase', { registeredComponentsOnly: false },
    ],
  },
})

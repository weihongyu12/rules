module.exports = {
  plugins: ['jsdoc'],
  rules: {
    'jsdoc/check-tag-names': [
      'warn', {
        typed: true,
      },
    ],
    'jsdoc/no-types': 'warn',
    'jsdoc/no-undefined-types': 'off',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-property-type': 'off',
    'jsdoc/require-returns-type': 'off',
  },
}

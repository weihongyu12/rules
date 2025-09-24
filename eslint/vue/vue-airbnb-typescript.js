module.exports = {
  plugins: ['@typescript-eslint'],

  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',

    project: ['**/tsconfig.json', '**/tsconfig.*.json'],

    // Must be set globally.
    // As far as I've tested, it won't work if set in `overrides`.
    extraFileExtensions: ['.vue'],
  },

  settings: {

    // A list of file extensions that will be parsed as modules and inspected for exports.
    'import/extensions': ['.mjs', '.js', '.jsx', '.mts', '.ts', '.tsx'],

    'import/external-module-folders': ['node_modules', 'node_modules/@types'],

    'import/parsers': {
      '@typescript-eslint/parser': ['.mts', '.ts', '.tsx', '.d.ts'],
    },
  },

  rules: {
    // Until https://github.com/airbnb/javascript/pull/2623 is released
    'no-spaced-func': 'off',

    // TypeScript compilation already ensures that named imports exist in the referenced module
    // Shouldn't be re-enabled even for `allow-js-in-vue` ruleset because of https://github.com/import-js/eslint-import-resolver-typescript/issues/31
    'import/named': 'off',

    // https://github.com/airbnb/javascript/blob/cbf9ade10a2f6f06c9da6dbfa25b344bee4bbef6/packages/eslint-config-airbnb-base/rules/imports.js#L138-L144
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/91fd090f6fdd8d598a6ac6e9bb2c2ba33014e425/lib/shared.js#L230-L240
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
      mts: 'never',
      // Cannot omit `.vue` extensions.
      // This should be enforced all across the Vue.js ecosystem.
      vue: 'always',
    }],

    // Append 'ts' and 'tsx' extensions to Airbnb 'import/no-extraneous-dependencies' rule
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: false,
        devDependencies: [
          'test/**', // tape, common npm pattern
          'tests/**', // also common npm pattern
          'spec/**', // mocha, rspec-like pattern
          '**/__tests__/**', // jest pattern
          '**/__mocks__/**', // jest pattern
          'test.{js,jsx}', // repos with a single test file
          'test.{ts,tsx}', // repos with a single test file
          'test-*.{js,jsx}', // repos with multiple top-level test files
          'test-*.{ts,tsx}', // repos with multiple top-level test files
          '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
          '**/*{.,_}{test,spec}.{ts,tsx}', // tests where the extension or filename suffix denotes that it is a test
          '**/jest.config.js', // jest config
          '**/jest.config.ts', // jest config
          '**/jest.setup.js', // jest setup
          '**/jest.setup.ts', // jest setup
          '**/vue.config.js', // vue-cli config
          '**/vue.config.ts', // vue-cli config
          '**/webpack.config.js', // webpack config
          '**/webpack.config.ts', // webpack config
          '**/webpack.config.*.js', // webpack config
          '**/webpack.config.*.ts', // webpack config
          '**/rollup.config.js', // rollup config
          '**/rollup.config.ts', // rollup config
          '**/rollup.config.*.js', // rollup config
          '**/rollup.config.*.ts', // rollup config
          '**/gulpfile.js', // gulp config
          '**/gulpfile.ts', // gulp config
          '**/gulpfile.*.js', // gulp config
          '**/gulpfile.*.ts', // gulp config
          '**/Gruntfile{,.js}', // grunt config
          '**/Gruntfile{,.ts}', // grunt config
          '**/protractor.conf.js', // protractor config
          '**/protractor.conf.ts', // protractor config
          '**/protractor.conf.*.js', // protractor config
          '**/protractor.conf.*.ts', // protractor config
          '**/karma.conf.js', // karma config
          '**/karma.conf.ts', // karma config
          '**/.eslintrc.js', // eslint config
          '**/.eslintrc.ts', // eslint config

          // Rollup & Vue CLI supports `.cjs` & `.mjs` in addition to `.js`
          '**/rollup.config.*(c|m)js',
          '**/rollup.config.*(c|m)ts',
          '**/vue.config.*(c|m)js',
          '**/vue.config.*(c|m)ts',
          // ESLint supports `.cjs` extension in addition to `.js`
          '**/.eslintrc.*(c)js',
          '**/.eslintrc.*(c)ts',

          // Following ones are not included in the base config
          // Vite
          '**/vite.config.*(c|m)js',
          '**/vite.config.*(c|m)ts',
          // Vitest
          '**/vitest.config.*(c|m)js',
          '**/vitest.config.*(c|m)ts',
          // Cypress
          '**/cypress.config.*(c|m)js',
          '**/cypress.config.*(c|m)ts',
          '**/cypress/support/**',
          '**/*.cy.{js,jsx}',
          '**/*.cy.{ts,tsx}',
          // Playwright, only supports `.js` & `.mjs`
          // https://github.com/microsoft/playwright/blob/v1.24.0/packages/playwright-test/src/runner.ts#L52
          '**/playwright.config.*(m)js',
          '**/playwright.config.*(m)ts',
        ],
      },
    ],

    // only .jsx & .tsx files may have JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],

    // TODO: (semver-minor)
    // Disable some unnecessary jsx rules that can be covered by TypeScript
    // https://github.com/iamturns/eslint-config-airbnb-typescript/issues/273
  },

  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vue/block-lang': [
          'error',
          {
            script: {
              // Only `<script lang="ts">` is allowed.
              // `<script>` needs to be opted-in via the `allow-js-in-vue` ruleset.
              // `<script lang="jsx">` and `<script lang="tsx">` need to be opted-in
              // via the `allow-jsx-in-vue`/`allow-tsx-in-vue` rulesets.
              // See the reasoning in the corresponding files.
              lang: 'ts',
              allowNoLang: false,
            },
          },
        ],
      },
    },
  ]
}

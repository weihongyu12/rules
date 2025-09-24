module.exports = {
  parserOptions: {
    // Should be at least 2022 to support top-level await in `<script setup>`
    // https://eslint.vuejs.org/user-guide/#using-eslint-v8-x
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'vue',
    'jsx-a11y',
    'vuejs-accessibility',
  ],

  settings: {
    'import/resolver': {

    },

    // A list of file extensions that will be parsed as modules and inspected for exports.
    'import/extensions': [
      '.mjs',
      '.js',
      '.jsx',
    ],

    // This is only to suppress the missing React version warning
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/91398309901960d2ea41a9d62a2896981268cb1d/lib/util/version.js#L88-L92
    // TODO: fork it to create a universal eslint-plugin-jsx
    react: {
      version: '999.999.999',
    },
  },

  rules: {
    // Ensure consistent use of file extension within the import path
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',

      // All future Vue.js core packages would assume explicit `.vue` extension.
      vue: 'always',
    }],

    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    // paths are treated both as absolute paths, and relative to process.cwd()
    // https://github.com/airbnb/javascript/blob/eslint-config-airbnb-base-v15.0.0/packages/eslint-config-airbnb-base/rules/imports.js#L68
    // The glob syntax here is based on minimatch.
    // Online playground: https://globster.xyz/
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'test/**', // tape, common npm pattern
          'tests/**', // also common npm pattern
          'spec/**', // mocha, rspec-like pattern
          '**/__tests__/**', // jest pattern
          '**/__mocks__/**', // jest pattern
          'test.{js,jsx}', // repos with a single test file
          'test-*.{js,jsx}', // repos with multiple top-level test files
          '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
          '**/jest.config.js', // jest config
          '**/jest.setup.js', // jest setup
          '**/vue.config.js', // vue-cli config
          '**/webpack.config.js', // webpack config
          '**/webpack.config.*.js', // webpack config
          '**/rollup.config.js', // rollup config
          '**/rollup.config.*.js', // rollup config
          '**/gulpfile.js', // gulp config
          '**/gulpfile.*.js', // gulp config
          '**/Gruntfile{,.js}', // grunt config
          '**/protractor.conf.js', // protractor config
          '**/protractor.conf.*.js', // protractor config
          '**/karma.conf.js', // karma config
          '**/.eslintrc.js', // eslint config

          // Rollup & Vue CLI supports `.cjs` & `.mjs` in addition to `.js`
          '**/rollup.config.*(c|m)js',
          '**/vue.config.*(c|m)js',
          // ESLint supports `.cjs` extension in addition to `.js`
          '**/.eslintrc.*(c)js',

          // Following ones are not included in the base config
          // Vite
          '**/vite.config.*(c|m)js',
          // Vitest
          '**/vitest.config.*(c|m)js',
          // Cypress
          '**/cypress.config.*(c|m)js',
          '**/cypress/support/**',
          '**/*.cy.{js,jsx}',
          // Playwright, only supports `.js` & `.mjs`
          // https://github.com/microsoft/playwright/blob/v1.24.0/packages/playwright-test/src/runner.ts#L52
          '**/playwright.config.*(m)js',
        ],
        optionalDependencies: false,
      },
    ],

    // Specify whether double or single quotes should be used in JSX attributes
    // https://eslint.org/docs/rules/jsx-quotes
    'jsx-quotes': ['error', 'prefer-double'],

    // Enforce boolean attributes notation in JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
    'react/jsx-boolean-value': ['error', 'never', { always: [] }],

    // Validate closing bracket location in JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],

    // Validate closing tag location in JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md
    'react/jsx-closing-tag-location': 'error',

    // Enforce or disallow spaces inside of curly braces in JSX attributes
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
    'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],

    // Validate props indentation in JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
    'react/jsx-indent-props': ['error', 2],

    // Limit maximum of props on a single line in JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],

    // Prevent usage of .bind() in JSX props
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
    'react/jsx-no-bind': ['error', {
      // Vue's template ref isn't the same as React's ref, so this option doesn't make sense
      ignoreRefs: false,
      allowArrowFunctions: true,
      allowFunctions: false,
      allowBind: false,
      ignoreDOMComponents: true,
    }],

    // Prevent duplicate props in JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],

    // Disallow undeclared variables in JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
    // FIXME: should check if this works well without setting the pragma
    // https://github.com/typescript-eslint/typescript-eslint/issues/3788
    // 'react/jsx-no-undef': 'error',

    // Enforce PascalCase for user-defined JSX components
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
    'react/jsx-pascal-case': ['error', {
      allowAllCaps: true,
      ignore: [],
    }],

    // Prevent variables used in JSX to be incorrectly marked as unused
    // https://eslint.vuejs.org/rules/jsx-uses-vars.html
    // Already in `plugin:vue/base` ruleset.
    // Adding it again here to keep consistency with the upstream JSX rules
    'vue/jsx-uses-vars': 'error',

    // https://eslint.vuejs.org/rules/comment-directive.html
    // Already in `plugin:vue/base` ruleset.
    // Now that we add `vue/jsx-uses-vars`,
    // I think it's more consistent to add this rule explicitly too.
    'vue/comment-directive': 'error',

    // Skipped `react/no-unknown-property`.
    // Because Vue JSX doesn't suffer the same casing issue as React JSX

    // ... skipped other React-specific rules

    // https://eslint.vuejs.org/rules/require-render-return.html
    // Already in `plugin:vue/essential` and `plugin:vue/vue3-essential` ruleset.
    // Adding it again here to keep consistency with the upstream JSX rules
    'vue/require-render-return': 'error',

    // Prevent extra closing tags for components without children
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
    'react/self-closing-comp': 'error',

    // Prevent missing parentheses around multilines JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
    'react/jsx-wrap-multilines': ['error', {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
    }],

    // Require that the first prop in a JSX element be on a new line when the element is multiline
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],

    // Enforce spacing around jsx equals signs
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
    'react/jsx-equals-spacing': ['error', 'never'],

    // Enforce JSX indentation
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
    'react/jsx-indent': ['error', 2],

    // Disallow target="_blank" on links
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
    'react/jsx-no-target-blank': ['error', {
      // Unllike in the `airbnb-base` ruleset, this is set to `true`,
      // Because neither Vue CLI & Vite targets IE 11 by default.
      allowReferrer: true,

      enforceDynamicLinks: 'always',
    }],

    // only .jsx files may have JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    // TODO: (semver-major) shall we forbid JSX in `.vue` by default?
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.vue'] }],

    // prevent accidental JS comments from being injected into JSX as text
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md
    'react/jsx-no-comment-textnodes': 'error',

    // Skipped `react/no-danger-with-children`
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
    // Need a Vue-JSX port that does the same job as https://eslint.vuejs.org/rules/no-child-content.html

    // Require style prop value be an object or var
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/style-prop-object.md
    'react/style-prop-object': 'error',

    // Prevent invalid characters from appearing in markup
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
    'react/no-unescaped-entities': 'error',

    // Prevent passing of children as props
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
    'react/no-children-prop': 'error',

    // Validate whitespace in and around the JSX opening and closing brackets
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
    'react/jsx-tag-spacing': ['error', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    }],

    // Prevent usage of Array index in keys
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
    'react/no-array-index-key': 'error',

    // Prevent void DOM elements from receiving children
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md
    'react/void-dom-elements-no-children': 'error',

    // Enforce curly braces or disallow unnecessary curly braces in JSX props and/or children
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

    // One JSX Element Per Line
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-one-expression-per-line.md
    'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],

    // Prevent usage of button elements without an explicit type attribute
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
    'react/button-has-type': ['error', {
      button: true,
      submit: true,
      reset: false,
    }],

    // Disallow multiple spaces between inline JSX props
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-multi-spaces.md
    'react/jsx-props-no-multi-spaces': 'error',

    // Enforce shorthand form for fragments
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
    'react/jsx-fragments': ['error', 'syntax'],

    // Enforce linebreaks in curly braces in JSX attributes and expressions.
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-newline.md
    'react/jsx-curly-newline': ['error', {
      multiline: 'consistent',
      singleline: 'consistent',
    }],

    // Disallow JSX props spreading
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
    'react/jsx-props-no-spreading': ['error', {
      html: 'enforce',
      custom: 'enforce',
      explicitSpread: 'ignore',
      exceptions: [],
    }],

    // Prevent usage of `javascript:` URLs
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-script-url.md
    'react/jsx-no-script-url': 'error',

    // Disallow unnecessary fragments
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
    'react/jsx-no-useless-fragment': 'error',

    // Skipped `react/no-unstable-nested-components` for now,
    // because I'm not sure whether it works correctly for Vue render functions.

    // Enforce that namespaces are not used in Vue elements
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-namespace.md
    'react/no-namespace': 'error',

    // Prevent usage of invalid attributes
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/21e01b61af7a38fc86d94f27eb66cda8054582ed/docs/rules/no-invalid-html-attribute.md
    'react/no-invalid-html-attribute': 'error',

    // ensure emoji are accessible
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/accessible-emoji.md
    // disabled; rule is deprecated
    'jsx-a11y/accessible-emoji': 'off',

    // Enforce that all elements that require alternative text have meaningful information
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/alt-text.md
    'jsx-a11y/alt-text': ['error', {
      elements: ['img', 'object', 'area', 'input[type="image"]'],
      img: [],
      object: [],
      area: [],
      'input[type="image"]': [],
    }],

    // Enforce that anchors have content
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-has-content.md
    'jsx-a11y/anchor-has-content': ['error', { components: [] }],

    // ensure <a> tags are valid
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['to'],
      aspects: ['noHref', 'invalidHref', 'preferButton'],
    }],

    // elements with aria-activedescendant must be tabbable
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-activedescendant-has-tabindex.md
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',

    // Enforce all aria-* props are valid.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-props.md
    'jsx-a11y/aria-props': 'error',

    // Enforce ARIA state and property values are valid.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-proptypes.md
    'jsx-a11y/aria-proptypes': 'error',

    // Require ARIA roles to be valid and non-abstract
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-role.md
    'jsx-a11y/aria-role': ['error', { ignoreNonDOM: false }],

    // Enforce that elements that do not support ARIA roles, states, and
    // properties do not have those attributes.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-unsupported-elements.md
    'jsx-a11y/aria-unsupported-elements': 'error',

    // Ensure the autocomplete attribute is correct and suitable for the form field it is used with
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/29c68596b15c4ff0a40daae6d4a2670e36e37d35/docs/rules/autocomplete-valid.md
    'jsx-a11y/autocomplete-valid': ['off', {
      inputComponents: [],
    }],

    // require onClick be accompanied by onKeyUp/onKeyDown/onKeyPress
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md
    'jsx-a11y/click-events-have-key-events': 'error',

    // Enforce that a control (an interactive element) has a text label.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/control-has-associated-label.md
    'jsx-a11y/control-has-associated-label': ['error', {
      labelAttributes: ['label'],
      controlComponents: [],
      ignoreElements: [
        'audio',
        'canvas',
        'embed',
        'input',
        'textarea',
        'tr',
        'video',
      ],
      ignoreRoles: [
        'grid',
        'listbox',
        'menu',
        'menubar',
        'radiogroup',
        'row',
        'tablist',
        'toolbar',
        'tree',
        'treegrid',
      ],
      depth: 5,
    }],

    // ensure <hX> tags have content and are not aria-hidden
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/heading-has-content.md
    'jsx-a11y/heading-has-content': ['error', { components: [''] }],

    // Skipped `html-has-lang` rule
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/html-has-lang.md
    // Doesn't make sense for Vue.js - I doubt if anyone uses `<html>` element in Vue.js at all

    // ensure iframe elements have a unique title
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/iframe-has-title.md
    'jsx-a11y/iframe-has-title': 'error',

    // Skipped `img-redundant-alt` rule
    // Because:
    // 1. I personally, and many others, think it's not useful https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/417
    // 2. Bugs related to optional chaining syntax: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/755
    // 3. `vuejs-accessibility` doesn't have the corresponding rule

    // Elements with an interactive role and interaction handlers must be focusable
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/interactive-supports-focus.md
    'jsx-a11y/interactive-supports-focus': 'error',

    // Enforce that a label tag has a text label and an associated control.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/label-has-associated-control.md
    // As Vue JSX uses `for` instead of `htmlFor`, we have to disable it for now
    // TODO: open a feature request
    'jsx-a11y/label-has-associated-control': 'off',
    // 'jsx-a11y/label-has-associated-control': ['error', {
    //   labelComponents: [],
    //   labelAttributes: [],
    //   controlComponents: [],
    //   assert: 'both',
    //   depth: 25,
    // }],

    // Skipped `lang` rule
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/lang.md
    // Same reason as above (`html-has-lang`)

    // media elements must have captions
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/media-has-caption.md
    'jsx-a11y/media-has-caption': ['error', {
      audio: [],
      video: [],
      track: [],
    }],

    // require that mouseover/out come with focus/blur, for keyboard-only users
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/mouse-events-have-key-events.md
    'jsx-a11y/mouse-events-have-key-events': 'error',

    // Prevent use of `accessKey`
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-access-key.md
    'jsx-a11y/no-access-key': 'error',

    // prohibit autoFocus prop
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-autofocus.md
    'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }],

    // prevent distracting elements, like <marquee> and <blink>
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-distracting-elements.md
    'jsx-a11y/no-distracting-elements': ['error', {
      elements: ['marquee', 'blink'],
    }],

    // WAI-ARIA roles should not be used to convert an interactive element to non-interactive
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-interactive-element-to-noninteractive-role.md
    'jsx-a11y/no-interactive-element-to-noninteractive-role': ['error', {
      tr: ['none', 'presentation'],
    }],

    // A non-interactive element does not support event handlers (mouse and key handlers)
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-interactions.md
    'jsx-a11y/no-noninteractive-element-interactions': ['error', {
      handlers: [
        'onClick',
        'onMouseDown',
        'onMouseUp',
        'onKeyPress',
        'onKeyDown',
        'onKeyUp',
      ],
    }],

    // WAI-ARIA roles should not be used to convert a non-interactive element to interactive
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-to-interactive-role.md
    'jsx-a11y/no-noninteractive-element-to-interactive-role': ['error', {
      ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
      ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
      li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
      table: ['grid'],
      td: ['gridcell'],
    }],

    // Tab key navigation should be limited to elements on the page that can be interacted with.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-tabindex.md
    'jsx-a11y/no-noninteractive-tabindex': ['error', {
      tags: [],
      roles: ['tabpanel'],
    }],

    // require onBlur instead of onChange
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-onchange.md
    'jsx-a11y/no-onchange': 'off',

    // ensure HTML elements do not specify redundant ARIA roles
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-redundant-roles.md
    'jsx-a11y/no-redundant-roles': 'error',

    // Enforce that DOM elements without semantic behavior not have interaction handlers
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-static-element-interactions.md
    'jsx-a11y/no-static-element-interactions': ['error', {
      handlers: [
        'onClick',
        'onMouseDown',
        'onMouseUp',
        'onKeyPress',
        'onKeyDown',
        'onKeyUp',
      ],
    }],

    // Enforce that elements with ARIA roles must have all required attributes
    // for that role.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/role-has-required-aria-props.md
    'jsx-a11y/role-has-required-aria-props': 'error',

    // Enforce that elements with explicit or implicit roles defined contain
    // only aria-* properties supported by that role.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/role-supports-aria-props.md
    'jsx-a11y/role-supports-aria-props': 'error',

    // only allow <th> to have the "scope" attr
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/scope.md
    'jsx-a11y/scope': 'error',

    // Enforce tabIndex value is not greater than zero.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/tabindex-no-positive.md
    'jsx-a11y/tabindex-no-positive': 'error',

    // `vue/max-len` needs special configuration for better usability
    'vue/max-len': ['error', 100, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,

      // 1. it's like `ignoreStrings`
      // 2. SVG `path`s should be ignored
      ignoreHTMLAttributeValues: true,
      // Because spaces in HTML are insignificant,
      // it shouldn't be hard to start a new line for text content
      ignoreHTMLTextContents: false,
    }],

    // Follow similar styles in <template> as airbnb requires in JSX
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react.js

    // https://eslint.vuejs.org/rules/html-indent.html
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
    }],

    // https://eslint.vuejs.org/rules/max-attributes-per-line.html
    'vue/max-attributes-per-line': ['error', {
      multiline: { max: 1 },
      // Note: this differs from the official style guide a little bit
      // https://vuejs.org/style-guide/rules-strongly-recommended.html#multi-attribute-elements
      // Because Airbnb's JSX style doesn't care about maximum singleline attributes
      singleline: { max: 9999 },
    }],

    // https://eslint.vuejs.org/rules/no-duplicate-attributes.html
    // Already in `plugin:vue/essential` and `plugin:vue/vue3-essential` ruleset.
    // Adding it again here to keep consistency with the JSX rules
    'vue/no-duplicate-attributes': ['error', {
      allowCoexistClass: true,
      allowCoexistStyle: true,
    }],

    // https://eslint.vuejs.org/rules/component-name-in-template-casing.html
    // TODO: (semver-major) enable it later?
    // At this point the community seems to have a majority preference for `kebab-case`.
    // Turning this on may cause too many inconvenience.

    // https://eslint.vuejs.org/rules/html-self-closing.html
    // Prevents extra closing tags for components without children.
    // Note this rule's default value is different from the JSX rule:
    // - For normal HTML elements and custom components,
    //   no extra closing tag means self-closing, e.g. `<div />`, `<MyComponent />`;
    // - For HTML void elements, no extra closing tag means no closing tags,
    //   e.g. `<br>`, `<img>`, `<input>`
    // Considering it's already common in the community to use `<img src="..." />`,
    // I decided to relax it a little bit for now.
    // TODO: (semver-major) discuss and decide on the future behavior.
    'vue/html-self-closing': ['error', {
      html: {
        void: 'any',
      },
    }],

    // https://eslint.vuejs.org/rules/first-attribute-linebreak.html
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'ignore',
      multiline: 'below',
    }],

    // https://eslint.vuejs.org/rules/no-spaces-around-equal-signs-in-attribute.html
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',

    // https://eslint.vuejs.org/rules/no-template-target-blank.html
    'vue/no-template-target-blank': ['error', {
      // Unllike in the `airbnb-base` ruleset, this is set to `true`,
      // Because neither Vue CLI & Vite targets IE 11 by default.
      allowReferrer: true,

      enforceDynamicLinks: 'always',
    }],

    // https://eslint.vuejs.org/rules/no-child-content.html
    // Already in `plugin:vue/essential` and `plugin:vue/vue3-essential` ruleset.
    // Adding it again here to keep consistency with the JSX rules
    'vue/no-child-content': 'error',

    // https://eslint.vuejs.org/rules/html-closing-bracket-spacing.html
    'vue/html-closing-bracket-spacing': ['error', {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'always',
    }],

    // https://eslint.vuejs.org/rules/html-button-has-type.html
    'vue/html-button-has-type': ['error', {
      button: true,
      submit: true,
      reset: false,
    }],

    // https://eslint.vuejs.org/rules/no-multi-spaces.html
    'vue/no-multi-spaces': 'error',

    // Enforce that all elements that require alternative text have meaningful information
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/alt-text.md
    'vuejs-accessibility/alt-text': ['error', {
      elements: ['img', 'object', 'area', 'input[type="image"]'],
      img: [],
      object: [],
      area: [],
      'input[type="image"]': [],
    }],

    // Enforce that anchors have content
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/anchor-has-content.md
    'vuejs-accessibility/anchor-has-content': ['error', { components: [], accessibleChildren: [], accessibleDirectives: [] }],

    // Enforce all aria-* props are valid.
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/aria-props.md
    'vuejs-accessibility/aria-props': 'error',

    // Require ARIA roles to be valid and non-abstract
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/aria-role.md
    'vuejs-accessibility/aria-role': ['error', { ignoreNonDOM: false }],

    // Enforce that elements that do not support ARIA roles, states, and
    // properties do not have those attributes.
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/aria-unsupported-elements.md
    'vuejs-accessibility/aria-unsupported-elements': 'error',

    // require onClick be accompanied by onKeyUp/onKeyDown/onKeyPress
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/click-events-have-key-events.md
    'vuejs-accessibility/click-events-have-key-events': 'error',

    // Enforce that a control (an interactive element) has a text label.
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/form-control-has-label.md
    'vuejs-accessibility/form-control-has-label': 'error',

    // ensure <hX> tags have content and are not aria-hidden
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/heading-has-content.md
    'vuejs-accessibility/heading-has-content': 'error',

    // Skipped `html-has-lang` rule
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/html-has-lang.md
    // Doesn't make sense for Vue.js - I doubt if anyone uses `<html>` element in Vue.js at all

    // ensure iframe elements have a unique title
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/iframe-has-title.md
    'vuejs-accessibility/iframe-has-title': 'error',

    // Elements with an interactive role and interaction handlers must be focusable
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/interactive-supports-focus.md
    'vuejs-accessibility/interactive-supports-focus': 'error',

    // Enforce that a label tag has a text label and an associated control.
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/label-has-for.md
    // TODO: (semver-major)
    // should migrate once https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/issues/54 is resolved
    'vuejs-accessibility/label-has-for': ['error', {
      // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/issues/119#issuecomment-787999600
      required: {
        some: ['nesting', 'id'],
      },
    }],

    // media elements must have captions
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/media-has-caption.md
    'vuejs-accessibility/media-has-caption': 'error',

    // require that mouseover/out come with focus/blur, for keyboard-only users
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/mouse-events-have-key-events.md
    'vuejs-accessibility/mouse-events-have-key-events': 'error',

    // Prevent use of `accessKey`
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/no-access-key.md
    'vuejs-accessibility/no-access-key': 'error',

    // prohibit autoFocus prop
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-autofocus.md
    'vuejs-accessibility/no-autofocus': ['error', { ignoreNonDOM: true }],

    // prevent distracting elements, like <marquee> and <blink>
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/no-distracting-elements.md
    'vuejs-accessibility/no-distracting-elements': ['error', {
      elements: ['marquee', 'blink'],
    }],

    // This is where we differ from the `vuejs-accessibility/recommended` ruleset
    // So turning it off explicitly here.
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/issues/97
    'vuejs-accessibility/no-onchange': 'off',

    // ensure HTML elements do not specify redundant ARIA roles
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/no-redundant-roles.md
    'vuejs-accessibility/no-redundant-roles': 'error',

    // Enforce that elements with ARIA roles must have all required attributes
    // for that role.
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/role-has-required-aria-props.md
    'vuejs-accessibility/role-has-required-aria-props': 'error',

    // Enforce tabIndex value is not greater than zero.
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/tabindex-no-positive.md
    'vuejs-accessibility/tabindex-no-positive': 'error',

    // TODO: (semver-major)
    // open feature requests for the following missing rules:
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-activedescendant-has-tabindex.md
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-proptypes.md
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-interactive-element-to-noninteractive-role.md
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-interactions.md
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-to-interactive-role.md
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-tabindex.md
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-supports-aria-props.md
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/scope.md

    // https://eslint.vuejs.org/rules/require-default-prop.html
    // Corresponding to the `react/require-default-props` rule
    // https://github.com/airbnb/javascript/blob/cbf9ade10a2f6f06c9da6dbfa25b344bee4bbef6/packages/eslint-config-airbnb/rules/react.js#L390-L394
    'vue/require-default-prop': 'error',

    // https://eslint.vuejs.org/rules/no-potential-component-option-typo.html
    // Corresponding to `react/no-typos` but a little bit different.
    // https://github.com/airbnb/javascript/blob/cbf9ade10a2f6f06c9da6dbfa25b344bee4bbef6/packages/eslint-config-airbnb/rules/react.js#L426-L428
    'vue/no-potential-component-option-typo': 'error',

    // rule: https://eslint.org/docs/rules/no-param-reassign.html
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex/pinia state
        'acc', // for reduce accumulators
        'accumulator', // for reduce accumulators
        'e', // for e.returnvalue
        'ctx', // for Koa routing
        'context', // for Koa routing
        'req', // for Express requests
        'request', // for Express requests
        'res', // for Express responses
        'response', // for Express responses
        '$scope', // for Angular 1 scopes
        'staticContext', // for ReactRouter context
      ],
    }],
  },
}

module.exports = {
  plugins: [
    'react',
  ],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // React 17+ 不用再引入 React
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
  },
  overrides: [
    {
      files: '*.tsx',
      rules: {
        // 优化 .tsx 文件处理 props 默认值的方式
        'react/require-default-props': ['error', { forbidDefaultForRequired: true, functions: 'defaultArguments' }]
      },
    },
  ],
};

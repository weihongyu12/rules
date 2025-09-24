module.exports = {
  plugins: ["react-perf"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react-perf/jsx-no-new-object-as-prop": 'error',
    "react-perf/jsx-no-new-array-as-prop": 'error',
    "react-perf/jsx-no-new-function-as-prop": 'error',
  }
}

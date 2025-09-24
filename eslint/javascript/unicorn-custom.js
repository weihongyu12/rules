module.exports = {
  plugins: [
    'unicorn',
  ],

  rules: {
    // 常见的缩写是众所周知且易于阅读的
    'unicorn/prevent-abbreviations': 'off',
    // Airbnb 更喜欢使用 forEach
    'unicorn/no-array-for-each': 'off',
    // null 在项目中是常见场景
    'unicorn/no-null': 'off',
    // airbnb风格指南要求"基本文件名应该完全匹配其默认导出的名称"
    'unicorn/filename-case': 'off',
  },
};

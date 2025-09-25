module.exports = {
  plugin: [
    'risxss',
  ],
  rules: {
    // RisXSS 规则，预防 XSS 攻击
    'risxss/catch-potential-xss-react': 'error',
  },
}

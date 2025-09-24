module.exports = {
  rules: {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep", "global", "slotted"],
      },
    ],
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep", "v-global", "v-slotted"],
      },
    ],
    "declaration-property-value-no-unknown": [
      true,
      {
        ignoreProperties: { "/.*/": "/v-bind\\(.+\\)/" },
      },
    ],
    "function-no-unknown": [true, { ignoreFunctions: ["v-bind"] }],
  }
}

module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ["import", {
      "libraryName": "elt-ui",
      "libraryDirectory": "src/libs"
    }]
  ]
}

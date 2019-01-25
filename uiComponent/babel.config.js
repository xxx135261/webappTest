module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      "import", {
        "libraryName": "h_ui",
        "libraryDirectory": "dist/lib",
        "camel2DashComponentName": false
      }
    ]
  ]
}

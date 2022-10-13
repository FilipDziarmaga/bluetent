const { defineConfig } = require('cypress')

module.exports = defineConfig({
  failOnStatusCode: false,
  projectId: 'xb5igj',
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },

  env: {
    url_: 'https://www.rezfusionhubdemo.com/hub-test-vacation-rentals'
    
  },
 
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    baseUrl:'https://www.rezfusionhubdemo.com/hub-test-vacation-rentals',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})

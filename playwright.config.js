const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  reporter: 'html',
  retries: 2,
  use: {
    trace: 'retain-on-failure',
    headless: true,
  },

});


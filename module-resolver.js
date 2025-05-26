// This file helps Nuxt with module resolution issues, especially for h3 package

const path = require('path');
const fs = require('fs');
const modulePath = require.resolve('h3');

// This ensures the module can be found
module.exports = {
  h3Path: modulePath,
  resolveModule(name) {
    if (name === 'h3') {
      return modulePath;
    }
    try {
      return require.resolve(name);
    } catch (e) {
      console.warn(`Could not resolve module: ${name}`);
      return null;
    }
  }
};

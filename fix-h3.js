// This script manually creates symbolic links for h3 module if needed
// Run with: node fix-h3.js

const fs = require('fs');
const path = require('path');

function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Creating directory: ${directory}`);
    fs.mkdirSync(directory, { recursive: true });
  }
}

function createSymlink(source, target) {
  try {
    // Ensure the target directory exists
    const targetDir = path.dirname(target);
    ensureDirectoryExists(targetDir);

    // Check if source exists
    if (!fs.existsSync(source)) {
      console.error(`Source file doesn't exist: ${source}`);
      return;
    }

    // Create a symbolic link
    console.log(`Creating symlink from ${source} to ${target}`);
    if (fs.existsSync(target)) {
      console.log(`Target file already exists, removing: ${target}`);
      fs.unlinkSync(target);
    }
    fs.symlinkSync(source, target, 'file');
    console.log(`Successfully created symlink: ${target}`);
  } catch (error) {
    console.error(`Error creating symlink: ${error.message}`);
  }
}

// Main execution
try {
  const projectRoot = path.resolve(__dirname);
  console.log(`Project root: ${projectRoot}`);

  // Find the h3 module location
  const h3ModulePath = path.resolve(projectRoot, 'node_modules/h3/dist/index.mjs');
  console.log(`H3 module path: ${h3ModulePath}`);
  
  if (fs.existsSync(h3ModulePath)) {
    console.log('H3 module found in node_modules.');
    
    // Create the destination directory if needed
    const destinationDir = path.resolve(projectRoot, 'node_modules/nitropack/node_modules/h3/dist');
    ensureDirectoryExists(destinationDir);
    
    // Create the symbolic link
    const destinationPath = path.resolve(destinationDir, 'index.mjs');
    createSymlink(h3ModulePath, destinationPath);
    
    console.log('Symlink created successfully. This should fix the H3 module resolution issue.');
  } else {
    console.error('H3 module not found. Please run npm install h3 first.');
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
}

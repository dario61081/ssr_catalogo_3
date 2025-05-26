/**
 * Script to create symbolic links for critical files
 * Place this file in scripts/optimize-build.js
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

// Function to clear cache
function clearCache() {
  console.log('Clearing Nuxt cache...')
  
  const cacheDirs = [
    path.resolve(__dirname, '../.nuxt'),
    path.resolve(__dirname, '../.output'),
    path.resolve(__dirname, '../.nitro')
  ]
  
  cacheDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      try {
        // Remove cache directory
        fs.rmSync(dir, { recursive: true, force: true })
        console.log(`Removed cache directory: ${dir}`)
      } catch (err) {
        console.error(`Error removing cache directory ${dir}:`, err)
      }
    }
  })
}

// Optimize images in the public directory
function optimizeImages() {
  console.log('Optimizing images...')
  
  const publicDir = path.resolve(__dirname, '../public')
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif']
  
  try {
    // Install sharp if not already installed
    console.log('Ensuring sharp is installed...')
    execSync('npm list sharp || npm install sharp --save-dev', { stdio: 'inherit' })
    
    // Recursive function to process images
    function processDirectory(directory) {
      const files = fs.readdirSync(directory)
      
      files.forEach(file => {
        const filePath = path.join(directory, file)
        const stat = fs.statSync(filePath)
        
        if (stat.isDirectory()) {
          processDirectory(filePath)
        } else if (imageExtensions.includes(path.extname(file).toLowerCase())) {
          try {
            const sharp = require('sharp')
            const outputPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp')
            
            // Skip if WebP version already exists and is newer
            if (fs.existsSync(outputPath) && 
                fs.statSync(outputPath).mtimeMs > stat.mtimeMs) {
              return
            }
            
            // Create WebP version
            sharp(filePath)
              .webp({ quality: 80 })
              .toFile(outputPath)
              .then(() => console.log(`Optimized: ${filePath} -> ${outputPath}`))
              .catch(err => console.error(`Error optimizing ${filePath}:`, err))
          } catch (err) {
            console.error(`Error processing image ${filePath}:`, err)
          }
        }
      })
    }
    
    // Start processing from public directory
    if (fs.existsSync(publicDir)) {
      processDirectory(publicDir)
    }
  } catch (err) {
    console.error('Error in image optimization:', err)
  }
}

// Create H3 symbolic links (reuse from existing fix-h3.js script)
function createH3SymLinks() {
  try {
    console.log('Creating H3 symbolic links...')
    
    const sourceFile = path.resolve(__dirname, '../node_modules/h3/dist/index.mjs')
    const targetDir = path.resolve(__dirname, '../node_modules/nitropack/node_modules/h3/dist')
    const targetFile = path.join(targetDir, 'index.mjs')
    
    // Ensure target directory exists
    ensureDirectoryExists(targetDir)
    
    // Create symbolic link
    if (fs.existsSync(sourceFile) && !fs.existsSync(targetFile)) {
      fs.symlinkSync(sourceFile, targetFile, 'file')
      console.log('Successfully created H3 symbolic link.')
    } else if (fs.existsSync(targetFile)) {
      console.log('H3 symbolic link already exists.')
    } else {
      console.error('Source H3 file not found:', sourceFile)
    }
  } catch (err) {
    console.error('Error creating H3 symbolic links:', err)
  }
}

// Main function
function main() {
  console.log('Starting build optimization...')
  
  // Create H3 symbolic links (fix module resolution issue)
  createH3SymLinks()
  
  // Clear cache
  clearCache()
  
  // Optimize images
  optimizeImages()
  
  console.log('Build optimization completed.')
}

// Run the main function
main()

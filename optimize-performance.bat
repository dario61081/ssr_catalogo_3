@echo off
echo Running performance optimizations for Nuxt application...

:: Create necessary directories if they don't exist
if not exist "scripts" mkdir scripts
if not exist "node_modules" mkdir node_modules

:: Install required dependencies
echo Installing required dependencies...
call npm install h3@1.15.3 --save
call npm install sharp --save-dev

:: Run the build optimization script
echo Running build optimization script...
node scripts/optimize-build.js

:: Clear Nuxt cache
echo Clearing Nuxt cache...
if exist ".nuxt" rd /s /q ".nuxt"
if exist ".output" rd /s /q ".output"

:: Prepare Nuxt for development
echo Preparing Nuxt for development...
call npx nuxt prepare

echo Performance optimizations completed. You can now run 'npm run dev' to start your development server.

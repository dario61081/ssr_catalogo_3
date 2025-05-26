@echo off
echo ===================================
echo H3 Module Resolution Fix Script
echo ===================================
echo.
echo This script will fix the H3 module resolution issue in your Nuxt project.
echo.

echo Step 1: Installing h3 module explicitly...
call npm install --save-exact h3@1.15.3
echo.

echo Step 2: Running the fix-h3.js script to create symbolic links...
call node fix-h3.js
echo.

echo Step 3: Clearing Nuxt cache...
if exist ".nuxt" (
  echo Removing .nuxt directory...
  rd /s /q .nuxt
)
if exist ".output" (
  echo Removing .output directory...
  rd /s /q .output
)
echo.

echo Step 4: Running nuxt prepare...
call npm run postinstall
echo.

echo ===================================
echo Fix completed! You can now run:
echo   npm run dev
echo to start your development server.
echo ===================================

pause

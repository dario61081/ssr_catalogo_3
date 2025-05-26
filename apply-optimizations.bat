@echo off
echo Copying optimized Nuxt configuration...
copy /Y nuxt.config.optimized.ts nuxt.config.ts
echo Configuration updated successfully!
echo.
echo Now execute "npm run optimize-css" to optimize CSS files
echo Then execute "npm run build" to build with optimized assets

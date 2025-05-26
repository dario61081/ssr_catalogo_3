/**
 * Font optimization script
 * This script adds font preloading and display swap to improve performance
 * Place this file in plugins/font-optimization.client.ts
 */

export default defineNuxtPlugin((nuxtApp) => {
	// Add font preloading for critical fonts
	if (process.client) {
		// const fontFiles = [
		//     '/fonts/your-main-font.woff2',
		//     '/fonts/your-heading-font.woff2'
		// ]
		const fontFiles = []

		fontFiles.forEach(fontFile => {
			const link = document.createElement('link')
			link.rel = 'preload'
			link.as = 'font'
			link.type = 'font/woff2'
			link.href = fontFile
			link.crossOrigin = 'anonymous'

			document.head.appendChild(link)
		})

		// Add font-display: swap to all font-face rules
		const styleSheets = document.styleSheets

		try {
			for (let i = 0; i < styleSheets.length; i++) {
				const rules = styleSheets[i].cssRules || styleSheets[i].rules

				if (!rules) continue

				for (let j = 0; j < rules.length; j++) {
					const rule = rules[j]

					if (rule.constructor.name === 'CSSFontFaceRule') {
						// Add font-display: swap if not already present
						if (!(rule as any).style.fontDisplay) {
							(rule as any).style.fontDisplay = 'swap'
						}
					}
				}
			}
		} catch (e) {
			// Handle CORS errors when accessing cross-origin stylesheets
			console.warn('Could not optimize some font-face rules:', e)
		}
	}
})

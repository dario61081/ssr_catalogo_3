/**
 * Accessibility utilities
 * This composable provides functions to improve accessibility throughout the application
 */

export function useAccessibility() {
	/**
	 * Ensures buttons have proper accessibility attributes
	 * @param selector - CSS selector for targeting buttons
	 */
	const makeButtonsAccessible = (selector: string = 'button') => {
		if (process.client) {
			// Wait for DOM to be ready
			window.addEventListener('DOMContentLoaded', () => {
				addAccessibilityToButtons(selector)
			})

			// Also run immediately if DOM is already loaded
			if (document.readyState === 'complete' || document.readyState === 'interactive') {
				addAccessibilityToButtons(selector)
			}
		}
	}

	/**
	 * Adds ARIA attributes to navigation buttons
	 */
	const addAriaToNavigationButtons = () => {
		if (process.client) {
			// Find all carousel navigation buttons
			const prevButtons = document.querySelectorAll('button.left-2, button.left-0')
			const nextButtons = document.querySelectorAll('button.right-2, button.right-0')

			// Add ARIA attributes to previous buttons
			prevButtons.forEach((button) => {
				if (!button.getAttribute('aria-label')) {
					button.setAttribute('aria-label', 'Anterior')
					// Add role if not present
					if (!button.getAttribute('role')) {
						button.setAttribute('role', 'button')
					}
				}
			})

			// Add ARIA attributes to next buttons
			nextButtons.forEach((button) => {
				if (!button.getAttribute('aria-label')) {
					button.setAttribute('aria-label', 'Siguiente')
					// Add role if not present
					if (!button.getAttribute('role')) {
						button.setAttribute('role', 'button')
					}
				}
			})
		}
	}

	/**
	 * Helper function to find and make buttons accessible
	 */
	const addAccessibilityToButtons = (selector: string) => {
		// Get all buttons matching the selector
		const buttons = document.querySelectorAll(selector)

		buttons.forEach((button) => {
			// Skip buttons that already have aria-label or title
			if (button.getAttribute('aria-label') || button.getAttribute('title')) {
				return
			}

			// Check if it's a navigation button
			const isLeftButton = button.classList.contains('left-2') || button.classList.contains('left-0')
			const isRightButton = button.classList.contains('right-2') || button.classList.contains('right-0')

			if (isLeftButton) {
				button.setAttribute('aria-label', 'Anterior')
			} else if (isRightButton) {
				button.setAttribute('aria-label', 'Siguiente')
			} else {
				// For other buttons, try to use inner text or a default
				const buttonText = button.textContent?.trim()
				if (buttonText) {
					button.setAttribute('aria-label', buttonText)
				} else {
					// If no text, use a generic label + a unique identifier
					const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2)
					button.setAttribute('aria-label', `Botón ${uniqueId}`)
				}
			}

			// Ensure role is set
			if (!button.getAttribute('role')) {
				button.setAttribute('role', 'button')
			}
		})
	}

	return {
		makeButtonsAccessible,
		addAriaToNavigationButtons
	}
}

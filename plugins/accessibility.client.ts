/**
 * Accessibility plugin
 * This plugin automatically adds accessibility attributes to elements 
 * that need them, such as buttons without accessible names.
 */

import { useAccessibility } from '~/composables/useAccessibility'

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        // Get accessibility utilities
        const { makeButtonsAccessible, addAriaToNavigationButtons } = useAccessibility()

        // Add hook for when app is mounted
        nuxtApp.hook('app:mounted', () => {
            // Fix carousel navigation buttons
            addAriaToNavigationButtons()

            // Make all buttons accessible
            makeButtonsAccessible('button')
        })

        // Also set up a mutation observer to catch dynamically added buttons
        const setupMutationObserver = () => {
            const observer = new MutationObserver((mutations) => {
                let shouldCheck = false

                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        shouldCheck = true
                    }
                })

                if (shouldCheck) {
                    // Add accessibility attributes to new buttons
                    addAriaToNavigationButtons()
                    makeButtonsAccessible('button')
                }
            })

            // Start observing the document with the configured parameters
            observer.observe(document.body, {
                childList: true,
                subtree: true
            })

            return observer
        }

        let observer: MutationObserver

        // Setup observer when ready
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            observer = setupMutationObserver()
        } else {
            window.addEventListener('DOMContentLoaded', () => {
                observer = setupMutationObserver()
            })
        }

        // Cleanup observer when plugin is unloaded
        nuxtApp.hook('app:unmounted', () => {
            if (observer) {
                observer.disconnect()
            }
        })
    }
})

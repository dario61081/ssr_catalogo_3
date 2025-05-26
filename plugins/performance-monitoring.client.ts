/**
 * Performance monitoring script
 * This script adds basic performance monitoring
 * Place this file in plugins/performance-monitoring.client.ts
 */

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        // Wait until the page is fully loaded
        window.addEventListener('load', () => {
            // Use requestIdleCallback to avoid impacting page load performance
            if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(() => {
                    measurePerformance()
                })
            } else {
                setTimeout(() => {
                    measurePerformance()
                }, 1000)
            }
        })
    }
})

function measurePerformance() {
    try {
        // Only run in production to avoid development noise
        if (process.env.NODE_ENV !== 'production') return

        // Use the Performance API to get key metrics
        const perfEntries = performance.getEntriesByType('navigation')

        if (perfEntries.length > 0) {
            const navEntry = perfEntries[0] as PerformanceNavigationTiming

            // Record basic performance metrics
            const metrics = {
                // Time to First Byte
                ttfb: navEntry.responseStart - navEntry.requestStart,
                // DOM Content Loaded
                domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.fetchStart,
                // Load Time
                loadTime: navEntry.loadEventEnd - navEntry.fetchStart,
                // First Paint (calculated below)
                firstPaint: 0,
                // DOM Size
                domElements: document.querySelectorAll('*').length
            }

            // Get first paint time if available
            const paintEntries = performance.getEntriesByType('paint')
            const firstPaintEntry = paintEntries.find(entry => entry.name === 'first-paint')

            if (firstPaintEntry) {
                metrics.firstPaint = firstPaintEntry.startTime
            }

            logPerformanceMetrics(metrics)
        }
    } catch (e) {
        console.warn('Could not measure performance metrics:', e)
    }
}

interface PerformanceMetrics {
    ttfb: number;
    domContentLoaded: number;
    loadTime: number;
    firstPaint: number;
    domElements: number;
}

function logPerformanceMetrics(metrics: PerformanceMetrics) {
    // Log metrics to console in development
    console.log('Performance metrics:', metrics)

    // In a real implementation, you would send these metrics to your analytics service
    // Example implementation:
    /*
    fetch('/api/log-performance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(metrics),
      // Use keepalive to ensure the request completes even if the page is unloaded
      keepalive: true
    }).catch(err => console.error('Failed to log performance metrics:', err))
    */

    // Display performance info visually if in development
    if (process.env.NODE_ENV === 'development') {
        showPerformanceInfo(metrics)
    }
}

function showPerformanceInfo(metrics: PerformanceMetrics) {
    // Create a simple performance display in the corner of the page
    const div = document.createElement('div')
    div.style.position = 'fixed'
    div.style.bottom = '10px'
    div.style.right = '10px'
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    div.style.color = 'white'
    div.style.padding = '10px'
    div.style.borderRadius = '5px'
    div.style.fontSize = '12px'
    div.style.fontFamily = 'monospace'
    div.style.zIndex = '9999'

    div.innerHTML = `
    <div>TTFB: ${metrics.ttfb.toFixed(2)}ms</div>
    <div>First Paint: ${metrics.firstPaint.toFixed(2)}ms</div>
    <div>DOM Loaded: ${metrics.domContentLoaded.toFixed(2)}ms</div>
    <div>Load Time: ${metrics.loadTime.toFixed(2)}ms</div>
    <div>DOM Elements: ${metrics.domElements}</div>
  `

    document.body.appendChild(div)
}

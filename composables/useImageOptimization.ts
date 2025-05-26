// This file contains utilities for optimizing images and preventing layout shifts
// Place this in /composables/useImageOptimization.ts

export function useImageOptimization() {
    // Generate responsive image srcset based on an image URL
    const getResponsiveImage = (imageUrl: string) => {
        if (!imageUrl) return { src: '/placeholder.webp', srcset: '' }

        // Define breakpoints for responsive images
        const breakpoints = [320, 640, 768, 1024, 1280, 1536]

        // Generate srcset string
        const srcset = breakpoints
            .map(width => `${imageUrl}?width=${width} ${width}w`)
            .join(', ')

        return {
            src: imageUrl,
            srcset,
            sizes: '(max-width: 320px) 320px, (max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, 1536px'
        }
    }

    // Helper to prevent CLS by maintaining aspect ratio
    const getImageWrapper = (width: number, height: number) => {
        const paddingBottom = (height / width) * 100

        return {
            style: {
                position: 'relative',
                paddingBottom: `${paddingBottom}%`,
                width: '100%',
                height: '0',
                overflow: 'hidden'
            }
        }
    }

    // Convert image URLs to WebP when possible
    const getWebPUrl = (imageUrl: string) => {
        if (!imageUrl) return '/placeholder.webp'

        // Check if URL already has a query string
        const hasQuery = imageUrl.includes('?')
        const connector = hasQuery ? '&' : '?'

        return `${imageUrl}${connector}format=webp`
    }

    return {
        getResponsiveImage,
        getImageWrapper,
        getWebPUrl
    }
}

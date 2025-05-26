// This is a utility file to create lazy-loaded components
// Place this in /composables/useLazyComponents.ts

export function useLazyComponents() {
    // Define components that should be lazy loaded
    const LazyProductCard = defineAsyncComponent(() =>
        import('~/components/ProductCard.vue')
    )

    const LazyProductGallery = defineAsyncComponent(() =>
        import('~/components/ProductGallery.vue')
    )

    const LazyHeroSlider = defineAsyncComponent(() =>
        import('~/components/HeroSlider.vue')
    )

    return {
        LazyProductCard,
        LazyProductGallery,
        LazyHeroSlider
    }
}

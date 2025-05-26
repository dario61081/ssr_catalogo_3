<template>
    <button :class="[
        'absolute top-1/2 -translate-y-1/2 z-20',
        'bg-gray-800/60 hover:bg-gray text-white rounded-full w-8',
        position === 'left' ? 'left-2' : 'right-2'
    ]" :aria-label="position === 'left' ? 'Anterior' : 'Siguiente'" role="button" @click="$emit('click')">
        <span class="sr-only">{{ position === 'left' ? 'Anterior' : 'Siguiente' }}</span>
        <slot>
            {{ position === 'left' ? '‹' : '›' }}
        </slot>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    position: 'left' | 'right'
}>()

defineEmits<{
    (e: 'click'): void
}>()
</script>

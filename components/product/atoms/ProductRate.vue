<template>
    <div 
        class="product-rate" 
        :aria-label="`Rating: ${rating} out of 5 stars`"
        role="radiogroup"
    >
        <span 
            v-for="star in 5" 
            :key="star" 
            class="star" 
            :class="{ 
                filled: star <= rating,
                'hover-effect': isClickable && star <= hoverRating 
            }" 
            @click="handleClick(star)"
            @mouseover="handleHover(star)"
            @mouseleave="handleMouseLeave"
            role="radio"
            :aria-checked="star <= rating"
            :tabindex="isClickable ? 0 : -1"
        >
            ★
        </span>
    </div>
</template>

<script>
export default {
    name: "ProductRate",
    props: {
        rating: {
            type: Number,
            required: true,
            default: 0,
            validator: value => value >= 0 && value <= 5
        },
        isClickable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            hoverRating: 0
        }
    },
    methods: {
        handleClick(star) {
            if (!this.isClickable) return;
            this.$emit('update:rating', star);
        },
        handleHover(star) {
            if (!this.isClickable) return;
            this.hoverRating = star;
        },
        handleMouseLeave() {
            this.hoverRating = 0;
        }
    }
};
</script>

<style scoped>
.product-rate {
    display: flex;
    gap: 4px;
}

.product-rate[role="radiogroup"] {
    cursor: pointer;
}

.star {
    font-size: 24px;
    color: #ccc;
    transition: color 0.2s ease-in-out;
}

.star.filled {
    color: #f5c518;
}

.star.hover-effect {
    color: #ffd700;
}

.star:focus {
    outline: 2px solid #4a90e2;
    border-radius: 4px;
}

.product-rate:not([role="radiogroup"]) .star {
    cursor: default;
    pointer-events: none;
}
</style>
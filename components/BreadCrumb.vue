<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li
                v-for="(crumb, index) in breadcrumbs"
                :key="index"
                class="breadcrumb-item"
                :class="{ active: index === breadcrumbs.length - 1 }"
            >
                <router-link v-if="index !== breadcrumbs.length - 1" :to="crumb.path">
                    {{ crumb.name }}
                </router-link>
                <span v-else>{{ crumb.name }}</span>
            </li>
        </ol>
    </nav>
</template>

<script>
import { useRoute } from "vue-router";

export default {
    name: "BreadCrumb",
    setup() {
        const route = useRoute();

        const breadcrumbs = route.matched.map((match) => ({
            name: match.meta.breadcrumb || match.name,
            path: match.path,
        }));

        return {
            breadcrumbs,
        };
    },
};
</script>

<style scoped>
.breadcrumb {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
}

.breadcrumb-item {
    margin-right: 0.5rem;
}

.breadcrumb-item.active {
    font-weight: bold;
}

.breadcrumb-item::after {
    content: ">";
    margin-left: 0.5rem;
}

.breadcrumb-item:last-child::after {
    content: "";
}
</style>
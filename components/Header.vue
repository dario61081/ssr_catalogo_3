<template>
  <header class="bg-white shadow-sm">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center">
<!--        <NuxtLink to="/" class="font-semibold text-gray-900">-->
<!--          <img src="/img/logo.svg" alt="Parana Hogar"> -->
<!--        </NuxtLink>-->
        <img src="/img/logo.svg" alt="Parana Hogar">
        <div class="hidden md:flex space-x-8 ml-10">
          <NuxtLink to="/" class="text-gray-500 hover:text-gray-900">Home</NuxtLink>
<!--          <NuxtLink to="/pages" class="text-gray-500 hover:text-gray-900">Pages</NuxtLink>-->
<!--          <NuxtLink to="/shop" class="text-gray-500 hover:text-gray-900">Shop</NuxtLink>-->
<!--          <NuxtLink to="/blog" class="text-gray-500 hover:text-gray-900">Blog</NuxtLink>-->
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <button class="text-gray-500 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button class="text-gray-500 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
        <button class="text-gray-500 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
import "font-awesome/css/font-awesome.min.css"
</script>
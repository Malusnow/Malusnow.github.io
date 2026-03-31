<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
    <LayoutNav />
    <RouterView />
    <LayoutFooter />
</template>
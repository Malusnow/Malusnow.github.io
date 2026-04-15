<script setup>
const props = defineProps({
  content: {
    type: String,
    required: true,
    default: '',
  },
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="notFound">Blog post not found.</div>
  <div v-else v-html="props.content" class="prose prose-slate dark:prose-invert max-w-none"></div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>

<script setup>
import ProfileSidebar from './components/ProfileSidebar.vue';
</script>

<template>
  <main class="max-w-350 w-full mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-8">
      <aside>
        <ProfileSidebar />
      </aside>

      <section>
        <div class="text-2xl font-bold mb-4">Welcome to My Blog</div>
        <p class="text-gray-600 mb-6">
          This is a simple blog built with Vue.js. Here you can find articles about web development, programming, and more.
        </p>

        <div class="space-y-4">
          <div class="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div class="text-lg font-semibold">First Blog Post</div>
            <p class="text-gray-600">This is the summary of the first blog post. Click to read more.</p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
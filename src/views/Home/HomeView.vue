<script setup>
import ProfileSidebar from './components/ProfileSidebar.vue';
import BlogList from './components/BlogList.vue';
</script>

<template>
  <main class="max-w-350 w-full mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-16">
      <aside>
        <ProfileSidebar />
      </aside>

      <section>
        <BlogList />
      </section>
    </div>
  </main>
</template>
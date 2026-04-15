<script setup>
import { getAllPostsMetadata } from '@/lib/parse'

const posts = getAllPostsMetadata()

const postsByYear = () => {
  const map = {}
  posts.forEach((post) => {
    const year = new Date(post.date).getFullYear()
    if (!map[year]) {
      map[year] = []
    }
    map[year].push(post)
  })
  return map
}
</script>

<template>
  <main>
    <div class="my-8 mx-64 border border-border rounded-2xl shadow-2xl bg-card">
      <section>
        <div v-for="(yearPosts, year) in postsByYear()" :key="year" class="p-8">
          <h2 class="text-2xl font-bold mb-4">{{ year }}</h2>
          <ul class="space-y-4">
            <li v-for="post in yearPosts" :key="post.id" class="border-l-2 border-chart-2 pl-4">
              <div class="flex items-center text-sm text-muted-foreground mb-1">
                <span class="h-4 w-0.5 rounded-full bg-zinc-200"></span>
                <span class="mx-1">{{ post.date }}</span>
              </div>
              <h2 class="text-xl font-semibold">
                <a
                  :href="`/blog/${encodeURIComponent(post.id)}`"
                  class="text-foreground hover:text-chart-2 transition-colors"
                >
                  {{ post.title }}
                </a>
              </h2>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </main>
</template>

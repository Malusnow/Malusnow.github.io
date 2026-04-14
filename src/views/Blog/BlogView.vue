<script setup>
import ArticleContent from './components/ArticleContent.vue'
import CommentSection from './components/CommentSection.vue'
import TocSidebar from './components/TocSidebar.vue'
</script>

<template>
  <div class="flex max-w-7xl gap-8 items-start mx-20">
    <!-- 左侧：文章 + 评论  -->
    <main class="flex-1 min-w-0 py-8">
      <div class="space-y-6 p-6 bg-card rounded-lg border border-border shadow-sm">
        <ArticleContent />
        <hr class="border-border" />
        <CommentSection />
      </div>
    </main>

    <!-- 右侧：TOC (固定宽度且吸顶) -->
    <aside class="hidden lg:block w-64 shrink-0 sticky top-4 py-8">
      <TocSidebar />
    </aside>
  </div>
</template>

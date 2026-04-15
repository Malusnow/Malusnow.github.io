<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { gfmHeadingId, getHeadingList } from 'marked-gfm-heading-id'
import { getPostById } from '@/lib/parse'
import ArticleContent from './components/ArticleContent.vue'
import CommentSection from './components/CommentSection.vue'
import TocSidebar from './components/TocSidebar.vue'

marked.use(gfmHeadingId())

const route = useRoute()
const postData = ref(null)
const htmlContent = ref('')
const tocItems = ref([])

watchEffect(async () => {
  const id = String(route.params.id || '')
  const post = getPostById(id)

  if (post) {
    postData.value = post
    // 解析并提取 TOC
    htmlContent.value = DOMPurify.sanitize(await marked.parse(post.body))
    tocItems.value = getHeadingList().map((item) => ({
      id: item.id,
      label: item.text,
      level: item.level,
    }))
  }
})
</script>

<template>
  <div class="flex max-w-7xl gap-8 items-start mx-20">
    <!-- 左侧：文章 + 评论  -->
    <main class="flex-1 min-w-0 py-8">
      <div class="space-y-6 p-6 bg-card rounded-lg border border-border shadow-sm">
        <ArticleContent :content="htmlContent" />
        <hr class="border-border" />
        <CommentSection />
      </div>
    </main>

    <!-- 右侧：TOC (固定宽度且吸顶) -->
    <aside class="hidden lg:block w-64 shrink-0 sticky top-4 py-8">
      <TocSidebar :toc-items="tocItems" :postData="postData" />
    </aside>
  </div>
</template>

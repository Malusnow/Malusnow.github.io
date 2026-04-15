<script setup>
import { nextTick, ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  tocItems: {
    type: Array,
    required: true,
    default: () => [],
  },
  postData: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})
const active = ref('')

let observer = null
// 监听视口标题，更新tocItem的状态
const updateObserver = async () => {
  if (observer) {
    observer.disconnect()
  }

  // 等DOM渲染完成
  await nextTick()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          active.value = entry.target.id
        }
      })
    },
    { rootMargin: '0px 0px -80% 0px' }, // 提前触发，适合标题较高的情况
  )
  props.tocItems.forEach((item) => {
    const el = document.getElementById(item.id)
    if (el) {
      observer.observe(el)
    }
  })
}

watch(
  () => props.tocItems,
  () => {
    updateObserver()
  },
  { immediate: true, deep: true },
)

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <h2 class="text-[0.8rem] mb-2">目录</h2>
  <div class="text-[1rem] font-semibold mb-2">{{ props.postData.title }}</div>
  <ul class="list-none list-inside space-y-1">
    <li
      v-for="item in props.tocItems"
      :key="item.id"
      @click="active = item.id"
      :class="[
        'py-1.5 cursor-pointer transition-colors',
        'border-l-2 text-sm',
        // 根据 active 状态和 heading level 应用不同的样式
        active === item.id
          ? 'border-red-500 text-red-400 italic font-medium'
          : item.level === 1
            ? 'border-transparent text-zinc-500 hover:text-zinc-300'
            : 'border-l border-dashed border-zinc-200 text-zinc-500 hover:text-zinc-300',
      ]"
      :style="`margin-left: ${(item.level - 1) * 1.25}rem; padding-left: 8px;`"
    >
      <a :href="'#' + item.id">
        {{ item.label }}
      </a>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 定义你的名言列表
const quotes = [
  "Amor Fati.",
  "人生得意须尽欢。",
]

const currentText = ref('')
const currentIndex = ref(0) // 当前正在打第几句
const isDeleting = ref(false) // 是否正在删除
const typingSpeed = 300 // 打字速度 (毫秒)
const deletingSpeed = 100  // 删除速度 (毫秒)
const pauseTime = 1500    // 打完后的停顿时间 (毫秒)

const loop = () => {
  const currentQuote = quotes[currentIndex.value]
  
  if (isDeleting.value) {
    // 删除逻辑：从后往前删
    currentText.value = currentQuote.substring(0, currentText.value.length - 1)
    
    // 如果删完了
    if (currentText.value.length === 0) {
      isDeleting.value = false
      // 切换到下一句，如果到了最后一句就回到第一句
      currentIndex.value = (currentIndex.value + 1) % quotes.length
      setTimeout(loop, 500) // 空白停顿一下再开始打
    } else {
      setTimeout(loop, deletingSpeed)
    }
  } else {
    // 打字逻辑：从前往后加
    currentText.value = currentQuote.substring(0, currentText.value.length + 1)
    
    // 如果打完了
    if (currentText.value.length === currentQuote.length) {
      isDeleting.value = true
      setTimeout(loop, pauseTime) // 停顿一下再开始删
    } else {
      setTimeout(loop, typingSpeed)
    }
  }
}

// 页面加载后开始
onMounted(() => {
  loop()
})
</script>


<template>
  <div class="font-serif text-muted-foreground text-md whitespace-nowrap w-fit">
    <span class="text">{{ currentText }}</span>
    <span class="animate-pulse">|</span>
  </div>
</template>
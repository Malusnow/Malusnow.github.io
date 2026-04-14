<script setup></script>

<template>
  <div class="p-4 border rounded-lg bg-card">
    <h2 class="text-lg font-semibold mb-2">目录</h2>
    <ul class="list-disc list-inside space-y-1">
      <li v-for="item in tocItems" :key="item.id">
        <a :href="'#' + item.id" class="text-blue-600 hover:underline">
          {{ item.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

</script>

<template>
    <!-- hidden md:block 表示在手机端隐藏占位，防止手机堆叠时出现大片空白 -->
    <div class="flex justify-center items-center m-4 h-48 mb-12 w-full max-md:hidden">
        <div class="text-2xl font-bold">Welcome to My Blog</div>
    </div>

    
    <!-- <p class="text-gray-600 mb-6">
        This is a simple blog built with Vue.js. Here you can find articles about web development, programming, and more.
    </p> -->
    <div class="space-y-4 my-14">
        <article class="md:grid md:grid-cols-6">
            <div class="relative isolate flex flex-col items-start rounded-2xl px-4 py-6 hover:bg-sidebar-ring/30 md:col-span-5 border border-border">
            <h2 class="text-base font-semibold tracking-tight text-foreground">
                <a href="javascript:;" @click="router.push('/blog')">
                <span class="absolute inset-0 z-10"></span>
                Crafting a design system for a multiplanetary future
                </a>
            </h2>
            <time class="relative order-first mb-3 flex items-center pl-3.5 text-sm text-muted-foreground md:hidden" datetime="2022-09-05">
                <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true"><span class="h-4 w-0.5 rounded-full bg-zinc-200"></span></span>
                September 5, 2022
            </time>
            <p class="mt-2 text-sm text-muted-foreground">Most companies try to stay ahead of the curve when it comes to visual design, but for Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.</p>
            <div aria-hidden="true" class="mt-4 flex items-center text-sm font-medium text-chart-2">Read article &rarr;</div>
            </div>
            <time class="order-first hidden text-sm text-muted-foreground md:block" datetime="2022-09-05">September 5, 2022</time>
        </article>
        <article class="md:grid md:grid-cols-6">
            <div class="relative isolate flex flex-col items-start rounded-2xl px-4 py-6 hover:bg-sidebar-ring/30 md:col-span-5 border border-border">
            <h2 class="text-base font-semibold tracking-tight text-foreground">
                <a href="javascript:;" @click="router.push('/blog')">
                <span class="absolute inset-0 z-10"></span>
                Introducing Animaginary: High performance web animations
                </a>
            </h2>
            <time class="relative order-first mb-3 flex items-center pl-3.5 text-sm text-muted-foreground md:hidden" datetime="2022-09-02">
                <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true"><span class="h-4 w-0.5 rounded-full bg-zinc-200"></span></span>
                September 2, 2022
            </time>
            <p class="mt-2 text-sm text-muted-foreground">When you're building a website for a company as ambitious as Planetaria, you need to make an impression. I wanted people to visit our website and see animations that looked more realistic than reality itself.</p>
            <div aria-hidden="true" class="mt-4 flex items-center text-sm font-medium text-chart-2">Read article &rarr;</div>
            </div>
            <time class="order-first hidden text-sm text-muted-foreground md:block" datetime="2022-09-02">September 2, 2022</time>
        </article>
    </div>
</template>
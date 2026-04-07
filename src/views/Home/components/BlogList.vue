<script setup>
import { useRouter } from 'vue-router';
import { getAllPostsMetadata } from '@/lib/parse';
const router = useRouter();
const posts = getAllPostsMetadata();
        
const goToPost = (id) => {
    router.push(`/blog/${encodeURIComponent(id)}`);
};

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
        <article v-for="post in posts" :key="post.id" class="md:grid md:grid-cols-6">
            <div class="relative isolate flex flex-col items-start rounded-2xl px-4 py-6 hover:bg-sidebar-ring/30 md:col-span-5 border border-border">
            <h2 class="text-base font-semibold tracking-tight text-foreground">
                <a href="javascript:;" @click="goToPost(post.id)">
                <span class="absolute inset-0 z-10"></span>
                {{ post.title }}
                </a>
            </h2>
            <time class="relative order-first mb-3 flex items-center pl-3.5 text-sm text-muted-foreground md:hidden" :datetime="post.date">
                <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true"><span class="h-4 w-0.5 rounded-full bg-zinc-200"></span></span>
                {{ post.date }}
            </time>
            <p class="mt-2 text-sm text-muted-foreground">{{ post.description }}</p>
            <div aria-hidden="true" class="mt-4 flex items-center text-sm font-medium text-chart-2">Read article &rarr;</div>
            </div>
            <time class="order-first hidden text-sm text-muted-foreground md:block" :datetime="post.date">{{ post.date }}</time>
        </article>
    </div>
</template>
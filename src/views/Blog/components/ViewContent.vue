<script setup>
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getDefaultPostId, getPostById } from '@/lib/parse';

const route = useRoute();
const router = useRouter();
const content = ref('');
const loading = ref(true);
const notFound = ref(false);

watchEffect(async () => {
    loading.value = true;
    notFound.value = false;
    content.value = '';

    try {
        const idFromRoute = String(route.params.id || '');
        const defaultId = getDefaultPostId();

        if (!idFromRoute && defaultId) {
            await router.replace(`/blog/${encodeURIComponent(defaultId)}`);
            return;
        }

        const id = idFromRoute || defaultId;
        const post = getPostById(id);

        if (!post) {
            throw new Error('Blog post not found');
        }

        const parsedHtml = await marked.parse(post.body);
        content.value = DOMPurify.sanitize(parsedHtml);
    } catch {
        notFound.value = true;
    } finally {
        loading.value = false;
    }
})

</script>

<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="notFound">Blog post not found.</div>
    <div v-else v-html="content"></div>
</template>
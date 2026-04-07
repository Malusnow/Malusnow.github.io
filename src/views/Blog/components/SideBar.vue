<script setup>
import img from '@/assets/1.png'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import ViewContent from './ViewContent.vue'
import { useRouter } from 'vue-router';
import { getAllPostsMetadata } from '@/lib/parse';
const posts = getAllPostsMetadata();
const router = useRouter();

const groupedPosts = Object.entries(
  posts.reduce((acc, post) => {
    const year = String(post.date || '').slice(0, 4) || '未分类';
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {})
)
  .sort(([a], [b]) => b.localeCompare(a))
  .map(([year, items]) => ({ year, items }));

const goToPost = (id) => {
    router.push(`/blog/${encodeURIComponent(id)}`);
};
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <!-- 个人资料 -->
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div class="flex aspect-square size-8 items-center justify-center border rounded-2xl border-ring/50  text-sidebar-primary-foreground">
                <img :src="img" class="object-cover rounded-2xl" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">Malus</span>
                <span class="truncate text-xs">malusnow121@gmail.com</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup v-for="group in groupedPosts" :key="group.year">
          <span class="text-xs m-2 text-muted-foreground">{{ group.year }}</span>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="post in group.items" :key="post.id">
                <SidebarMenuButton as-child>
                  <a href="#" @click.prevent="goToPost(post.id)">
                    <span>{{ post.title }}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
    <!-- 文章内容 -->
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <ViewContent />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '@/views/Layout/LayoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LayoutView,
      children: [
        {
          path: '',
          component: () => import('@/views/Home/HomeView.vue'),
        },
        {
          path: 'blog/:id?',
          component: () => import('@/views/Blog/BlogView.vue'),
        }
      ]
    },
    
  ],
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    }
  }
})

export default router

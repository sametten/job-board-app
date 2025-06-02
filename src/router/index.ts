import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import JobDetail from '@/views/JobDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/job/:id',
      name: 'job-detail',
      component: JobDetail
    }
  ]
})

export default router
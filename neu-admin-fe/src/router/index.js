import { createRouter, createWebHistory } from 'vue-router'
import ProgramsManagePage from '../views/ProgramsManagePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'programs-manage-page',
      component: ProgramsManagePage
    },
    

  ]
})

export default router

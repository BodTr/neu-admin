import { createRouter, createWebHistory } from 'vue-router'
import ProgramsManagePage from '../views/ProgramsManagePage.vue'
import TransnationProgramsManagePage from '../views/TransnationProgramsManagePage.vue'
import ApprovalDecisionManagePage from '../views/ApprovalDecisionManagePage.vue'
import IdArrayLengthOneErrorPage from '../views/IdArrayLengthOneErrorPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'programs-manage-page',
      component: ProgramsManagePage,
      meta: { 
        requiresProgramId: false
      }
    },
    
    {
      path: '/general-infor/trans-program/:id',
      name: 'trans-programs-manage-page',
      component: TransnationProgramsManagePage,
      meta: { 
        requiresProgramId: true
      }
    },
    {
      path: '/general-infor/approval-decision',
      name: 'approval-decision-manage-page',
      component: ApprovalDecisionManagePage,
      meta: { 
        requiresProgramId: true
      },
    },
    {
      path: '/idarray-error-page',
      name: 'id-array-error-page',
      component: IdArrayLengthOneErrorPage
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import ProgramsManagePage from '../views/ProgramsManagePage.vue'
import TransnationProgramsManagePage from '../views/TransnationProgramsManagePage.vue'
import ApprovalDecisionManagePage from '../views/ApprovalDecisionManagePage.vue'
import IdArrayLengthOneErrorPage from '../views/IdArrayLengthOneErrorPage.vue'
import DocumentManagePage from '../views/DocumentManagePage.vue'
import AgenciesManagePage from '../views/AgenciesManagePage.vue'
import PartnersManagePage from '../views/PartnersManagePage.vue'


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
      path: '/general-infor/approval-decision/:id',
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
    },
    {
      path: '/general-infor/documents/:id',
      name: 'documents-manage-page',
      component: DocumentManagePage,
      meta: { 
        requiresProgramId: true
      },
    },
    {
      path: '/general-infor/agencies/:id',
      name: 'agencies-manage-page',
      component: AgenciesManagePage,
      meta: { 
        requiresProgramId: true
      },
    },
    {
      path: '/general-infor/partners/:id',
      name: 'partners-manage-page',
      component: PartnersManagePage,
      meta: { 
        requiresProgramId: true
      },
    },
  ]
})

export default router

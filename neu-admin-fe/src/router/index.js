import { createRouter, createWebHistory } from 'vue-router'
import ProgramsManagePage from '../views/ProgramsManagePage.vue'
import TransnationProgramsManagePage from '../views/TransnationProgramsManagePage.vue'
import ApprovalDecisionManagePage from '../views/ApprovalDecisionManagePage.vue'
import IdArrayLengthOneErrorPage from '../views/IdArrayLengthOneErrorPage.vue'
import DocumentManagePage from '../views/DocumentManagePage.vue'
import AgenciesManagePage from '../views/AgenciesManagePage.vue'
import PartnersManagePage from '../views/PartnersManagePage.vue'
import ProgramGoalsManagePage from '../views/ProgramGoalsManagePage.vue'
import PlansManagePage from '../views/PlansManagePage.vue'
import EducationQualityManagePage from '../views/EducationQualityManagePage.vue'
import CurriculumManagePage from '../views/CurriculumManagePage.vue'
import EnrollmentManagePage from '../views/EnrollmentManagePage.vue'
import LecturersManagePage from '../views/LecturersManagePage.vue'
import UnitsManagePage from '../views/UnitsManagePage.vue'

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
    {
      path: '/general-infor/goals/:id',
      name: 'goals-manage-page',
      component: ProgramGoalsManagePage,
      meta: { 
        requiresProgramId: true
      },
    },
    {
      path: '/plans-infor/plans/:id',
      name: 'plans-manage-page',
      component: PlansManagePage,
      meta: { 
        requiresProgramId: true
      },
    },
    {
      path: '/edu-quality/processes/:id',
      name: 'edu-quality-manage-page',
      component: EducationQualityManagePage,
      meta: { 
        requiresProgramId: true
      },
    },
    {
      path: '/curriculums/curriculum-infor/:id',
      name: 'curriculums-manage-page',
      component: CurriculumManagePage,
      meta: { 
        requiresProgramId: true
      },
    },
    {
      path: '/enrollment/enrollment-infor/:id',
      name: 'enrollment-manage-page',
      component: EnrollmentManagePage,
      meta: { 
        requiresProgramId: true
      },
    },
    {
      path: '/enrollment/lecturers-infor/:id',
      name: 'lecturers-manage-page',
      component: LecturersManagePage,
      meta: { 
        requiresProgramId: true
      },
    },
    {
      path: '/enrollment/units-infor/:id',
      name: 'units-manage-page',
      component: UnitsManagePage,
      meta: { 
        requiresProgramId: true
      },
    },
  ]
})

export default router

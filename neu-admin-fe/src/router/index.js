import { createRouter, createWebHistory } from 'vue-router'
import ProgramsManagePage from '../views/ProgramsManagePage.vue'
import TransnationProgramsManagePage from '../views/TransnationProgramsManagePage.vue'
import ApprovalDecisionManagePage from '../views/ApprovalDecisionManagePage.vue'
import CloseDecisionManagePage from '../views/CloseDecisionManagePage.vue'
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
import SubjectsManagePage from '../views/SubjectsManagePage.vue'
import MOUMOAManagePage from '../views/MOUMOAManagePage.vue'
import HTQTManagePage from '../views/HTQTManagePage.vue'
import ExchangeForeignStudentManagePage from '../views/ExchangeForeignStudentManagePage.vue'
import StudentManagePage from '../views/StudentManagePage.vue'

import ExchangeStudentManagePage from '../views/ExchangeStudentManagePage.vue'
import VISAManagePage from '../views/VISAManagePage.vue'
import Admin from '../views/Admin.vue'
import LoginPage from '../views/LoginScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'programs-manage-page',
      component: ProgramsManagePage,
      meta: { 
        
        requiresAuth: true
      }
    },
    
    {
      path: '/general-infor/trans-program/',
      name: 'trans-programs-manage-page',
      component: TransnationProgramsManagePage,
      meta: { 
        
        requiresAuth: true
      }
    },
    {
      path: '/general-infor/approval-decision/',
      name: 'approval-decision-manage-page',
      component: ApprovalDecisionManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/general-infor/close-decision/',
      name: 'close-decision-manage-page',
      component: CloseDecisionManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/idarray-error-page',
      name: 'id-array-error-page',
      component: IdArrayLengthOneErrorPage
    },
    {
      path: '/general-infor/documents/',
      name: 'documents-manage-page',
      component: DocumentManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/general-infor/agencies/',
      name: 'agencies-manage-page',
      component: AgenciesManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/general-infor/partners/',
      name: 'partners-manage-page',
      component: PartnersManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/general-infor/goals/',
      name: 'goals-manage-page',
      component: ProgramGoalsManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/plans-infor/plans/',
      name: 'plans-manage-page',
      component: PlansManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/edu-quality/processes/',
      name: 'edu-quality-manage-page',
      component: EducationQualityManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/curriculums/curriculum-infor/',
      name: 'curriculums-manage-page',
      component: CurriculumManagePage,
      meta: { 

        requiresAuth: true
      },
    },
    {
      path: '/enrollment/enrollment-infor/',
      name: 'enrollment-manage-page',
      component: EnrollmentManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/enrollment/lecturers-infor/',
      name: 'lecturers-manage-page',
      component: LecturersManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/enrollment/units-infor/',
      name: 'units-manage-page',
      component: UnitsManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/enrollment/subjects-infor/',
      name: 'subjects-manage-page',
      component: SubjectsManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/enrollment/moumoa-infor',
      name: 'moumoa-manage-page',
      component: MOUMOAManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/enrollment/htqt-infor',
      name: 'htqt-manage-page',
      component: HTQTManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/enrollment/ex-f-student-infor',
      name: 'ex-f-student-manage-page',
      component: ExchangeForeignStudentManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/enrollment/student-infor',
      name: 'student-manage-page',
      component: StudentManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/enrollment/ex-student-infor',
      name: 'ex-student-manage-page',
      component: ExchangeStudentManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/enrollment/extend-visa',
      name: 'extend-visa-manage-page',
      component: VISAManagePage,
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      
      meta: { 
        
        requiresAuth: true
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      
      meta: { 
        requiresAuth: false
      },
    },

  ]
})

export default router

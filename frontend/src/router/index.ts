import { createRouter, createWebHistory } from 'vue-router'
import RequesterView from '../views/RequesterView.vue'
import ValidatorView from '../views/ValidatorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/requester'
    },
    {
      path: '/requester',
      name: 'requester',
      component: RequesterView
    },
    {
      path: '/validator',
      name: 'validator',
      component: ValidatorView
    }
  ]
})

export default router

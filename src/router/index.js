import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { tools } from '../data/tools'

const toolRoutes = tools.map((t) => ({
  path: '/' + t.slug,
  name: t.slug,
  component: t.component,
}))

const routes = [
  { path: '/', name: 'home', component: Home },
  ...toolRoutes,
  { path: '/about', name: 'about', component: () => import('../views/About.vue') },
  { path: '/privacy', name: 'privacy', component: () => import('../views/Privacy.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFound.vue') },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, top: 64, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

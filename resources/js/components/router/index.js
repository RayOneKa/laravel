import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import ProductListComponent from '../ProductListComponent.vue'
import CategoryListComponent from '../CategoryListComponent.vue'
import LoginComponent from '../auth/LoginComponent'

const routes = [
  { path: '/', component: CategoryListComponent },
  { path: '/login', component: LoginComponent },
  { path: '/categories/:categoryId', component: ProductListComponent}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
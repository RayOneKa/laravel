import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import ProductListComponent from '../ProductListComponent.vue'
import CategoryListComponent from '../CategoryListComponent.vue'
import CartComponent from '../CartComponent.vue'
import LoginComponent from '../auth/LoginComponent'
import ProfileComponent from '../ProfileComponent'

const routes = [
  { path: '/', component: CategoryListComponent },
  { path: '/login', component: LoginComponent },
  { path: '/profile', component: ProfileComponent },
  { path: '/cart', component: CartComponent },
  { path: '/categories/:categoryId', component: ProductListComponent}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
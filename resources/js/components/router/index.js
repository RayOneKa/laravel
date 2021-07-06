import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import ProductListComponent from '../ProductListComponent.vue'
import CategoryListComponent from '../CategoryListComponent.vue'

const routes = [
  { path: '/', component: CategoryListComponent },
  { path: '/categories/:categoryId', component: ProductListComponent}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from '../store'

import ProductListComponent from '../ProductListComponent.vue'
import CategoryListComponent from '../CategoryListComponent.vue'
import CartComponent from '../CartComponent.vue'
import LoginComponent from '../auth/LoginComponent'
import RegisterComponent from '../auth/RegisterComponent'
import ProfileComponent from '../ProfileComponent'
import PageNotFoundComponent from '../PageNotFoundComponent.vue'
import CategoriesComponent from '../admin/CategoriesComponent.vue'
import ProductsComponent from '../admin/ProductsComponent.vue'


const routes = [
  { path: '/', component: CategoryListComponent },
  { path: '/admin/categories', component: CategoriesComponent },
  { path: '/admin/products', component: ProductsComponent },
  { path: '/login', component: LoginComponent },
  { path: '/register', component: RegisterComponent },
  { path: '/profile', component: ProfileComponent },
  { path: '/cart', component: CartComponent, meta: {userRequired: true}  },
  { path: '/categories/:categoryId', component: ProductListComponent},
  { path: '*', component: PageNotFoundComponent},
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.userRequired)) {
    if (store.state.user) next()
    else {
      store.dispatch('getUser')
        .then(() => {
          next()
        })
        .catch(() => {
          next('/login')
        })
    }
  }
  else next()
})

export default router
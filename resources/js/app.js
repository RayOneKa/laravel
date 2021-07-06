/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))


Vue.component('categories-component', require('./components/admin/CategoriesComponent.vue').default);
Vue.component('products-component', require('./components/admin/ProductsComponent.vue').default);
Vue.component('category-list-component', require('./components/CategoryListComponent.vue').default);
Vue.component('product-list-component', require('./components/ProductListComponent.vue').default);
Vue.component('cart', require('./components/Cart.vue').default);
Vue.component('navbar', require('./components/NavbarComponent.vue').default);
Vue.component('profile', require('./components/ProfileComponent.vue').default);

import router from './components/router'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});

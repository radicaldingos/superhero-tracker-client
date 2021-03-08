import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(require('vue-moment'));

import axios from 'axios'
import Dashboard from './components/Dashboard.vue';
import SuperheroesList from './components/SuperheroesList.vue';

const routes = [
    { path: '/superheroes', component: SuperheroesList },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

// Force les appels en application/json pour que APIPlatform réponde au format JSON et non Hydra
axios.defaults.headers.common['Accept'] = 'application/json';

new Vue({
    router,
    render: h => h(Dashboard)
}).$mount('#app')
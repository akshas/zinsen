import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Start from './components/StartPage.vue';
import Percent from './components/Proz.vue';
import Percentage from './components/Percentage.vue';
import Capital from './components/Capital.vue';

Vue.use(VueRouter);
Vue.component('StartPage', Start);
Vue.component('FindPercent', Percent);
Vue.component('FindPercentage', Percentage);
Vue.component('FindCapital', Capital);

const routes = [{
    path: '/',
    component: Start
  },
  {
    path: '/zinsen',
    component: Percent
  },
  {
    path: '/percentage',
    component: Percentage
  },
  {
    path: '/capital',
    component: Capital
  },

];

const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
});

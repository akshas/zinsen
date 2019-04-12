import Vue from 'vue'
import App from './App.vue'
import Start from './components/StartPage.vue'
import Percent from './components/Proz.vue'
import Percentage from './components/Percentage.vue'
import Sum from './components/Sum.vue'


Vue.component('StartPage', Start);
Vue.component('FindPercent', Percent);
Vue.component('FindPercentage', Percentage);
Vue.component('FindSum', Sum);

new Vue({
  el: '#app',
  render: h => h(App)
});

import Vue from 'vue';
import App from './App.vue';
import Start from './components/StartPage.vue';
import Percent from './components/Proz.vue';
import Percentage from './components/Percentage.vue';
import Capital from './components/Capital.vue';


Vue.component('StartPage', Start);
Vue.component('FindPercent', Percent);
Vue.component('FindPercentage', Percentage);
Vue.component('FindCapital', Capital);

new Vue({
  el: '#app',
  render: h => h(App)
});

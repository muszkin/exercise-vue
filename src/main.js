import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'


import MealDbStore from './MealDbStore'

Vue.config.productionTip = false
Vue.use(Vuex)

new Vue({
  render: h => h(App),
  store: MealDbStore
}).$mount('#app')

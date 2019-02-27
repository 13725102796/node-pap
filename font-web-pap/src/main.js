import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//css
import '@/assets/theme.scss' 

// ui
import VueMDCAdapter from 'vue-mdc-adapter'
Vue.use(VueMDCAdapter)

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')

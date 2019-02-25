import Vue from 'vue'
import App from './App.vue'

import EltUI from '@elitel/elt-esri-map'

Vue.config.productionTip = false
Vue.use(EltUI)

new Vue({
  render: h => h(App),
}).$mount('#app')

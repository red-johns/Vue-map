import Vue from 'vue'
import App from './App.vue'

import EltUI from '@elitel/elt-esri-map'
import '@elitel/elt-esri-map/dist/main.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(EltUI)
Vue.use(ElementUI)

Vue.config.productionTip = false




new Vue({
  render: h => h(App),
}).$mount('#app')

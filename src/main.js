import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createProvider } from './vue-apollo'
import vuetify from './plugins/vuetify';
import Auth0Plugin from '@/plugins/auth.js'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Auth0Plugin);

Vue.config.productionTip = false

new Vue({
  router,
  apolloProvider: createProvider(),
  vuetify,
  render: h => h(App)
}).$mount('#app')

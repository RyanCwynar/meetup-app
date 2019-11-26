import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createProvider } from './vue-apollo'
import vuetify from './plugins/vuetify'
import Auth0Plugin from '@/plugins/auth.js'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Auth0Plugin);

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyCLQWCPeR0oZac37VR096XYdvSfXrPrREs',
  // version: '2.0.0',
  // language: 'en'
})

Vue.config.productionTip = false

new Vue({
  router,
  apolloProvider: createProvider(),
  vuetify,
  data(){return {
    searchTerm: '',
    searchDistance: 20,
    userLocation: { latitude: 0, longitude: 0},
  }},
  watch: {
    searchTerm(val){
      if (!val) {
        return
      } else if( this.$route.name !== 'events'){
        console.log('fired')
        this.$router.push({name: 'events'})
      }
    }
  },
  render: h => h(App)
}).$mount('#app')

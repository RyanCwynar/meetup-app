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
Vue.mixin({
  filters: {
    noLastName(name){
        let n = name.split(' ')
        return `${n[0]} ${n[1][0]}.`
    },
    formatDate(date) {
      date = new Date(date);
      var monthNames = [
        "Jan", "Feb", "Mar",
        "April", "May", "June", "July",
        "Aug", "Sept", "Oct",
        "Nov", "Dec"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return `${monthNames[monthIndex]} ${parseInt(day)}, ${year}`;
    },
    formatTime(time){
      let t = time.split(':')
      let h = parseInt(t[0])
      let m = parseInt(t[1])
      let pm = false
      if(h > 12) {pm = true; h = h % 12}
      return `${h}${m > 0 ? ':'+m : ''}${pm ? 'p':'a'}`
    },
  },
})
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
        this.$router.push({name: 'events'})
      }
    }
  },
  
  render: h => h(App)
}).$mount('#app')

import auth0 from 'auth0-js'
import Vue from 'vue'


// exchange the object with your own from the setup step above.
let webAuth = new auth0.WebAuth({
  domain: 'dev-if74kmty.auth0.com',
  clientID: 'IaFVKRgZXNWFczYUBBodM1MA4Km7n2li',
  // make sure this line is contains the port: 8080
  redirectUri: `http://joinus.ryancwynar.com/login`,
  // we will use the api/v2/ to access the user information as payload
  audience: 'meetup-alternative-api', 
  responseType: 'token id_token',
  scope: 'openid profile' // define the scopes you want to use
})

let auth = new Vue({
  data(){
    return {
      tokenValue: localStorage.getItem('id_token') || '',
      userValue: JSON.parse(localStorage.getItem('user')) || {},
      expiresAtValue: localStorage.getItem('expires_at') || 0,
    };
  },
  computed: {
    token: {
      get: function() {
        return this.tokenValue
      },
      set: function(id_token) {
        this.tokenValue = id_token;
        localStorage.setItem('id_token', id_token)
      }
    },
    // accessToken: {
    //   get: function() {
    //     return localStorage.getItem('access_token')
    //   },
    //   set: function(accessToken) {
    //     localStorage.setItem('access_token', accessToken)
    //   }
    // },
    expiresAt: {
      get: function() {
        return this.expiresAtValue;
      },
      set: function(expiresIn) {
        this.expiresAtValue = JSON.stringify(expiresIn * 1000 + new Date().getTime())
        localStorage.setItem('expires_at', this.expiresAtValue)
      }
    },
    user: {
      get: function() {
        return this.userValue;
      },
      set: function(user) {
        this.userValue = user;
        localStorage.setItem('user', JSON.stringify(user))
      }
    }
  },
  methods: {
    login() {
      webAuth.authorize()
    },
    logout() {
      return new Promise(() => { 
        // localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
        localStorage.removeItem('user')
        webAuth.logout({
          returnTo: process.env.APP_HOST, 
          // Allowed logout URL listed in dashboard
          clientID: 'IaFVKRgZXNWFczYUBBodM1MA4Km7n2li',
          // Your client ID
        })
      })
    },
    isAuthenticated() {
      return new Date().getTime() < this.expiresAt
    },
    handleAuthentication() {
      return new Promise((resolve, reject) => {  
        webAuth.parseHash((err, authResult) => {

        //   if (authResult && authResult.accessToken && authResult.idToken) {
        if (authResult && authResult.idToken) {
            this.expiresAt = authResult.expiresIn
            // this.accessToken = authResult.accessToken
            this.token = authResult.idToken
            this.user = authResult.idTokenPayload
            resolve()

          } else if (err) {
            this.logout()
            reject(err)
          }

        })
      })
    }
  }
})

export default {
  install: function(Vue) {
    Vue.prototype.$auth = auth
  }
}
<template>
<div>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    
    color="blue darken-3 pl-0"
    dark>
    <v-app-bar-nav-icon @click.stop="drawerState = !drawer" />
    <v-toolbar-title
      style="width: 300px"
      class="ml-0 pl-0">
      <span class="hidden-sm-and-down">Meetup Alternative</span>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search Events"
      class="hidden-sm-and-down"
      v-model="$root.searchTerm"
    />
    <v-col  cols="12" sm="1">
      <v-select flat no-data-text hide-details solo-inverted :items="[5, 10, 25, 50, 100, 250]" v-model='$root.searchDistance' label="Dist" ></v-select>
    </v-col>
    <v-col  cols="12" sm="2" class="pl-0">
    <vuetify-google-autocomplete
        flat
        solo-inverted
        no-data-text hide-details
        id="search-from"
        class="search-from"
        
        placeholder="Search From"
        v-on:placechanged="setUserLocation"
       
    >
    </vuetify-google-autocomplete>
    </v-col>
    <v-btn icon @click="geolocate"><v-icon>mdi-target</v-icon></v-btn>
    <v-spacer />
    <v-btn
      icon
      large
    >
      <v-avatar
        size="32px"
        item
      >
        <v-img
          :src="avatarSource"
          alt="Vuetify"
        /></v-avatar>
    </v-btn>
  </v-app-bar>
</div>
</template>
<script>
import _ from 'lodash'
export default {
    props: {
        drawer: Boolean
    },
    methods: {
      setUserLocation(placeData){
        let latitude = _.get(placeData, 'latitude')
        let longitude = _.get(placeData, 'longitude')
        if(typeof latitude == 'number' && typeof longitude == 'number'){
          this.$root.userLocation = { latitude, longitude }
        }
      },
      geolocate() {
        console.log('browser geolocate')
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position)
          this.$root.userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        });
      },
    },
    computed:{
        drawerState:{
            get(){
                return this.drawer;
            },
            set(v){
                this.$emit('drawerState', v);
            }
        },
        avatarSource(){
          return _.get(this, '$auth.user.picture', '') || "https://cdn.vuetifyjs.com/images/logos/logo.svg";
        }
    }
}
</script>
<style lang="scss">
.v-app-bar{
  .v-input.search-from.v-text-field.v-text-field--solo .v-input__slot{ box-shadow: none; }
}
</style>
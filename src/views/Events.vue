<template>
  
    <v-container >
      <v-col>
        <v-btn @click="geolocate">Get Location</v-btn>
        <h1>Events</h1>
        <v-row class="px-2">
          <event-tile 
            class="mr-4 mb-4" 
            v-for="(event, index) in events"
            :key="index"
            v-bind="event" />
        </v-row>
      </v-col>
    </v-container>
  
</template>

<script>
// @ is an alias to /src
import { computeDestinationPoint } from 'geolib'
import { getEvents, searchEvents } from '@/graphql/queries'
import EventTile from '@/components/EventTile'

export default {
  apollo: {
    events: getEvents,
  },
  components: { EventTile },
  data(){
    return {
      events: [],
      userLocation: {lat: 0, lng: 0},
      searchRadiusMiles: 10,
      searchBox: {
        minLat: 0,
        maxLat: 0,
        minLng: 0,
        maxLng: 0,
      }
    }
  },
  mounted() {
    if(!this.$root.searchTerm){
      this.$apollo.queries.events.refetch()
    }
  },
  watch: {
    '$root.searchTerm': function(value){
      // cancel pending call
      clearTimeout(this._timerId)

      // delay new call 500ms
      this._timerId = setTimeout(() => {
        this.search(value)
      }, 500)
    },
    userLocation(centerPoint){
      let topRight = computeDestinationPoint(centerPoint, this.searchRadiusMeters, 45)
      let bottomLeft = computeDestinationPoint(centerPoint, this.searchRadiusMeters, 225)
      this.searchBox = {
        minLat: bottomLeft.latitude,
        maxLat: topRight.latitude,
        minLng: bottomLeft.longitude,
        maxLng: topRight.longitude,
      }
    }
  },
  computed:{
    searchRadiusMeters(){
      return this.getMeters(this.searchRadiusMiles)
    }
  },
  methods: {
    getMeters(i){
      return i*1609.344;
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      });
    },
    search(term){
      this.$apollo.query({ query: searchEvents, variables: {searchTerm: term}})
      .then(({data: {searchEvents: events}}) => {
        this.events = events
      })
      .catch(console.error)
    }
  }
}
</script>

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
    }
  },
  methods: {
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
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

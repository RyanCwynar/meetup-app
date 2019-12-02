<template>
  
    <v-container >
      <v-col>
       
        <h1>Events</h1>
        <v-btn icon @click="refetchEvents"><v-icon>mdi-refresh</v-icon></v-btn>
        <v-row class="px-2">
          <event-tile 
            class="mr-4 mb-4" 
            v-for="(event, index) in sortedEvents"
            :key="index"
            v-bind="event" />
        </v-row>
      </v-col>
    </v-container>
  
</template>

<script>
// @ is an alias to /src
import _ from 'lodash'
import { getDistance } from 'geolib'
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
    }
  },
  mounted() {
    if(!this.$root.searchTerm){
      this.$apollo.queries.events.refetch()
    }
  },
  watch: {
    '$root.searchTerm': function(newVal, oldVal){
      if(!newVal && oldVal){
        this.$apollo.queries.events.refetch()
      }
      // cancel pending call
      clearTimeout(this._timerId)

      // delay new call 500ms
      this._timerId = setTimeout(() => {
        this.search()
      }, 500)
    },
    '$root.searchDistance': function(){
      console.log('distance watcher firing')
      // cancel pending call
      clearTimeout(this._timerId)

      // delay new call 500ms
      this._timerId = setTimeout(() => {
        this.search()
      }, 500)
    },

  },
  computed:{
    
    sortedEvents(){
      const self = this
      let events = this.events.slice()
      events = events.map(event => {
        event.distanceToUser = self.distanceToUser(event.latitude, event.longitude)
        return event
      })
      events.sort(function(a, b){
        return a.distanceToUser - b.distanceToUser
      })
      return events
    }
  },
  methods: {
    refetchEvents(){
      return this.$apollo.queries.events.refetch()
    },
    distanceToUser(latitude, longitude){
        if(typeof this.$root.userLocation.latitude == 'number'
          && typeof this.$root.userLocation.longitude == 'number'
          && typeof latitude == 'number'
          && typeof longitude == 'number'
        ){
          let meters = getDistance(this.$root.userLocation, { latitude, longitude })
          let toMiles = meters / 1609 // approximate meters to miles
          let rounded =  Math.round( toMiles * 10 ) / 10;
          return rounded;
        }
        return 0
    },
    getMeters(i){
      return i*1609.344;
    },
    
    search(){
      const term = this.$root.searchTerm
      if(term){
        let latitude = _.get(this, '$root.userLocation.latitude', undefined)
        let longitude = _.get(this, '$root.userLocation.longitude', undefined)
        let distance = (typeof latitude == 'number' && typeof longitude == 'number') ? this.$root.searchDistance : undefined
        this.$apollo.query({ 
          query: searchEvents, 
          variables: {
            searchTerm: term, 
            latitude: latitude, 
            longitude: longitude, 
            distance: distance
          }
        })
        .then(({data: { searchEvents: events }}) => {
          this.events = events
        })
        .catch(console.error)
      }
    }
  }
}
</script>

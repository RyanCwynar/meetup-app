<template>
  
    <v-container >
      <v-col>
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
      events: []
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

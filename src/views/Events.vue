<template>
  
    <v-container >
      <v-row class="px-4"><h1>Events</h1></v-row>
      <v-row class="px-4" justify="start" align="start">
        <event-tile class="mr-4 mb-4" v-for="(event, index) in events"
          :key="index"
          v-bind="event" />
      </v-row>
    </v-container>
  
</template>

<script>
// @ is an alias to /src
import { getEvents } from '@/graphql/queries'
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
  }
}
</script>

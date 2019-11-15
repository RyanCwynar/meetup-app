<template>
  
    <v-container >
      <v-row class="px-4"><h1>Events</h1></v-row>
      <v-row class="px-4" justify="space-between" align="start">
        <event-tile v-for="(event, index) in events"
          :key="index"
          v-bind="event" />
      </v-row>
    </v-container>
  
</template>

<script>
// @ is an alias to /src
import { eventsList } from '@/mocks/data'
import EventTile from '@/components/EventTile'

export default {
  created(){
    this.events = eventsList();
  },
  components: { EventTile },
  data(){
    return {
      events: []
    }
  }
}
</script>

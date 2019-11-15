<template>
  <v-container >
    <v-row class="px-4">
      <h1>{{name}}</h1>
    </v-row>
    <v-row class="px-4">
      {{description}}
    </v-row>
    <v-row class="px-4">
      <h2>Upcoming Events</h2>
    </v-row>
    <v-row class="px-4" justify="space-between" align="start">
      <event-tile v-for="(event, index) in events"
        :key="index"
        v-bind="event" />
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import {group, eventsList} from '@/mocks/data'
import EventTile from '@/components/EventTile'

export default {
  components: {EventTile},
  created(){
    let {name, description} = group(this.$route.params.id);
    this.name = name;
    this.description = description;
    this.events = eventsList(name);
  },
  data() {
    return {
      name: '',
      description: '',
      events: []
    }
  }
}
</script>

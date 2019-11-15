<template>
  <v-container >
    
    <h1>{{event.name}}</h1>
    <h3>{{event.groupName}}</h3>
    <p>{{event.description}}</p>
    <v-btn @click="toggleRsvp" :color="attending ? '' : 'primary'">
      {{ attending ? 'Leave' : 'Attend' }}
    </v-btn>
  </v-container>
</template>

<script>
// @ is an alias to /src
import {event} from '@/mocks/data'
export default {
 
  created(){
    // dispatch getEvent query
    // mock query
    this.event = event(this.$route.params.id);
  },
  data() {
    return {
      event: {
        name: '',
        description: '',
        groupName: '',
      },
      attending: false,
    }
  },
  methods: {
    toggleRsvp() {
      // dispatch joinEvent or leaveEvent query
      this.attending = !this.attending;
    },
  }
}
</script>

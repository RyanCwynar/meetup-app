<template>
  <v-container >
    <v-row class="px-4">
      <v-col>
        <h1>{{group.name || name}}</h1>
        <p class="subtitle">{{group.owner.name}}</p>
        <p class="subtitle">{{group.id}}</p>
      </v-col>
    </v-row>
    <v-row class="px-4">
      {{group.description}}
    </v-row>
    <v-row class="px-4" v-if="group.events.length > 0">
      <h2>Upcoming Events</h2>
    </v-row>
    <v-row class="px-4" justify="space-between" align="start">
      <event-tile v-for="(event, index) in group.events"
        :key="index"
        v-bind="event" />
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import {group, eventsList} from '@/mocks/data'
import {getGroup} from '@/graphql/queries'
import EventTile from '@/components/EventTile'

export default {
  apollo: {
    group: {
      query: getGroup,
      variables() {
        return {id: this.$route.params.id}
      }
    }
  },
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
      events: [],
      group: {
        name: '',
        description: '',
        owner: {name: ''},
        events: []
      }
    }
  }
}
</script>

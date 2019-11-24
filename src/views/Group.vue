<template>
  <v-container >
    <v-row class="px-4">
      <v-col>
        <h1>{{group.name}}</h1>
        <p class="subtitle">{{group.owner.name}}</p>
        <p class="subtitle">{{group.id}}</p>
      </v-col>
    </v-row>
    <v-row class="px-4">
      {{group.description}}
    </v-row>
    <v-row v-if="ownsThisGroup">
      <v-col>
        <h2>Create an event</h2>
        <form id="create-event-form" @submit.prevent="createEvent" :disabled="!ownsThisGroup">
          <v-text-field v-model="newEvent.name"/>
          <v-btn type="submit">Create</v-btn>
        </form>
      </v-col>
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

import {getGroup, getMe} from '@/graphql/queries'
import {createEvent} from '@/graphql/mutations'
import EventTile from '@/components/EventTile'
import _ from 'lodash'

export default {
  apollo: {
    me: getMe,
    group: {
      query: getGroup,
      variables() {
        return {id: this.$route.params.id}
      }
    }
  },
  components: {EventTile},

  computed: {
    ownsThisGroup(){
      if(_.get(this, 'me.ownerOf')){
        let ownedGroups = this.me.ownerOf.filter( group => {
          return group.id == group.id;
        });
        
        return ownedGroups.length > 0;
      }
      return false;
    }
  },

  data() {
    return {

      group: {
        id: '',
        name: '',
        description: '',
        owner: {name: ''},
        events: []
      },
      newEvent: {
        name: '',
        description: '',
        group: '',
        start: new Date(),
        end: new Date(),
      }
    }
  },
  methods: {
    createEvent(){
      if(this.ownsThisGroup){
        this.newEvent.group = this.group.id;
      
        this.$apollo.mutate({
          mutation: createEvent,
          variables: {
            ...this.newEvent,
          }
        });
      } else {
        throw new Error('User does not own this group');
      }
    }
  }
}
</script>

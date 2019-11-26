<template>
  <v-container v-if="event.name">
    <v-col>
      <v-btn v-if="ownsThisGroup" @click="deleteEvent">Delete Event</v-btn>
      <h1>{{event.name}}</h1>
      <h3>{{event.group.name}}</h3>
      <p>{{event.description}}</p>
      <p><a :href="event.mapUrl">{{event.addressText}}</a></p>
      <p v-if="event.date && event.startTime && event.endTime">Date: {{event.date}} from {{event.startTime}} to {{event.endTime}}</p>
      <v-btn @click="toggleRsvp" :color="attending ? '' : 'primary'">
        {{ attending ? 'Leave' : 'Attend' }}
      </v-btn>
    </v-col>
  </v-container>
</template>

<script>
// @ is an alias to /src

import { getEvent, getMe } from '@/graphql/queries'
import { joinEvent, leaveEvent, deleteEvent } from '@/graphql/mutations'
import _ from 'lodash'

export default {
   apollo: {
    me: getMe,
    event: {
      query: getEvent,
      variables() {
        return { id: this.$route.params.id }
      }
    }
  },
  mounted(){
    this.attending = this.isUserAttending();
  },
  computed: {
    ownsThisGroup(){
      if(_.get(this, 'me.ownerOf')){
        let ownedGroups = this.me.ownerOf.filter( ({id}) => {
          return id == this.event.group.id;
        });
        
        return ownedGroups.length > 0;
      }
      return false;
    },
  },
  data() {
    return {
      event: {
        id: this.$route.params.id,
        name: '',
        description: '',
        group: {
          id: '',
          name: '' },
      },
      attending: false,
    }
  },
  methods: {
    isUserAttending(){
      if(_.get(this, 'event.usersAttending') && _.get(this, 'me.id')){
        let arr = this.event.usersAttending.filter(user => this.me.id == user.id)
        return arr.length > 0
      }else{
        return false
      }
    },
    toggleRsvp() {
      // dispatch joinEvent or leaveEvent query
      (this.attending) ? this.leaveEvent() : this.joinEvent();
    },
    deleteEvent(){
      this.$apollo.mutate({mutation: deleteEvent, variables: {id: this.event.id}})
      .then(()=>{
        this.$router.push({path: "/group/" + this.event.group.id })
      })
      .catch(console.error)
    },
    joinEvent(){
      this.$apollo.mutate({
        mutation: joinEvent,
        variables: {id: this.$route.params.id}
      })
      .then(({data: { joinEvent: event }})=>{
         this.attending = true;
         this.event = _.merge(this.event, event);
      })
      .catch(console.error)
    },
    leaveEvent(){
      this.$apollo.mutate({
        mutation: leaveEvent,
        variables: {id: this.$route.params.id}
      })
      .then(({data: { leaveEvent: event }})=>{
        this.attending = false;
        this.event = _.merge(this.event, event);
      })
      .catch(console.error)
    }
  }
}
</script>

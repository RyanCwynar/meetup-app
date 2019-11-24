<template>
  <v-container >
    
    <h1>{{event.name}}</h1>
    <h3>{{event.group.name}}</h3>
    <p>{{event.description}}</p>
    <v-btn @click="toggleRsvp" :color="attending ? '' : 'primary'">
      {{ attending ? 'Leave' : 'Attend' }}
    </v-btn>
  </v-container>
</template>

<script>
// @ is an alias to /src

import { getEvent, getMe } from '@/graphql/queries'
import { joinEvent, leaveEvent } from '@/graphql/mutations'
import _ from 'lodash'

export default {
   apollo: {
    me: getMe,
    event: {
      query: getEvent,
      variables() {
        return {id: this.$route.params.id}
      }
    }
  },
  mounted(){
    this.attending = this.isUserAttending();
  },
  data() {
    return {
      event: {
        id: this.$route.params.id,
        name: '',
        description: '',
        group: { name: '' },
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

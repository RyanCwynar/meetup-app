<template>
  <v-container v-if="event.name">
    <v-row>
    <v-col>
      <v-btn v-if="ownsThisGroup" @click="deleteEvent">Delete Event</v-btn>
      <h1>{{event.name}}</h1>
      <h3>{{event.group.name}}</h3>
      <p>{{event.description}}</p>
      <p><a :href="event.mapUrl">{{event.addressText}}</a></p>
      <p v-if="event.date && event.startTime && event.endTime">Date: {{event.date}} from {{event.startTime}} to {{event.endTime}}</p>
      
    </v-col>
    <user-chips-block :members="event.usersAttending" heading="Members Attending">
      <v-btn @click="toggleRsvp" :color="userIsAttending ? '' : 'primary'">
        {{ userIsAttending ? 'Leave' : 'Attend' }}
      </v-btn>
    </user-chips-block>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import UserChipsBlock from '@/components/UserChipsBlock'
import { getEvent, getMe, getGroup } from '@/graphql/queries'
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
    },
    group: {
      query: getGroup,
      variables() {
        return { id: this.event.group.id }
      }
    }
  },
  components: {UserChipsBlock},
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
    userIsAttending(){
      if(_.get(this, 'event.usersAttending') && _.get(this, 'me.id')){
        let arr = this.event.usersAttending.filter(({id}) => this.me.id == id)
        return arr.length > 0
      }else{
        return false
      }
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
      
    }
  },
  methods: {
    
    toggleRsvp() {
      // dispatch joinEvent or leaveEvent query
      (this.userIsAttending) ? this.leaveEvent() : this.joinEvent();
    },
    deleteEvent(){
      this.$apollo.mutate({mutation: deleteEvent, variables: {id: this.event.id}})
      .then(()=>{
        this.$apollo.queries.group.refetch();
        this.$router.push({path: "/group/" + this.event.group.id })
      })
      .catch(console.error)
    },
    joinEvent(){
      this.$apollo.mutate({
        mutation: joinEvent,
        variables: {id: this.$route.params.id}
      })
      .then(()=>this.$apollo.queries.event.refetch())
      .catch(console.error)
    },
    leaveEvent(){
      this.$apollo.mutate({
        mutation: leaveEvent,
        variables: {id: this.$route.params.id}
      })
      .then(()=>this.$apollo.queries.event.refetch())
      .catch(console.error)
    }
  }
}
</script>

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
    <v-row class="px-4"  v-if="!ownsThisGroup">
      <v-col>
      <v-btn @click="toggleMembership" :color="isGroupMember ? '' : 'primary'">
        {{ isGroupMember ? 'Leave' : 'Join' }}
      </v-btn>
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
    <v-col class="px-4 pt-4" v-if="hasMembers">
      <h2>Members</h2>
      <v-row v-if="hasMembers" class="px-4" justify="start" align="start">
        <v-chip v-for="(member, index) in group.members" :key="index">{{member.name}}</v-chip>
      </v-row>
    </v-col>
    <create-event-component  v-if="ownsThisGroup" :groupId="group.id"/>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CreateEventComponent from '@/components/CreateEventComponent'
import { getGroup, getMe } from '@/graphql/queries'
import { joinGroup, leaveGroup } from '@/graphql/mutations'
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
  components: { EventTile, CreateEventComponent },
  computed: {
    ownsThisGroup(){
      if(_.get(this, 'me.ownerOf')){
        let ownedGroups = this.me.ownerOf.filter( ({id}) => {
          return id == this.group.id;
        });
        
        return ownedGroups.length > 0;
      }
      return false;
    },
    hasMembers(){
      return _.get(this, 'group.members', []).length > 0;
    },
    isGroupMember(){
      if(_.get(this, 'group.members') && _.get(this, 'me.id')){
        let memberOf = this.group.members.filter( ({id}) => {
          return id == this.me.id;
        });
        
        return memberOf.length > 0;
      }
      return false;
    },
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
      // newEvent: {
      //   name: '',
      //   description: '',
      //   group: '',
      //   start: new Date(),
      //   end: new Date(),
      // }
    }
  },
  methods: {
    
    // createEvent(){
    //   if(this.ownsThisGroup){
    //     this.newEvent.group = this.group.id;
      
    //     this.$apollo.mutate({
    //       mutation: createEvent,
    //       variables: {
    //         ...this.newEvent,
    //       }
    //     });
    //   } else {
    //     throw new Error('User does not own this group');
    //   }
    // },
    toggleMembership(){
      (this.isGroupMember) ? this.leaveGroup() : this.joinGroup();
    },
    joinGroup(){
      this.$apollo.mutate({
        mutation: joinGroup,
        variables: { id: this.group.id }
      })
      .then(({data: {joinGroup: group}}) => {
       
        this.group = _.merge(this.group, group);
      })
      .catch(console.error)
    },
    leaveGroup(){
      this.$apollo.mutate({
        mutation: leaveGroup,
        variables: { id: this.group.id }
      })
      .then(({data: {leaveGroup: group}}) => {
       
        this.group = _.merge(this.group, group);
      })
      .catch(console.error)
    },
  },

}
</script>

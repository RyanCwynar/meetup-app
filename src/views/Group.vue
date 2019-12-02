<template>
  <v-container v-if="group.name">
    <v-row>
    <v-col>
      <v-btn v-if="ownsThisGroup" @click="deleteGroup">Delete Group</v-btn>
      <h1>{{group.name}}</h1>
      <p>Created by {{group.owner.name | noLastName}}</p>
      <p v-if="group.description">{{group.description}}</p>
      
    
    <div v-if="group.events.length > 0">
      <h2 class="mb-2">Upcoming Events</h2>
      <v-row class="px-2">
        <event-tile class="mb-4 mr-4" v-for="(event, index) in group.events"
          :key="index"
          v-bind="event"
        />
      </v-row>
    </div>
    </v-col>
    <user-chips-block :members="group.members">
      <v-btn
        v-if="!ownsThisGroup" 
        @click="toggleMembership" 
        :color="isGroupMember ? '' : 'primary'">
        {{ isGroupMember ? 'Leave' : 'Join' }}
      </v-btn>
    </user-chips-block>
    </v-row>
    <create-event-component  v-if="ownsThisGroup" :groupId="group.id" @closeDialog="$apollo.queries.group.refetch()"/>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CreateEventComponent from '@/components/CreateEventComponent'
import UserChipsBlock from '@/components/UserChipsBlock'
import { getGroup, getMe } from '@/graphql/queries'
import { joinGroup, leaveGroup, deleteGroup } from '@/graphql/mutations'
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
  mounted(){this.$apollo.queries.group.refetch()},
  components: { EventTile, CreateEventComponent, UserChipsBlock },
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
    }
  },
  methods: {
    toggleMembership(){
      (this.isGroupMember) ? this.leaveGroup() : this.joinGroup();
    },
    deleteGroup(){
      this.$apollo.mutate({mutation: deleteGroup, variables: {id: this.group.id}})
      .then(()=>this.$apollo.queries.me.refetch())
      .then(()=>{this.$router.push({path: "/profile"})})
      .catch(console.error)
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

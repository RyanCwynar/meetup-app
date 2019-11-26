<template>
  <v-container>
  <v-col class="profile">
    <h1>{{name}}</h1>
    <div v-if="ownsGroups">
      <h2>Group Owner of</h2>
      <v-row class="px-2">
        <v-card v-for="(group,index) in me.ownerOf"
          class="ma-2"
          :to="'/group/'+group.id"
          :key="index">
          <v-card-title>{{group.name}}</v-card-title>
          <v-card-subtitle>{{group.description}}</v-card-subtitle>
        </v-card>
      </v-row>
    </div>
    <div v-if="isGroupMember">
      <h2>Member of Groups</h2>
      <v-row class="px-2">
        <v-card v-for="(group,index) in me.memberOf"
          class="ma-2"
          :to="'/group/'+group.id"
          :key="index">
          <v-card-title>{{group.name}}</v-card-title>
        </v-card>
      </v-row>
    </div>
    <create-group-component @closeDialog="$apollo.queries.me.refetch()"/>
  </v-col>
  </v-container>
</template>

<script>
// @ is an alias to /src
import _ from 'lodash'
import { getMe } from '@/graphql/queries'
import CreateGroupComponent from '@/components/CreateGroupComponent'

export default {
  apollo: {
    me: getMe,
  },
  components: { CreateGroupComponent },
  data() {
    return {
      me: {
        name: '',
        ownerOf: [],
        memberOf: [],
      },
    }
  },
  computed: {
    name(){
      return _.get(this, '$auth.user.name', '');
    },
    ownsGroups(){
      return this.me.ownerOf.length > 0
    },
    isGroupMember(){
      return this.me.memberOf.length > 0
    }
  },
  
}
</script>

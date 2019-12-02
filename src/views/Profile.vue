<template>
  <v-container>
  <v-col class="profile">
    <h1>{{name}}</h1>
    <v-row>
      <v-col cols="12" sm="6"  v-if="ownsGroups">
      <h2>Creator</h2>
      <v-card v-for="(group,index) in me.ownerOf"
        class="mb-4"
        :to="'/group/'+group.id"
        :key="index">
        <v-card-title>{{group.name}}</v-card-title>
        <v-card-subtitle>{{group.description}}</v-card-subtitle>
      </v-card>
      </v-col>
      <v-col v-if="isGroupMember" cols="12" sm="6" >
        <h2>Member</h2>
        
          <v-card v-for="(group,index) in me.memberOf"
            class="mb-4"
            :to="'/group/'+group.id"
            :key="index">
            <v-card-title>{{group.name}}</v-card-title>
          </v-card>
      </v-col>
    </v-row>
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

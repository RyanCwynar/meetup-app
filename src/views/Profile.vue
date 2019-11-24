<template>
  <v-container class="profile">
    <h1>{{name}}</h1>
    <div v-if="me.ownerOf.length > 0">
      <h2>Group Owner of</h2>
      <v-row>
        <v-card v-for="(group,index) in me.ownerOf"
          class="ma-2"
          :to="'/group/'+group.id"
          :key="index"
        >
          <v-card-title>{{group.name}}</v-card-title>
          <v-card-subtitle>{{group.id}}</v-card-subtitle>
          <v-card-text>{{group.description}}</v-card-text>
        </v-card>
      </v-row>
    </div>
    <div v-if="me.memberOf.length > 0">
      <h2>Member of Groups</h2>
      <v-row>
        <v-card v-for="(group,index) in me.memberOf"
          class="ma-2"
          :to="'/group/'+group.id"
          :key="index"
        >
          <v-card-title>{{group.name}}</v-card-title>
          <v-card-subtitle>{{group.id}}</v-card-subtitle>
        </v-card>
      </v-row>
    </div>
    <create-group-component/>
  </v-container>
</template>

<script>
// @ is an alias to /src
import _ from 'lodash'
import CreateGroupComponent from '@/components/CreateGroupComponent'
import {getMe} from '@/graphql/queries'
import {createGroup} from '@/graphql/mutations'

export default {
  apollo: {
    me: getMe
  },
  components: {CreateGroupComponent},
  data() {
    return {
      groupName: '',
      newGroup: {
        name: '',
        description: '',
      },
      me: {
        name: '',
        ownerOf: [],
        memberOf: []
      }
    }
  },
  computed: {
    name(){
      return _.get(this, '$auth.user.name', '');
    },
  },
  methods: {
    createGroup(){
        this.$apollo.mutate({
          mutation: createGroup,
          variables: {
            ...this.newGroup
          }
        })
        .then(({data: {createGroup: group}})=>{
          this.me.ownerOf.push(group)
        })
        
    } 
  }
}
</script>

<template>
  <div class="profile">
    <h1>{{name}}</h1>
    <div v-if="me.ownerOf.length > 0">
      <h2>Group Owner of</h2>
      <v-card v-for="(group,index) in me.ownerOf"
        class="ma-2"
        :to="'/group/'+group.id"
        :key="index"
      >
        <v-card-title>{{group.name}}</v-card-title>
        <v-card-subtitle>{{group.id}}</v-card-subtitle>
      </v-card>
    </div>
    <div v-if="me.memberOf.length > 0">
      <h2>Member of Groups</h2>
      <v-card v-for="(group,index) in me.memberOf"
        class="ma-2"
        :to="'/group/'+group.id"
        :key="index"
      >
        <v-card-title>{{group.name}}</v-card-title>
        <v-card-subtitle>{{group.id}}</v-card-subtitle>
      </v-card>
    </div>
    <form @submit.prevent="createGroup">
      <h3>Create Group</h3>
      <v-text-field v-model="groupName" name="name" type="text"/>
      <v-btn type="submit">Create Group</v-btn>
    </form>
    <div v-if="newGroup">
      {{newGroup}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import _ from 'lodash'
import {getMe} from '@/graphql/queries'
import {createGroup} from '@/graphql/mutations'

export default {
  apollo: {
    me: getMe
  },
  data() {
    return {
      groupName: '',
      newGroup: false,
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
            name: this.groupName
          }
        })
        .then((data)=>{
          this.newGroup = data
        })
    } 
  }
}
</script>

<template>
  
    <v-container >
      <v-row class="px-4"><h1>Groups</h1></v-row>
      <v-row class="px-4" justify="space-between" align="start">
        <group-tile v-for="(group, index) in groups"
          :key="index"
          v-bind="group" />
      </v-row>
    </v-container>
  
</template>

<script>
// @ is an alias to /src
import { groupsList } from '@/mocks/data'
import GroupTile from '@/components/GroupTile'

export default {
  created(){
    this.groups = groupsList();
  },
  components: { GroupTile },
  data(){
    return {
      groups: []
    }
  }
}
</script>

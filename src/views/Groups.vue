<template>
  
<v-container>
  <v-col>
    <h1>Groups</h1>
    <v-row class="px-2">
      <group-tile 
        v-for="(group, index) in groups"
        :key="index"
        v-bind="group"/>
    </v-row>
  </v-col>
</v-container>

</template>

<script>
// @ is an alias to /src

import GroupTile from '@/components/GroupTile'
import { getGroups } from '@/graphql/queries'

export default {
  apollo: {
    groups: getGroups
  },
  components: { GroupTile },
  data(){
    return {
      groups: []
    }
  }
}
</script>

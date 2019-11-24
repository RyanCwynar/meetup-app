<template>
  <div>
    <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <create-group-dialog
      :dialog="dialog" 
      @dialogState="dialog = $event"/>
  </div>
</template>

<script>
  import CreateGroupDialog from '@/components/CreateGroupDialog.vue'
  
  export default {
    props: {
      source: String,
      groupId: String
    },
    components: {CreateGroupDialog},
    data: () => ({
      dialog: false,
    }),
  }
</script>
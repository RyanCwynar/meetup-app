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
    <create-event-dialog
      :groupId="groupId"
      :dialog="dialog" 
      @dialogState="dialog = $event"/>
  </div>
</template>

<script>
  import CreateEventDialog from '@/components/CreateEventDialog.vue'
  
  export default {
    props: {
      source: String,
      groupId: String
    },
    watch: {
      dialog(v){
        if(v === false){
          this.$emit('closeDialog', true);
        }
      }
    },
    components: {CreateEventDialog},
    data: () => ({
      dialog: false,
    }),
  }
</script>
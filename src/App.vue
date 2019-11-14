<template>
  <v-app id="inspire">
    <app-nav-drawer 
      :drawer="drawer" 
      @drawerState="drawer = $event"/>
    <app-header 
      :drawer="drawer" 
      @drawerState="drawer = $event"/>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <router-view/>
        </v-row>
      </v-container>
    </v-content>
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
      :dialog="dialog" 
      @dialogState="dialog = $event"/>
  </v-app>
</template>

<script>
  import AppHeader from '@/components/AppHeader.vue'
  import AppNavDrawer from '@/components/AppNavDrawer.vue'
  import CreateEventDialog from '@/components/CreateEventDialog.vue'
  export default {
    props: {
      source: String,
    },
    components: {AppHeader, AppNavDrawer, CreateEventDialog},
    data: () => ({
      dialog: false,
      drawer: null,
    }),
  }
</script>
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
   
  </v-app>
</template>

<script>
  import AppHeader from '@/components/AppHeader.vue'
  import AppNavDrawer from '@/components/AppNavDrawer.vue'
 
  export default {
    props: {
      source: String,
    },
    components: {AppHeader, AppNavDrawer},
    data: () => ({
      drawer: null,
    }),
  }
</script>
<template>
  <v-app>
    <app-nav-drawer 
      :drawer="drawer" 
      @drawerState="drawer = $event"/>
    <app-header 
      :drawer="drawer" 
      @drawerState="drawer = $event"/>
    <v-content>
      <router-view/>
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
    components: { AppHeader, AppNavDrawer },
    
    data: () => ({
      drawer: null,
    }),
  }
</script>
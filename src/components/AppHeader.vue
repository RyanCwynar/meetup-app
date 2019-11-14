<template>
        <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <v-app-bar-nav-icon @click.stop="drawerState = !drawer" />
        <span class="hidden-sm-and-down">Meetup Alternative</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search Events"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <!-- <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn> -->
      <v-btn
        icon
        large
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            :src="avatarSource"
            alt="Vuetify"
          /></v-avatar>
      </v-btn>
    </v-app-bar>
</template>
<script>
export default {
    props: {
        drawer: Boolean
    },
    computed:{
        drawerState:{
            get(){
                return this.drawer;
            },
            set(v){
                this.$emit('drawerState', v);
            }
        },
        avatarSource(){
          return this.$auth.user.picture || "https://cdn.vuetifyjs.com/images/logos/logo.svg";
        }
    }
}
</script>
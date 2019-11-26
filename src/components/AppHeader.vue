<template>
<div>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue darken-3 pl-0"
    dark>
    <v-app-bar-nav-icon @click.stop="drawerState = !drawer" />
    <v-toolbar-title
      style="width: 300px"
      class="ml-0 pl-0">
      <span class="hidden-sm-and-down">Meetup Alternative</span>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search Events"
      class="hidden-sm-and-down"
      v-model="$root.searchTerm"
    />
    <v-spacer />
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
</div>
</template>
<script>
import _ from 'lodash'
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
          return _.get(this, '$auth.user.picture', '') || "https://cdn.vuetifyjs.com/images/logos/logo.svg";
        }
    }
}
</script>
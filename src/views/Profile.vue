<template>
  <div class="profile">
    <h1>{{name}}</h1>
    
  </div>
</template>

<script>
// @ is an alias to /src
import _ from 'lodash'
export default {
  computed: {
    name(){
      return _.get(this, '$auth.user.name', '');
    },
  },
}
</script>

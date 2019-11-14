<template>
  <div class="login">Logout</div>
</template>

<script>
export default {
  
  mounted() {
    this.$auth.logout().then(() => {
      this.$router.push({ name: 'search-events' })
    })
  }
}
</script>
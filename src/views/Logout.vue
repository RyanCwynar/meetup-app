<template>

<div class="logout">
  <h1>Logging out</h1>
</div>

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
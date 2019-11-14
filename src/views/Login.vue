<template>
  <div class="login">Login</div>
</template>

<script>
export default {
  
  mounted() {
    this.$auth.handleAuthentication().then(() => {
      this.$router.push({ name: 'profile' })
    })
  }
}
</script>
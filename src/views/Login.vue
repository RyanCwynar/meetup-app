<template>
  <div class="login">Login</div>
</template>

<script>
import { upsertUser } from '@/graphql/mutations'

export default {
  mounted() {
    this.$auth.handleAuthentication()
      .then(() => this.$apollo.mutate({
        mutation: upsertUser,
        variables: {
          name: this.$auth.user.name
        }
      }))
      .then(() => {
        this.$router.push({ name: 'profile' })
      })
      .catch((err) => {
        console.error(err);
      })
  }
}
</script>
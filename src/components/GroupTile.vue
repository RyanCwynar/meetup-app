<template>
  <v-card
    class="mb-4 mr-4"
    max-width="400"
    outlined
    
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">GROUP</div>
        <v-list-item-title class="headline mb-1">{{name}}</v-list-item-title>
        <v-list-item-subtitle>{{description}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn :to="`/group/${id}`" text>View</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: {
        id: String,
        name: String,
        description: String,
    }
}
</script>
<template>
  <v-card
    class="mb-4"
    max-width="400"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">EVENT</div>
        <v-list-item-title class="headline mb-1">{{name}}</v-list-item-title>
        <v-card-text class="px-0 pb-0">
          {{description}}
        </v-card-text>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn :to="`/event/${id}`" text>View</v-btn>
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
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
        <v-card-subtitle class="pl-0 pt-0" style="line-height: 2">
          <span v-if="distanceToUser"><v-icon>mdi-road</v-icon> {{distanceToUser}} miles<br/></span>
          <span v-if="date"><v-icon>mdi-clock</v-icon> {{date | formatDate}} {{startTime | formatTime}}-{{endTime | formatTime}}</span>
        </v-card-subtitle>
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
        latitude: Number,
        longitude: Number,
        date: String,
        startTime: String,
        endTime: String,
        distanceToUser: {
          type: Number,
          default: 0
        }
    },
}
</script>
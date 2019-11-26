<template>
    <v-dialog
      v-model="dialogState"
      width="800px"
    >
      <v-card>
        <v-card-title class="grey darken-2">
          Create event
        </v-card-title>
        <v-container>
          <v-row>
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <form id="create-event-form">
                <v-text-field v-model="newEvent.name" placeholder="Event Name"/>
                <v-text-field v-model="newEvent.description" placeholder="Event Description"/>
                <vuetify-google-autocomplete
                    id="map"
                    append-icon="mdi-magnify"
                    placeholder="Where? (Enter address)"
                    v-on:placechanged="getAddressData"
                >
                </vuetify-google-autocomplete>
                <v-card v-if="newEvent.addressText" class="mb-4">
                  <v-card-text v-html="newEvent.addressHtml"/>
                  <v-card-actions>
                    <v-btn :href="newEvent.mapUrl" target="_blank">See Map</v-btn>
                  </v-card-actions>
                </v-card>
                <v-date-picker
                  v-model="newEvent.date"
                  :min="new Date().toISOString().substr(0, 10)"
                  />
                <v-row>
                  <v-col style="width: 290px; flex: 0 1 auto;">
                    <h2>Start:</h2>
                    <v-time-picker v-model="newEvent.start" :max="newEvent.end" ampm-in-title></v-time-picker>
                  </v-col>
                  <v-col style="width: 290px; flex: 0 1 auto;">
                    <h2>End:</h2>
                    <v-time-picker v-model="newEvent.end" :min="newEvent.start" ampm-in-title></v-time-picker>
                  </v-col>
                </v-row>
              </form>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="dialogState = false"
          >Cancel</v-btn>
          <v-btn
            text
            @click="create"
          >Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import _ from 'lodash'
import { createEvent } from '@/graphql/mutations'
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    groupId: String
  },
  
  computed: {
    dialogState: {
      get(){
        return this.dialog;
      },
      set(v) {
        this.$emit('dialogState',v);
      }
    }
  },
  data: () => ({
    newEvent: {
      name: '',
      description: '',
      group: '',
      date: new Date().toISOString().substr(0, 10),
      start: '18:00',
      end: '21:00',
      latitude: 0,
      longitude: 0,
      addressText: '',
      addressHtml: '',
      mapUrl: '',
    },
  }),
  methods: {
    getAddressData({latitude = 0, longitude = 0}, {adr_address = '', formatted_address = '', url = ''}){
      
      _.merge(this.newEvent, {
        latitude,
        longitude,
        addressText: formatted_address,
        addressHtml: adr_address,
        mapUrl: url
      })

    },
    
    create(){

      this.newEvent.group = this.groupId;

      this.$apollo.mutate({
        mutation: createEvent,
        variables: {
          ...this.newEvent,
        }
      })
      .then(()=>{
         this.dialogState = false;
      })
      .catch(console.error)
    },
  }
}
</script>
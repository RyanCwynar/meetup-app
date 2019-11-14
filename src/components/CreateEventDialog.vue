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
              <v-row align="center">
                <v-avatar
                  size="40px"
                  class="mr-4"
                >
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                />
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-mail"
                placeholder="Email"
              />
            </v-col>
            
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-letter"
                placeholder="Notes"
              />
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
            @click="dialogState = false"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: {
        dialog: Boolean
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
    }
}
</script>
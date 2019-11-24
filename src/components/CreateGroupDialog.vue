<template>
    <v-dialog
      v-model="dialogState"
      width="800px"
    >
      <v-card>
        <v-card-title class="grey darken-2">
          Create group
        </v-card-title>
        <v-container>
          <v-row>
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <form id="create-group-form">
                <v-text-field v-model="newGroup.name" placeholder="Group Name"/>
                <v-text-field v-model="newGroup.description" placeholder="Group Description"/>
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
import { createGroup } from '@/graphql/mutations'
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    ownerId: String
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
    newGroup: {
      name: '',
      description: '',
    }
  }),
  methods: {
    create(){
      this.$apollo.mutate({
        mutation: createGroup,
        variables: {
          ...this.newGroup,
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
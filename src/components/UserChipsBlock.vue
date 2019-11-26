<template>
    <v-col 
      class="pt-4">
      <slot/>
      <div v-if="members.length > 0">
        <h2 class="mb-2">{{heading}}</h2>
        <v-row class="px-2" v-if="members.length > 0">
            <v-chip 
            v-for="(member, index) in members" 
            :key="index">
            {{member.name}}
            </v-chip>
        </v-row>
      </div>
    </v-col>
</template>
<script>
export default {
    props: {
        members: {
            type: Array,
            default() {return []}
        },
        heading: {
            type: String,
            default: "Members"
        }
    }
}
</script>
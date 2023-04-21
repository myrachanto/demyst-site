<template>
<v-container>
  <v-row>
<v-col>
    <v-toolbar
    >
<v-toolbar-title>{{title}}</v-toolbar-title>
<v-spacer></v-spacer>

</v-toolbar>
          <v-data-table
            :headers="headers"
            :items="items"
            item-key="ID"
            class="elevation-1 display-2"
            style="font-size:10rem"
          :footer-props="{
              'items-per-page-options': [5,10, 20, 30, 40, 50]
            }"
          :items-per-page="10"
          >
          </v-data-table>

</v-col>
  </v-row>
  </v-container>
</template>
<script>
  export default {
    props: ['items', 'headers'],
    data(){
        return{
           title: "Balance Sheet"
        }
    },
  }
</script>
<style>

</style>
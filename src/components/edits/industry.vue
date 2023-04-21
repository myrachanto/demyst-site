<template>
  <v-dialog
          v-model="dialogindustry"
          max-width="500px"
          persistent
        >
          <v-card>
            <v-card-title>
              <span class="headline">{{title}}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                  cols="12"
                  md="12"
                  v-if="data"
                >
                <v-autocomplete
                    v-model="industry"
                    :items="data"
                    chips
                    clearable
                    hide-details
                    hide-selected
                    item-text="name"
                    item-value="title"
                    label="Search page..."
                    solo
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-title>
                          Search for 
                          <strong>Page</strong>
                        </v-list-item-title>
                      </v-list-item>
                    </template>
                    <template v-slot:selection="{ attr, on, item, selected }">
                      <v-chip
                        v-bind="attr"
                        :input-value="selected"
                        color="blue-grey"
                        class="white--text"
                        v-on="on"
                      >
                        <v-icon left>
                          mdi-check-box-outline
                        </v-icon>
                        <span v-text="item.name"></span>
                      </v-chip>
                    </template>
                    <template v-slot:item="{ item }">
                      <v-list-item-avatar
                        color="indigo"
                        class="headline font-weight-light white--text"
                      >
                        {{ item.name.charAt(0) }}
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.name"></v-list-item-title>
                          <v-list-item-subtitle >{{item.title}}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon>mdi-check-box-outline</v-icon>
                      </v-list-item-action>
                    </template>
                  </v-autocomplete>
                </v-col>
                  </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save" 
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
</template>

<script>
 import axios from '@/axios'
import {data} from '@/helpers/data.js'
export default {
    props: ['dialogindustry','closeindustry', 'code', 'finishedloading'],
    data(){
      return{
        industry: '',
        store:'api/shop',
        title: 'industry',
        data
      }
    },
    methods:{
      close(){
          this.closeindustry()
      },
      async save(){
           try{
            this.close()
              this.$store.commit("setLoaderTrue")
            let fd = new FormData();
            fd.append("industry", this.industry)
            await axios.put(`${this.store}/${this.$store.getters.business}`, fd ,{'Content-Type': 'multipart/form-data'})
            this.finishedloading()
            this.$store.commit("setLoader")
          }catch(err){
            this.close()
            console.log(err)
                this.$store.commit("setLoader")
          }
        }
    }

}
</script>

<style>

</style>
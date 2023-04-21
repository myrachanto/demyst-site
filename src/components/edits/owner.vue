<template>
  <v-dialog
          v-model="dialogowner"
          max-width="800px"
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
                    sm="10"
                    md="10"
                  >
                    <v-text-field
                      v-model="shop.owner"
                      label="owner"
                    ></v-text-field>
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
export default {
    props: ['dialogowner','closeowner', 'code', 'shop', 'finishedloading'],
    data(){
      return{
        owner: '',
        store:'api/shop',
        title: 'owner'
      }
    },
    methods:{
      close(){
          this.closeowner()
      },
      async save(){
           try{
              this.$store.commit("setLoaderTrue")
            this.close()
            let fd = new FormData();
            this.owner = this.shop.owner
            fd.append("owner", this.owner)
            await axios.put(`${this.store}/${this.$store.getters.business}`, fd ,{'Content-Type': 'multipart/form-data'})
            this.finishedloading()
            this.$store.commit("setLoader")
          }catch(err){
            this.close()
                this.$store.commit("setLoader")
          }
        }
    }

}
</script>

<style>

</style>
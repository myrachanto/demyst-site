<template>
  <v-dialog
          v-model="dialogdescription"
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
                   <v-textarea
                        v-model="shop.description"
                        label="Description"
                        required
                      ></v-textarea>
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
    props: ['dialogdescription','closedescription', 'code', 'shop','finishedloading'],
    data(){
      return{
        description: '',
        store:'api/shop',
        title: 'description'
      }
    },
    methods:{
      close(){
          this.closedescription()
      },
      async save(){
           try{
              this.$store.commit("setLoaderTrue")
            this.close()
            let fd = new FormData();
            this.description = this.shop.description
            fd.append("description", this.description)
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
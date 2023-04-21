<template>
  <v-dialog
          v-model="dialogstreet"
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
                      v-model="shop.street"
                      label="street"
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
    props: ['dialogstreet','closestreet', 'code', 'shop', 'finishedloading'],
    data(){
      return{
        street: '',
        store:'api/shop',
        title: 'street'
      }
    },
    methods:{
      close(){
          this.closestreet()
      },
      async save(){
           try{
              this.$store.commit("setLoaderTrue")
            this.close()
            let fd = new FormData();
            this.street = this.shop.street
            fd.append("street", this.street)
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
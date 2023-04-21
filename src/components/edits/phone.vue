<template>
  <v-dialog
          v-model="dialogphone"
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
                      v-model="shop.phone"
                      label="phone"
                      type="Number"
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
    props: ['dialogphone','closephone', 'code','shop', 'finishedloading'],
    data(){
      return{
        phone: '',
        store:'api/shop',
        title: 'phone'
      }
    },
    methods:{
      close(){
          this.closephone()
      },
      async save(){
           try{
              this.$store.commit("setLoaderTrue")
            this.close()
            let fd = new FormData();
            this.phone = this.shop.phone
            fd.append("phone", this.phone)
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
<template>
  <v-dialog
          v-model="dialogname"
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
                      v-model="shop.name"
                      label="Name"
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
    props:{
      dialogname:{
        type: Boolean,
        default: false
      },      
      closename:{
        type: Function,
        default: () =>{}
      },   
      finishedloading:{
        type: Function,
        default: () =>{}
      },
      code:{
        type: String,
        default: ''
      },
      shop:{
        type: Object,
        default: () =>{}
      },
    },
    data(){
      return{
        name: '',
        store:'api/shop',
        title: 'Name'
      }
    },
    // watch: {
    //     shop: function () {
    //         this.name = this.shop.name;
    //     } 
    // },
    methods:{
      close(){
          this.closename()
      },
      async save(){
           try{
            this.$store.commit("setLoaderTrue")
            this.close()
            let fd = new FormData();
            fd.append("name", this.shop.name)
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
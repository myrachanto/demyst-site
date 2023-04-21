<template> 
<v-container class="">
                <v-row>
                  <v-col cols="12" sm="10" md="10">
               <v-card v-if="form"
            class="mx-auto"
          >
           <!-- <div
           class="height=300px"
           style="background:#CFD8DC"
           >
            <div class="d-flex justify-center">
              
            </div>  
            </div> -->
            <v-container>
              <v-row>
              <v-col cols="12" md="10" sm="10">
              {{form.name}} Accounting Software
              </v-col>
              </v-row>
              
            <v-row>
              <v-col cols="12" md="10" sm="10">
                 <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-card
                      class="pa-2"
                      outlined
                      tile
                    >
                    Name:<span class="greener">{{form.name}}</span>
                    </v-card>
                  </v-col><v-col cols="12" sm="6" md="6">
                    <v-card
                      class="pa-2"
                      outlined
                      tile
                    >
                    Business pin:<span class="greener">{{form.business_pin}}</span>
                    </v-card>
                  </v-col>
                </v-row>   
                <v-row><v-col cols="12" sm="12" md="12">
                    <v-card
                      class="pa-2"
                      outlined
                      tile
                    >
                    Url Endpoint:<span class="greener">{{form.urlEndpoint}}</span>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
              </v-row>
            </v-container>

          
          <div class="text-center mt-3">
                      <v-btn class="ma-3" dark @click="Back()">Back</v-btn>
                      <v-btn class="ma-3" color="blue accent-3" dark @click="Edit(form.code)">Edit</v-btn>
                    </div>
          </v-card>
                  </v-col>
  </v-row>
</v-container>
</template>
<script>
 import axios from '@/axios'
import {host} from '@/helpers/myconstants'


export default {
  name: "acountingsinfo",
  data(){
    return{
        form:{
        },
        show: false,
        errs:{},
        option:{},
        title:'Create',
        init:'api/accountings',
        redirect: '/accountings',
        store: 'api/accountings',
        method: 'post',
        snackbar:false,
        timeout:3000
    }
  },
  created(){
      this.fetchData()
      this.host = host
  },
  methods:{
    Edit(){
      this.$router.push(`${this.redirect}/${this.$route.params.code}/edit`)
    },
    Back(){
      this.$router.push(this.redirect)
    },
  
  async fetchData(){
      try{
              this.$store.commit("setLoaderTrue")
          const {data} = await axios.get(`${this.store}/${this.$route.params.code}`)
          this.form = data
                this.$store.commit("setLoader")
        }catch(err){
         this.snackbar = true
        //   console.log(err)
        this.errs = err.response.data
                this.$store.commit("setLoader")
        }
    }
  },    
  }
</script>

<style>

</style>
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
              <v-col md="6">
                 <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-card
                      class="pa-2"
                      outlined
                      tile
                    >
                    First Name:<span class="greener">{{form.f_name}}</span>
                    </v-card>
                  </v-col><v-col cols="12" sm="6" md="6">
                    <v-card
                      class="pa-2"
                      outlined
                      tile
                    >
                    Last Name:<span class="greener">{{form.l_name}}</span>
                    </v-card>
                  </v-col>
                </v-row>   
                <v-row><v-col cols="12" sm="6" md="6">
                    <v-card
                      class="pa-2"
                      outlined
                      tile
                    >
                    User Name:<span class="greener">{{form.u_name}}</span>
                    </v-card>
                  </v-col><v-col cols="12" sm="6" md="6">
                    <v-card
                      class="pa-2"
                      outlined
                      tile
                    >
                    phone:<span class="greener"> {{form.phone}}</span>
                    </v-card>
                    </v-col>
                </v-row>  
                <v-row><v-col cols="12" sm="6" md="6">
                    <v-card
                      class="pa-2"
                      outlined
                      tile
                    >
                   Address:<span class="greener"> {{form.address}}</span>
                    </v-card>
                  </v-col><v-col cols="12" sm="6" md="6">
                    <v-card
                      class="pa-2"
                      outlined
                      tile
                    >
                    Email:<span class="greener"> {{form.email}}</span>
                    </v-card>
                  </v-col>
                </v-row>  
              </v-col>
              <v-col md="6">
                <v-img v-if="form.picture"
              max-height="350"
              max-width="350"
              contain
              class="pa-7 "
              :src="`${host}/${form.picture}`"
            ></v-img>
              </v-col></v-row>
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
import cons from '@/helpers/myconstants'


export default {
  name: "Usersinfo",
  data(){
    return{
        form:{
        },
        show: false,
        errs:{},
        option:{},
        title:'Create',
        init:'api/users',
        redirect: '/users',
        store: 'api/users',
        method: 'post',
        snackbar:false,
        timeout:3000
    }
  },
  created(){
    console.log(this.form.picture)
      this.fetchData()
      this.host = cons.host
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
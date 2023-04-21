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
              <v-col cols="12" md="8" sm="8">
              {{form.name}} loan 
              </v-col>

              <v-col cols="12" md="4" sm="4">
                <v-btn class="ma-3" color="blue accent-3" dark @click="Submit(form.code)">Submit For Approval</v-btn>
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
                <v-row><v-col cols="12" sm="6" md="6">
                    <v-card
                      class="pa-2"
                      outlined
                      tile
                    >
                    Year Established:<span class="greener">{{form.year_established}}</span>
                    </v-card>
                  </v-col><v-col cols="12" sm="6" md="6">
                    <v-card
                      class="pa-2"
                      outlined
                      tile
                    >
                    Loan Amount:<span class="greener">{{form.amount}}</span>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <DataViewer :items="items" :headers="headers" />
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
import DataViewer from '@/components/viewers/loanItemsdataviewer.vue'


export default {
  name: "acountingsinfo",
  components:{
        DataViewer,
    },
  data(){
    return{
        form:{
        },
        show: false,
        errs:{},
        option:{},
        title:'Create',
        init:'api/loans',
        redirect: '/loans',
        store: 'api/loans',
        method: 'post',
        snackbar:false,
        timeout:3000,
        softs: [],
        items: [],
        headers:[
                { text: 'Year', value: 'year' },
                { text: 'Month', value: 'month' },
                { text: 'Profit Or Loss', value: 'profitOrLoss' },
                { text: 'Assets Value', value: 'assetsValue' },
              ]
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
    async Submit(code){
          try{
              this.$store.commit("setLoaderTrue")
            const {data} = await axios.put(`api/loans/${code}`)

                if(data){
                this.$router.push(this.redirect)
                }
                this.$store.commit("setLoader")
        }catch(err){
            this.snackbar = true
        this.errs = err.response.data
                this.$store.commit("setLoader")

        }

  },
    async fetchData(){
        try{
              this.$store.commit("setLoaderTrue")
            const {data} = await axios.get(`${this.store}/${this.$route.params.code}`)
            
            // const {user} = data
            if(data){
            this.form = data.loan
            this.items = data.data
            }
                this.$store.commit("setLoader")
          }catch(err){
          this.snackbar = true
          //   console.log(err)
          this.errs = err.response.data
                this.$store.commit("setLoader")
          } 
      }, 
  },    
  }
</script>

<style>

</style>
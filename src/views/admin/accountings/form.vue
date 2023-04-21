<template>  
  <div>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="12" md="12">
            <v-card class="elevation-12">
                    <ValidationObserver
                      ref="observer"
                      v-slot="{}"
                    >
                 <v-row class="fill-height">
                   
                   <v-col cols="12" md="12">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">
                          {{title}}
                        </h1>
                        
                        <template >  
                                    <v-snackbar
                                    :timeout="timeout"
                                    v-model="snackbar"
                                    :value="true"
                                    right
                                    shaped
                                    bottom
                                    dismisable
                                    color="red"
                                  >
                                <h2>{{errs.error}}</h2>
                                <p>{{errs.message}}</p>
                                  </v-snackbar>
                              
                            </template>
                        <v-form>
                                 <v-container>
                                  <v-row>
                                    <v-col
                                      cols="12"
                                      md="6"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="Name"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.name"
                                        :error-messages="errors"      
                                        label=" Name"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="6"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Business Pin"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.business_pin"
                                        label="Business Pin"
                                        :error-messages="errors"   
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>
                                      <v-row>
                                         <v-col
                                      cols="12"
                                      md="12"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Url Endpoint"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.urlEndpoint"
                                        label="Url Endpoint"
                                        :error-messages="errors"   
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                   </v-row>   
                                  
                                </v-container>
                        
                      </v-form>
                        <!-- <h3 class="text-center mt-3">have an account with us </h3> -->
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn class="ma-3" dark @click="Back()">Back</v-btn>
                        <v-btn class="ma-3" color="teal accent-3" @click="save()">Save</v-btn>
                      </div>
                      </v-col>
                 </v-row>
                    </ValidationObserver>
                
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  
  </div>
  </template>
  
  <script>
   import axios from '@/axios'
  import {data} from '@/helpers/data.js'
  import {host} from '@/helpers/myconstants'
  
    import { required, email, max } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
   setInteractionMode('eager')
  
    extend('required', {
      ...required,
      message: '{_field_} can not be empty',
    })
  
    extend('max', {
      ...max,
      message: '{_field_} may not be greater than {length} characters',
    })
  
    extend('email', {
      ...email,
      message: 'Email must be valid',
    })
  
  export default {
    name: "accountingcreate",
    components: {
        ValidationProvider,
        ValidationObserver,
      },
    data(){
      return{ 
          form:{
              name: '',
              business_pin: '',
              urlEndpoint: '',
          },
          page: '',
          majorcats:[],
          errs:{},
          option:[],
          title:'Add accounting Software',
          init:'api/accountings/view',
          redirect: '/accountings',
          store: 'api/accountings',
          method: 'post',
          snackbar:false,
          timeout:3000,
          data
      }
    },
    created(){
        this.host = host
        console.log("this data", this.data)
    },
    methods:{
      Back(){
        this.$router.push(this.redirect)
      },
      View(id){
        this.$router.push(`${this.redirect}/show/${id }`)
      } ,
     async save(){
            try{
                this.$store.commit("setLoaderTrue")
                   let fd = new FormData();
                   fd.append("name", this.form.name)
                   fd.append("business_pin", this.form.business_pin)
                   fd.append("urlEndpoint", this.form.urlEndpoint)
              const {data} = await axios.post(`${this.store}`, 
                 fd ,{'Content-Type': 'multipart/form-data'})
  
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
    }
    }
  </script>
  
  <style>
  
  </style>
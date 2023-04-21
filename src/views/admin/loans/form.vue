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
                                      cols="6"
                                      md="6"
                                    ><validation-provider
                                        name="Accounting software"
                                        rules="required|"
                                      >
                                      
                                   <v-autocomplete
                                        v-model="form.accounting_software"
                                        :items="softs"
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
                                      </validation-provider>
                                    </v-col> 
                                    <v-col
                                      cols="6"
                                      md="6"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Amount"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.amount"
                                        label="Amount"
                                        :error-messages="errors"   
                                        required
                                        type="Number"
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                    <v-col
                                      cols="6"
                                      md="6"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Year Established"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.year_established"
                                        label="Year Established"
                                        :error-messages="errors"   
                                        required
                                        type="Number"
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
    name: "loancreate",
    components: {
        ValidationProvider,
        ValidationObserver,
      },
    data(){
      return{ 
          form:{
              name: '',
              business_pin: '',
              accounting_software: '',
              amount: 0,
              year_established: 0
          },
          page: '',
          majorcats:[],
          errs:{},
          option:[],
          title:'Add loan',
          init:'api/loans/view',
          redirect: '/loans',
          store: 'api/loans',
          method: 'post',
          snackbar:false,
          timeout:3000,
          data,
          softs:[]
      }
    },
    created(){
        this.host = host
        console.log("this data", this.data)
        this.fetchData()
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
                   fd.append("amount", this.form.amount)
                   fd.append("accounting_software", this.form.accounting_software)
                   fd.append("year_established", this.form.year_established)
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
  async fetchData(){
      try{
              this.$store.commit("setLoaderTrue")
          const {data} = await axios.get(`api/accountings`)
          this.softs = data
                this.$store.commit("setLoader")
        }catch(err){
         this.snackbar = true
        //   console.log(err)
        this.errs = err.response.data
                this.$store.commit("setLoader")
        }
    }
    }
    }
  </script>
  
  <style>
  
  </style>
<template>  
<div>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
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
                                      md="4"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="first name"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.f_name"
                                        :error-messages="errors"      
                                        label=" first Name"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Last Name"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.l_name"
                                        label="Last name"
                                        :error-messages="errors"   
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col> <v-col
                                      cols="12"
                                      md="4"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Username"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.u_name"
                                        label="User Name"
                                        :error-messages="errors"   
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>
                                      <v-row>
                                  <v-col
                                    cols="12"
                                    md="6"
                                  >
                                    <validation-provider
                                        v-slot="{ errors }"
                                        name="Phone"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.phone"
                                        label="Phone"
                                        type="number"
                                        :error-messages="errors" 
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                  </v-col>
                                  <v-col
                                      cols="12"
                                      md="6"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Email"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.email"
                                        label="Email"
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
                                        name="Address"
                                        rules="required"
                                      >
                                      <v-textarea
                                        v-model="form.address"
                                        name="input-7-1"
                                        label="Address"
                                        :error-messages="errors" 
                                        required
                                      ></v-textarea>
                                      </validation-provider>
                                    </v-col>
                                   </v-row>
                                   <v-row>
                                    <v-col
                                      cols="12"
                                      md="6"
                                    >   <v-file-input
                                        accept="image/*"
                                        label="Change Image"
                                        required
                                        type="file"
                                        @change="onFile"
                                      ></v-file-input>
                                      </v-col>
                                      <v-col
                                      cols="12"
                                      md="6"
                                    >   
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
import cons from '@/helpers/myconstants'

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
  name: "Usercreate",
  components: {
      ValidationProvider,
      ValidationObserver,
    },
  data(){
    return{
        form:{
            f_name:'',
            l_name:'',
            u_name:'',
            phone:'',
            address:'',
            email:'',
            picture:{}
        },
        majorcats:[],
        errs:{},
        option:[],
        title:'Create user',
        init:'api/users/view',
        redirect: '/users',
        store: 'api/users',
        method: 'post',
        snackbar:false,
        timeout:3000
    }
  },
  created(){
      this.host = cons.host
  },
  methods:{
    onFile(e){
      console.log(e)
      this.form.picture = e
    },
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
                 fd.append("picture", this.form.picture, this.form.picture.name)
                 fd.append("fname", this.form.f_name)
                 fd.append("lname", this.form.l_name)
                 fd.append("uname", this.form.u_name)
                 fd.append("phone", this.form.phone)
                 fd.append("address", this.form.address)
                 fd.append("email", this.form.email)
            // axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
            const {data} = await axios.post(`${this.store}`, 
               fd ,{'Content-Type': 'multipart/form-data'})

                if(data){
                this.$router.push(this.redirect)
                }
                this.$store.commit("setLoader")
        }catch(err){
            this.snackbar = true
            this.errs = err
                this.$store.commit("setLoader")

        }

  },
  }
  }
</script>

<style>

</style>
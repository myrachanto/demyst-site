<template>
  <front>
          <validation-observer
    ref="observer"
    v-slot="{ }"
  >
      <v-container fill-height fluid>
        <v-row align="center"
      justify="center">
                <v-col 
                class="auto"
                cols="12"
                md="8"
                sm="8">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  
                </v-tooltip>
               
              </v-toolbar>
              <v-card-text>
                  <v-form>
                                 <v-container>
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
                                  <v-row>
                                    <v-col
                                      cols="12"
                                      md="6"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="firstname"
                                        rules="required|max:10"
                                      >
                                      <v-text-field
                                        v-model="form.firstname"
                                        :counter="20"
                                        :error-messages="errors"      
                                        label="First name"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="6"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="lastname"
                                        rules="required|max:10"
                                      >
                                      <v-text-field
                                        v-model="form.lastname"
                                        :counter="20"
                                        label="Last name"
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
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="username"
                                        rules="required|max:10"
                                      >
                                      <v-text-field
                                        v-model="form.username"
                                        :counter="20"
                                        label="User name"
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
                                        name="phone"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.phone"
                                        :error-messages="errors" 
                                        label="Phone"
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
                                      <v-text-field
                                        v-model="form.address"
                                        label="Address"
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
                                        name="email"
                                        rules="required|email"
                                      >
                                      <v-text-field
                                        v-model="form.email"
                                        :error-messages="errors" 
                                        label="Email"
                                        required
                                        type="email"
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
                                        name="password"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.password"
                                        label="Password"
                                        :error-messages="errors" 
                                        required
                                        type="password"
                                      ></v-text-field>
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
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" to="/login">login</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="Register">Create</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
          </validation-observer>
  </front>
</template>

<script>
import front from '@/layouts/front'
import axios from 'axios'
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
    components: {
      ValidationProvider,
      ValidationObserver,
      front
    },
    data: () => ({
        form:{
             firstname:'',
            lastname:'',
            username:'',
            phone:'',
            address:'',
            email:'',
            password:'',
            picture:{}
        },
      errors: null,
      timeout: 3000,
      snackbar:false,
      errs:{}
    }),

     methods: {
      onFile(e){
        console.log(e)
        this.form.picture = e
      },
        login(){
          this.$router.push("/mwaniki/login")
        },
        async Register(){
                try {
                  this.$store.commit("setLoaderTrue")
                  let fd = new FormData();
                 fd.append("picture", this.form.picture, this.form.picture.name)
                 fd.append("fname", this.form.firstname)
                 fd.append("lname", this.form.lastname)
                 fd.append("uname", this.form.username)
                 fd.append("phone", this.form.phone)
                 fd.append("address", this.form.address)
                 fd.append("email", this.form.email)
                 fd.append("business", this.form.business)
                 fd.append("password", this.form.password)
                const response = await axios.post('/register', fd ,{'Content-Type': 'multipart/form-data'})
                 if(response){
                    this.$router.push("/login")
                }
                this.$store.commit("setLoader")
        }catch(err){
                this.snackbar = true
                console.log(err)
        this.errs = err.response.data
                this.$store.commit("setLoader")
         }
        },
     }

  }
</script>
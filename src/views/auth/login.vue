<template>
  <front>
          
          <validation-observer
    ref="observer"
    v-slot="{ }"
  >
      <v-container fill-height fluid>
        <v-row align="center"
              justify="center"
              >
                <v-col 
                class="auto"
                cols="12"
                sm="8"
                md="8">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  
                </v-tooltip>
                
              </v-toolbar>
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
              <v-card-text>
                <v-form>
                    <validation-provider
                        v-slot="{ errors }"
                        name="email"
                        rules="required"
                    >
                        <v-text-field
                        prepend-icon="person"
                        v-model="email"
                        :error-messages="errors"
                        label="Email"
                        required
                        ></v-text-field>
                    </validation-provider>
                    <validation-provider
                        v-slot="{ errors }"
                        name="email"
                        rules="required|max:10"
                    >
                        <v-text-field
                        prepend-icon="lock"
                        v-model="password"
                        :error-messages="errors"
                        label="Password"
                        type="password"
                        required
                        ></v-text-field>
                    </validation-provider>
                </v-form>
              </v-card-text>
              <v-card-actions>
                
                <v-btn color="info" to="/forgot">forgot</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="Login">Login</v-btn>
                <v-btn color="primary" to="/register">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
          </validation-observer>
  </front>
</template>

<script>
import front from '../../layouts/front'
//  import axios from 'axios'
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
      password: '',
      email: '',
      errors: null,
      timeout: 3000,
      snackbar:false,
      errs:{}
    }),

    methods: {
    signup(){
      this.$router.push("/register")
    },
     async Login(){ 
       try{
          let email = this.email
          let password = this.password
          let alias = this.$route.path.split("/")[1]
          const { data } = await this.$store.dispatch('login', { email, password, alias })
          if( data.token == ""){
              throw new Error("somthing went wrong!!")
          }
        this.$router.push('/loans');
       }catch(err){
                this.snackbar = true 
                console.log(err)
                this.errs = err.response.data
       }
     }
    //  async Login(){ 
    //     try {
    //           this.$store.commit("setLoaderTrue")
    //             let fd = new FormData();
    //              fd.append("email", this.email) 
    //              fd.append("password", this.password)
    //             const {data} = await axios.post('/login', fd ,{'Content-Type': 'multipart/form-data'})
    //             // console.log(data)
    //           if(data){
    //             // console.log(data)
    //                 localStorage.setItem('access_token', data.token)
    //                 localStorage.setItem('username', data.uname)
    //                 localStorage.setItem('picture', data.picture)
    //                 localStorage.setItem('admin', data.admin)
    //                 localStorage.setItem('supervisor', data.supervisor)
    //                 localStorage.setItem('employee', data.employee)
    //                 localStorage.setItem('usercode', data.usercode)
    //                 localStorage.setItem('business', data.business)
    //                 this.$store.commit('userlogin', data)
    //             } 
    //             // this.$router.push('/dashboard');
    //             this.$store.commit("setLoader")
    //             ///set new details///////////
               
    //         }catch(error){
    //             this.snackbar = true
    //             console.log(error)
    //             this.errs = error
    //             this.$store.commit("setLoader")
    //         }
    //     },
    }
}
</script>
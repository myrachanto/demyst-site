<template>   
<admin>       
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
                <v-toolbar-title>Change Password</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  
                </v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon large>mdi-home</v-icon>
                    </v-btn>
                  </template>admin
                  <span>Home</span>
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
                        name="oldpassword"
                        rules="required"
                    >
                        <v-text-field
                        prepend-icon="key"
                        v-model="oldpassword"
                        :error-messages="errors"
                        label="Old password"
                        type="password"
                        required
                        ></v-text-field>
                    </validation-provider> <validation-provider
                        v-slot="{ errors }"
                        name="newpassword"
                        rules="required"
                    >
                        <v-text-field
                        prepend-icon="key"
                        v-model="newpassword"
                        :error-messages="errors"
                        label="New password"
                        type="password"
                        required
                        ></v-text-field>
                    </validation-provider> <validation-provider
                        v-slot="{ errors }"
                        name="confirmpassword"
                        rules="required"
                    >
                        <v-text-field
                        prepend-icon="key"
                        v-model="confirmpassword"
                        :error-messages="errors"
                        label="Confirm password"
                        type="password"
                        required
                        ></v-text-field>
                    </validation-provider> <validation-provider
                        v-slot="{ errors }"
                        name="email"
                        rules="required"
                    >
                        <v-text-field
                        prepend-icon="key"
                        v-model="email"
                        :error-messages="errors"
                        label="Email"
                        required
                        ></v-text-field>
                    </validation-provider>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="getpass">Change password</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
          </validation-observer>
</admin>
</template>

<script>
 import axios from '@/axios'
  import { required, email, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import Admin from '../../layouts/admin.vue'

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
      Admin
    },
    data: () => ({
      oldpassword: '',
      newpassword: '',
      confirmpassword: '',
      email: '',
      errors: null,
      timeout: 3000,
      snackbar:false,
      errs:{}
    }),

    methods: {
     async getpass(){ 
       try{
           this.$store.commit("setLoaderTrue")
           if (this.newpassword !== this.confirmpassword){
               return
           }
            let fd = new FormData();
            fd.append("email", this.email)
            fd.append("oldpassword", this.oldpassword)
            fd.append("newpassword", this.newpassword)
      // axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
       await axios.put('/api/users/password', fd, {'Content-Type': 'multipart/form-data'})
        this.$router.push('/users');
          this.$store.commit("setLoader")
          
       }catch(err){
                this.snackbar = true 
                console.log(err)
                this.errs = err.response.data
       }
     }
    }
}
</script>
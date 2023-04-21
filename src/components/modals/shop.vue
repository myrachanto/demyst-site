<template>
  <v-dialog
          v-model="dialogshop"
          max-width="1000px"
          persistent
        >
          <validation-observer
    ref="observer"
    v-slot="{ }"
  >
          <v-card>
            <v-card-title >
              <span class="headline">{{title}}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  ><validation-provider
                                        v-slot="{ errors }"
                                        name="Name"
                                        rules="required"
                                      >
                    <v-text-field
                      v-model="form.name"
                                        :error-messages="errors" 
                      label="Name"
                    ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  ><validation-provider
                                        v-slot="{ errors }"
                                        name="Title"
                                        rules="required"
                                      >
                    <v-text-field
                      v-model="form.title"
                                        :error-messages="errors" 
                      label="Title"
                    ></v-text-field>
                    </validation-provider>
                  </v-col>
                   <v-col
                  cols="12"
                  md="6"
                  v-if="data"
                ><validation-provider
                                        v-slot="{ errors }"
                                        name="Indutry"
                                        rules="required"
                                      >
                <v-autocomplete
                    v-model="form.industry"
                                        :error-messages="errors" 
                    :items="data"
                    chips
                    clearable
                    hide-details
                    hide-selected
                    item-text="name"
                    item-value="title"
                    label="industry"
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
                    cols="12"
                    sm="12"
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
                    ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                  ><validation-provider
                                        v-slot="{ errors }"
                                        name="Website"
                                        rules="required"
                                      >
                    <v-text-field
                      v-model="form.website"
                                        :error-messages="errors" 
                      label="Website"
                    ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                  ><validation-provider
                                        v-slot="{ errors }"
                                        name="Email"
                                        rules="required"
                                      >
                    <v-text-field
                      v-model="form.email"
                                        :error-messages="errors" 
                      label="Email"
                    ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                  ><validation-provider
                                        v-slot="{ errors }"
                                        name="Owner"
                                        rules="required"
                                      >
                    <v-text-field
                      v-model="form.owner"
                                        :error-messages="errors" 
                      label="Owner"
                    ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                  ><validation-provider
                                        v-slot="{ errors }"
                                        name="Twitter"
                                        rules="required"
                                      >
                    <v-text-field
                      v-model="form.twitter"
                                        :error-messages="errors" 
                      label="Twitter"
                    ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                  ><validation-provider
                                        v-slot="{ errors }"
                                        name="facebook"
                                        rules="required"
                                      >
                    <v-text-field
                      v-model="form.facebook"
                                        :error-messages="errors" 
                      label="facebook"
                    ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                  ><validation-provider
                                        v-slot="{ errors }"
                                        name="Instagram"
                                        rules="required"
                                      >
                    <v-text-field
                      v-model="form.instagram"
                                        :error-messages="errors" 
                      label="Instagram"
                    ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                  ><validation-provider
                                        v-slot="{ errors }"
                                        name="Country"
                                        rules="required"
                                      >
                    <v-text-field
                      v-model="form.country"
                                        :error-messages="errors" 
                      label="Country"
                    ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                  ><validation-provider
                                        v-slot="{ errors }"
                                        name="County"
                                        rules="required"
                                      >
                    <v-text-field
                      v-model="form.County"
                                        :error-messages="errors" 
                      label="county"
                    ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                  ><validation-provider
                                        v-slot="{ errors }"
                                        name="Town"
                                        rules="required"
                                      >
                    <v-text-field
                      v-model="form.town"
                                        :error-messages="errors" 
                      label="Town"
                    ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <!-- <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="form.pin"
                      label="Pin"
                    ></v-text-field>
                  </v-col> -->
                  <v-col
                      cols="12"
                      md="6"
                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Description"
                                        rules="required"
                                      >
                      <v-textarea
                        v-model="form.description"
                                        :error-messages="errors" 
                        label="Description"
                        required
                      ></v-textarea>
                      </validation-provider>
                    </v-col>
                  <v-col
                      cols="12"
                      md="6"
                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Bio"
                                        rules="required"
                                      >
                      <v-textarea
                        v-model="form.highlight"
                                        :error-messages="errors" 
                        label="Bio"
                        required
                      ></v-textarea>
                      </validation-provider>
                    </v-col>
                    <v-col
                        cols="12"
                        md="12"
                      >   <v-file-input
                          accept="image/*"
                          label="Change Image"
                          required
                          type="file"
                          @change="onFile"
                        ></v-file-input>
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
          </validation-observer>
        </v-dialog>
</template>

<script>
 import axios from '@/axios'
import {data} from '@/helpers/data.js'
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
    },
    props: ['dialogshop','shopclose'],
    data(){
      return{
        form:{
          name:'',
          title:'',
          industry:'',
          phone:'',
          website:'',
          email:'',
          owner:'',
          twitter:'',
          facebook:'',
          instagram:'',
          country:'',
          county:'',
          town:'',
          pin:'',
          highlight:'',
          description:'',
          picture: {}
        },
        store:'api/shop',
        title: 'Register a Business',
        // majorcode: props.majorcode,
        data
      }
    },
    methods:{
      
    onFile(e){
      console.log(e)
      this.picture = e
    },
      close(){
        this.form.name = ''
        this.form.title = ''
        this.form.description = ''
        this.form.picture = null 
          this.shopclose()
      },
      async save(){
           try{
              this.$store.commit("setLoaderTrue")
              if (this.picture !== "" && this.picture != undefined){

              let fd = new FormData();
                  fd.append("picture", this.picture, this.picture.name)
                  fd.append("name", this.form.name)
                  fd.append("title", this.form.title)
                  fd.append("url", this.form.name.split(' ').join('-'))
                  fd.append("industry", this.form.industry)
                  fd.append("phone", this.form.phone)
                  fd.append("website", this.form.website)
                  fd.append("email", this.form.email)
                  fd.append("owner", this.form.owner)
                  fd.append("twitter", this.form.twitter)
                  fd.append("facebook", this.form.facebook)
                  fd.append("instagram", this.form.instagram)
                  fd.append("country", this.form.country)
                  fd.append("county", this.form.county)
                  fd.append("town", this.form.town)
                  fd.append("pin", this.form.pin)
                  fd.append("highlight", this.form.highlight)
                  fd.append("description", this.form.description)
                  fd.append("usercode", this.$store.getters.usercode)
                  console.log("kkkkkkkkkk", this.form)
                  await axios.post(this.store, fd ,{'Content-Type': 'multipart/form-data'})
                  this.close()
                this.$store.commit("setsnacker", {mess:'Successifuly!!!', color: "green"})
              }else {
                let fd = new FormData();
                 fd.append("name", this.form.name)
                 fd.append("title", this.form.title)
                 fd.append("url", this.form.name.split(' ').join('-'))
                 fd.append("industry", this.form.industry)
                 fd.append("phone", this.form.phone)
                 fd.append("website", this.form.website)
                 fd.append("email", this.form.email)
                 fd.append("owner", this.form.owner)
                 fd.append("twitter", this.form.twitter)
                 fd.append("facebook", this.form.facebook)
                 fd.append("instagram", this.form.instagram)
                 fd.append("country", this.form.country)
                 fd.append("county", this.form.county)
                 fd.append("town", this.form.town)
                 fd.append("pin", this.form.pin)
                 fd.append("highlight", this.form.highlight)
                 fd.append("description", this.form.description)
                 fd.append("usercode", this.$store.getters.usercode)
                 console.log("kkkkkkkkkk", this.form)
                await axios.post(this.store, fd ,{'Content-Type': 'multipart/form-data'})
                this.close()
                this.$store.commit("setsnacker", {mess:'Successifuly!!!', color: "green"})
              }
          }catch(err){
            this.close()
              this.$store.commit("setsnacker", {mess:err.response.data.message, color: "red"})
          }
        }
    }

}
</script>

<style>

</style>
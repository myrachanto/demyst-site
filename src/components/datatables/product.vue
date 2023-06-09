<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="name"
    class="elevation-1"
    z-index="3"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{$route.params.cat}}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            > <v-icon>fas fa-plus</v-icon></v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                 <ValidationObserver
                    ref="observer"
                    v-slot="{}"
                  >
                <v-row> <v-snackbar
                                  :timeout="timeout"
                                  v-model="snackbar"
                                  :value="true"
                                  absolute
                                  left
                                  shaped
                                  top
                                  dismisable
                                  color="red"
                                >
                              <h2>{{errs.error}}</h2>
                              <p>{{errs.message}}</p>
                                </v-snackbar>
                  <v-col cols="12" sm="12" md="12">
                    <validation-provider
                                        v-slot="{ errors }"
                                        name="name"
                                        rules="required"
                                      >
                    <v-text-field v-model="editedItem.name" 
                    label="Name"
                    :error-messages="errors"   
                    required
                    ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <validation-provider
                                        v-slot="{ errors }"
                                        name="title"
                                        rules="required"
                                      >
                    <v-text-field v-model="editedItem.title" 
                    label="Title"
                    :error-messages="errors"   
                    required
                    ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <validation-provider
                      v-slot="{ errors }"
                      name="description"
                      rules="required"
                    >
                    <v-textarea
                    filled
                    name="input-7-4"
                    v-model="editedItem.description"
                    label="Description"
                    :error-messages="errors"   
                    required
                  ></v-textarea>
                    </validation-provider>
                  </v-col>
                  <v-col
                        cols="12"
                        md="12"
                      >   <v-file-input
                          accept="image/*"
                          label="Picture"
                          required
                          type="file"
                          @change="onFile"
                        ></v-file-input>
                        </v-col>
                </v-row>
                 </ValidationObserver>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="fetchData">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script> 
import axios from '@/axios'
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
  name: "product",
    data: () => ({
      title: 'Products',
      dialog: false,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions', sortable: false}
      ],
      errs:{},
      option:[],
      init:'api/products/view',
      redirect: '/products',
      store: 'api/products',
      snackbar:false,
      timeout:3000,
      items: [],
      picture: {},
      editedIndex: -1,
      editedItem: {
        name: '',
        title: '',
        description: '',
        picture: ''
      },
      defaultItem: {
        name: '',
        title: '',
        description: '',
        picture: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      }, 
      $route (){
      this.fetchData()
    }

    },

    created () {
      this.fetchData()
    },

    methods: {
      onFile(e){
      console.log(e)
      this.picture = e
    },
      async fetchData () {
            try{
                  this.$store.commit("setLoaderTrue")
                // console.log(token)
              const {data} = await axios.get(`${this.init}/${this.$route.params.cat}`)
                this.items = data
                    this.$store.commit("setLoader")
            }catch(err){
              console.log(err)
                    this.$store.commit("setLoader")
            }
        }, 

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          try{
              this.$store.commit("setLoaderTrue")
                if (this.picture){
                let fd = new FormData();
                  fd.append("picture", this.picture, this.picture.name)
                 fd.append("name", this.editedItem.name)
                 fd.append("title", this.editedItem.title)
                 fd.append("category", this.$route.params.cat)
                 fd.append("majorcategory", this.$route.params.code)
                 fd.append("description", this.editedItem.description)
                 fd.append("pcode", this.editedItem.code)
                // fd.append("usercode", this.$store.getters.usercode);
                  await axios.put(`${this.store}/${this.editedItem.code}`, fd ,{'Content-Type': 'multipart/form-data'})
                  this.close()
                 this.fetchData()
                this.$store.commit("setLoader")
              }else{
                let fd = new FormData();
                 fd.append("name", this.editedItem.name)
                 fd.append("title", this.editedItem.title)
                 fd.append("category", this.$route.params.cat)
                 fd.append("majorcategory", this.$route.params.code)
                 fd.append("description", this.editedItem.description)
                 fd.append("pcode", this.editedItem.code)
                // fd.append("usercode", this.$store.getters.usercode);
                  await axios.put(`${this.store}/${this.editedItem.code}`, fd ,{'Content-Type': 'multipart/form-data'})
                  this.close()
                 this.fetchData()
                this.$store.commit("setLoader")
              }
          }catch(err){
            this.snackbar = true
            console.log(err)
            this.errs = err.response.data
                this.$store.commit("setLoader")
          }
        } else {
          try{
              this.$store.commit("setLoaderTrue")
                if (this.picture){
                let fd = new FormData();
                  fd.append("picture", this.picture, this.picture.name)
                 fd.append("name", this.editedItem.name)
                 fd.append("title", this.editedItem.title)
                 fd.append("category", this.$route.params.cat)
                 fd.append("majorcategory", this.$route.params.code)
                 fd.append("description", this.editedItem.description)
                  await axios.post(this.store, fd ,{'Content-Type': 'multipart/form-data'})
                  this.close()
                 this.fetchData()
                this.$store.commit("setLoader")
                }else{
                let fd = new FormData();
                 fd.append("name", this.editedItem.name)
                 fd.append("title", this.editedItem.title)
                 fd.append("category", this.$route.params.cat)
                 fd.append("majorcategory", this.$route.params.code)
                 fd.append("description", this.editedItem.description)
                  await axios.post(this.store, fd ,{'Content-Type': 'multipart/form-data'})
                  this.close()
                 this.fetchData()
                this.$store.commit("setLoader")
                }
          }catch(err){
            this.snackbar = true
            console.log(err)
            this.errs = err.response.data
            this.$store.commit("setLoader")
          }
        }
        this.close()
      },
    },
  }
</script>
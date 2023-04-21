<template>
<div>
  <v-dialog
          v-model="dialogproduct"
          max-width="800px"
          persistent
        >
          <v-card>
            <v-card-title>
              <span class="headline">{{title}}</span>
            </v-card-title>

                <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="form.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="form.title"
                      label="Title"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      md="12"
                    >
                      <v-textarea
                        v-model="form.description"
                        label="Description"
                        required
                      ></v-textarea>
                    </v-col>
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
                      <v-img :src="`${$hosti}${form.picture}`" />
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
        </v-dialog>
  </div>
</template>

<script>
 import axios from '@/axios'
export default {
    props: ['dialogproduct','productclose', "getproductlist", "completeload", "form"],
    data(){
      return{
        product: '',
        store:'api/products',
        title: 'products',
        picture: {},
        // item:{
        //   name:'',
        //   title:'',
        //   description: '',
        // }
        // majorcode: props.majorcode
      }
    },
  // components: {
  //   Productedit,
  //   },
    created (){
      this.fetchData()
    },
    methods:{
      
    onFile(e){
      console.log(e)
      this.picture = e
    },
      getproduct(name){
        // console.log("product", name)
        const product = this.items.find(item => item.name === name)
        // console.log("product", product)
        this.form.product = product
        // console.log(product.code)
      },
      close(){
          this.productclose()
      }, 
      complete(){
        this.form = {}
          this.completeload()
      },    
      async save(){
        console.log("whiiiiiiiiiiiiiiiiiii", this.form)
           try{
            //  this.item.name = this.form.name
            //  this.item.title = this.form.title
            //  this.item.description = this.form.description
             if (this.picture !== "null" && this.picture !== "undefined" && this.picture.name !== "" && this.picture.name !== "undefined"){               
              this.$store.commit("setLoaderTrue")
              console.log("here we go!!!!!!!!!!!!!!!!")
                this.close()
                  let fd = new FormData();
                 fd.append("picture", this.picture, this.picture.name)
                 fd.append("name", this.form.name)
                 fd.append("title", this.form.title)
                 fd.append("description", this.form.description)
                 fd.append("usercode", this.$store.getters.usercode)
                 fd.append("business", this.$store.getters.business)
                await axios.put(`${this.store}/${this.form.code}`, fd ,{'Content-Type': 'multipart/form-data'})
                this.complete()
                this.$store.commit("setLoader")
             }else{
              this.$store.commit("setLoaderTrue")
                this.close()
                 let fd = new FormData();
                 fd.append("name", this.form.name)
                 fd.append("title", this.form.title)
                 fd.append("description", this.form.description)
                 fd.append("usercode", this.$store.getters.usercode)
                await axios.put(`${this.store}/${this.form.code}`, fd ,{'Content-Type': 'multipart/form-data'})
                this.complete()
                this.$store.commit("setLoader")
             }
          }catch(err){
            this.close()
            console.log(err)
                this.$store.commit("setLoader")
          }
      },    
      async fetchData () {
            try{
                  this.$store.commit("setLoaderTrue")
                // console.log(token)
              const {data} = await axios.get(`/api/products`)
                this.items = data
                    this.$store.commit("setLoader")
            }catch(err){
              console.log(err)
                    this.$store.commit("setLoader")
            }
        }, 

    }

}
</script>

<style>

</style>
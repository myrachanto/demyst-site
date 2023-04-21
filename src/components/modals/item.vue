<template>
  <v-dialog
          v-model="dialogitemi"
          max-width="500px"
          persistent
        >
          <v-card>
            <v-card-title>
              <span class="headline">Create new Item</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="form.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="form.price"
                      label="Price"
                      type="Number"
                    ></v-text-field>
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
</template>

<script>
export default {
    props: ['dialogitemi','itemiclose', 'savor'],
    data(){
      return{
        form:{
          name:'',
          price:''
        },
        store:'api/item'
      }
    },
    methods:{
      close(){
          this.itemiclose()
          this.form.name = '',
          this.form.price = ''
      },
      async save(){
           try{
              this.$store.commit("setLoaderTrue")
                let name = this.form.name
                let price =  this.form.price
                let data = {"name":name,"price":price}
                this.savor(data)
                this.close()
                this.$store.commit("setLoader")
          }catch(err){
            this.close()
            console.log(err)
                this.$store.commit("setLoader")
          }
        }
    }

}
</script>

<style>

</style>
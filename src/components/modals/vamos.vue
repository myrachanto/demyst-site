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
                      md="12"
                    >
                      <v-textarea
                        v-model="description"
                        label="Description"
                        required
                      ></v-textarea>
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
    props: ['dialog','close', 'savor'],
    data(){
      return{
        description:'',
      }
    },
    methods:{
      close(){
          this.itemiclose()
          this.description = ''
      },
      async save(){
           try{
              this.$store.commit("setLoaderTrue")
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
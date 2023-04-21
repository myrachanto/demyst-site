<template>
  <v-dialog
          v-model="dialogsizingi"
          max-width="500px"
          persistent
        >
          <v-card>
            <v-card-title>
              <span class="headline">Create new sizing</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="12"
                  >
                    <v-text-field
                      v-model="name"
                      label="size Available"
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
    props: ['dialogsizingi','sizingiclose', 'sizingsavor'],
    data(){
      return{
        name: '',
        store:'api/sizing'
      }
    },
    methods:{
      close(){
          this.sizingiclose()
          this.name = ''
      },
      async save(){
           try{
            //  console.log("////////////////////")
              this.$store.commit("setLoaderTrue")
                let name = this.name
                let datas = {"name":name}
                // console.log(datas, "dddddddddddd")
                this.sizingsavor(datas)
                this.$store.commit("setLoader")
                this.close()
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
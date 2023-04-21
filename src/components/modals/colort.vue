<template>
  <v-dialog
          v-model="dialogcolori"
          max-width="500px"
          persistent
        >
          <v-card>
            <v-card-title>
              <span class="headline">Create new color</span>
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
                      label="Color Available"
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
    props: ['dialogcolori','coloriclose', 'colorsavor'],
    data(){
      return{
        name: '',
        store:'api/color'
      }
    },
    methods:{
      close(){
          this.coloriclose()
          this.name = ''
      },
      async save(){
           try{
              this.$store.commit("setLoaderTrue")
                let name = this.name
                let datas = {"name":name}
                // console.log(datas, "dddddddddddd")
                this.close()
                this.colorsavor(datas)
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
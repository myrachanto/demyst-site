<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="`${$hosti}${item.picture}`"
      height="300px"
    ></v-img>

    <v-card-title>
      {{item.name}}
    </v-card-title>

    <v-card-subtitle>
      {{item.description}}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
        @click="edit(item)"
      >
        Edit
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        color="orange lighten-2"
        text
        @click="Remove(item.code)"
      >
        Remove
      </v-btn>
    </v-card-actions>

  <productedit :dialogproduct="dialogproduct" :productclose="productclose" :form="form" :completeload="completeload"/>
  </v-card>
</template>

<script>
 import axios from '@/axios'
import productedit from '../modals/productedit.vue'
export default {
  components: { productedit },
  props: ['item', 'completeload'],
  data () {
    return {
      form:{},
      dialogproduct: false
    }
  },
  methods :{       
    async Remove (code) {
        try{
          this.$store.commit("setLoaderTrue")
          await axios.delete(`/api/products/${code}?shop=${this.$store.getters.business}&&usercode=${this.$store.getters.usercode}`)
          this.completeload()
          this.$store.commit("setLoader")
        }catch(err){
          console.log(err)
                this.$store.commit("setLoader")
        }
    }, 
    edit(item){
      this.form = item
      this.dialogproduct = true

    },  
    productclose(){
      this.dialogproduct = false
    },
  }


}
</script>

<style>

</style>
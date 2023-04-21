<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="`${$hosti}${item.picture}`"
      height="200px"
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
        @click="chooseshop"
      >
        Login
      </v-btn>

      <v-spacer></v-spacer>

      <!-- <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn> -->
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {

    }
  },
  methods :{    
     chooseshop(){ 
       try{
         console.log("---------------------")
        this.$store.commit("setLoaderTrue")
        this.$store.dispatch('chooseshop', this.item)
        this.$router.push('/super/general');
        this.$store.commit("setLoader")
       }catch(err){
        console.log(err)
        this.errs = err.response.data
        this.$store.commit("setLoader")
       }
     }
  }


}
</script>

<style>

</style>
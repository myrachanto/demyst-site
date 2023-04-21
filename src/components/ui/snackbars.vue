<template>
  <div >
    <div class="">
    <v-snackbar
      v-model="getsnacks"
      :timeout="timeout"
      right
      shaped
      bottom
      outlined
    >
      <span v-if="getcolo==='red'" style="color:red"><strong>{{ getmess }}</strong></span>
      <span v-else style="color:green"><strong>{{ getmess }}</strong></span>
      <template >
        <v-btn :color="getcolo" text @click="resetsnack">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    </div>
  </div>
</template>

<script>
export default {
    data () {
      return {
        timeout: 5000
      }
    },
    computed:{ 
        getsnacks(){
          this.taken()
            return this.$store.getters.getsnacks
        },
        getcolo(){
            return this.$store.getters.getcolo
        },
        getmess(){
            return this.$store.getters.getmess
        },
    },
    methods: {
      taken(){
        setTimeout(() => {
          this.$store.commit('resetsnacker')
        }, 4000)
      },
      async resetsnack(){
         await this.$store.commit('resetsnacker')
      }
    },
  } 
</script>
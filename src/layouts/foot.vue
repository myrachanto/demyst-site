<template>
  <v-footer
    color="grey lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="grey lighten-2 py-1 text-center black--text"
        cols="12"
      >
        @{{ new Date().getFullYear() }}
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
      ],
    }),
    methods:{      
        login(){
          this.$router.push("/mwaniki/login")
        },
    }
  }
</script>
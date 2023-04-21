<template>
  <v-app id="inspire" app >
    <v-navigation-drawer
      v-model="drawer"
      app
    ><v-list>
      <v-list-item >
        <v-list-item-avatar>
          <v-img :src="`${$hosti}${picture}`"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{username}}</v-list-item-title>
        </v-list-item-content>
            <v-btn icon @click="logout">
              <v-icon >mdi mdi-logout</v-icon>
            </v-btn>
      </v-list-item> 

      <v-divider></v-divider>
       <v-list-item to="/super/general"> 
        <v-list-item-icon>
          <v-icon>mdi mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title >General</v-list-item-title>
       </v-list-item>
       <v-list-item to="/super/contact"> 
        <v-list-item-icon>
          <v-icon>mdi-cash-minus</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Contact</v-list-item-title>
       </v-list-item>
       <v-list-item to="/super/location"> 
        <v-list-item-icon>
          <v-icon>mdi-calculator</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Location</v-list-item-title>
       </v-list-item>       
       <v-list-item to="/super/shops"> 
        <v-list-item-icon> 
          <v-icon>mdi-cash-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Products</v-list-item-title>
       </v-list-item>
       <v-list-item to=""> 
        <v-list-item-icon>
          <v-icon>mdi-calculator</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Seo</v-list-item-title>
       </v-list-item>
       <v-list-item to="/client/password"> 
        <v-list-item-icon>
          <v-icon>fas fa-cogs</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Settings</v-list-item-title>
       </v-list-item>
        
    </v-list>
    </v-navigation-drawer>

    <v-app-bar app >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Flymaks</v-toolbar-title>
      <v-spacer></v-spacer>
          
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
    <foot/>
  </v-app>
</template>

<script>
import {host} from '../helpers/support'
// import axios from '../axios'
// import {host} from '@/helpers/myconstants'
import foot from './foot'
  export default {
    data: () => ({ drawer: null,
        nortfications:[],
        messages:[],
        m:0,
        n:0,
        host,
     }),
    components:{
        foot
    },
    computed:{
        username(){
            return this.$store.getters.username
        },
        picture(){
          // console.log(this.$store.getters.superusername)
            return this.$store.getters.picture
        },
    },
    methods:{
      logout() {
          this.$router.push('/super/createshop')
      }
      //     async logout(){
      //   try {
      //         this.$store.commit('logout')
      //         this.$router.replace("/login")
      //       }catch(err){
      //           this.snackbar = true
      //           console.log(err.response.data) 
      //           this.errs = err.response.data
      //       }
      // },
    // async fetchMessages(){
    //     try{
    //           this.$store.commit("setLoaderTrue")
    //         const {data} = await axios.get("api/messages/unread")
    //         const {num, messages} = data
    //         this.m = num
    //         this.messages = messages
    //       }catch(err){
    //       this.snackbar = true
    //       //   console.log(err)
    //       this.errs = err.response.data 
    //       }
    //   },
    //    async fetchNort(){
    //     try{
    //           this.$store.commit("setLoaderTrue")
    //         const {data} = await axios.get("api/nortifications/unread")
    //         const {num, nortfications} = data
    //         this.n = num
    //         this.nortfications = nortfications
    //       }catch(err){
    //       this.snackbar = true
    //       //   console.log(err)
    //       this.errs = err.response.data
    //       }
    //   },
    }

  }
</script>
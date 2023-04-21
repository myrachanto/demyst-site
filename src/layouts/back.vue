<template>
  <v-app id="inspire" app>
    <v-navigation-drawer
      v-model="drawer"
      app
    ><v-list>
      <v-list-item >
        <v-list-item-avatar>
          <v-img :src="`${host}${picture}`"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{username}}</v-list-item-title>
        </v-list-item-content>
            <v-btn icon @click="logout">
              <v-icon >mdi mdi-logout</v-icon>
            </v-btn>
      </v-list-item> 

      <v-divider></v-divider>
       <v-list-item to="/dashboard"> 
        <v-list-item-icon>
          <v-icon>mdi mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Dashboard</v-list-item-title>
       </v-list-item>    
       <v-list-item to="/loans"> 
        <v-list-item-icon>
          <v-icon>mdi mdi-briefcase</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Loan</v-list-item-title>
       </v-list-item> 
       <v-list-item to="/accountings"> 
        <v-list-item-icon>
          <v-icon>fab fa-searchengin</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Accounting</v-list-item-title>
       </v-list-item>
       <v-list-item to="/users"> 
        <v-list-item-icon>
          <v-icon>fas fa-users</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Users</v-list-item-title>
       </v-list-item>
       <v-list-item  to="/users/password"> 
        <v-list-item-icon>
          <v-icon>fas fa-cogs</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Settings</v-list-item-title>
       </v-list-item>
      
        
    </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title><span >Demyist</span></v-toolbar-title>
      <v-spacer></v-spacer>
    
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
    <foot/>
  </v-app>
</template>

<script>
import {host} from '../helpers/myconstants'
// import axios from '../axios'
import foot from './foot'
  export default {
    data: () => ({ 
        drawer: null,
        nortfications:[],
        messages:[],
        m:0,
        n:0,
        host:'',
     }),
    components:{
        foot
    },
    computed:{
        username(){
            return this.$store.getters.username
        },
        business(){
            return this.$store.getters.business
        },
        picture(){
          // console.log("picture",this.$store.getters.picture)
            return this.$store.getters.picture
        }
    },
    created() {
      // this.fetchMessages()
      // this.fetchNort()
      this.host = host
      console.log(this.host)
      // this.newInvoice()
    
  },
    methods:{
     logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    }

  }
</script>
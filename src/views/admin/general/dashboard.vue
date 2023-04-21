<template>
<div>
 <v-container fluid>
        <v-row align="center"
              justify="center"
              v-if="IsAdmin"
              >
                <v-col v-if="stocks"
                class="auto"
                cols="12"
                sm="8" 
                md="6">
                 <Dcard :title="stocks.name" :total="formatcurrency(stocks.total)" :desc="stocks.description" :icon="`mdi-cash-plus`" :rout="`/shops`"/>
                </v-col>
                <v-col v-if="orders"
                class="auto"
                cols="12"
                sm="8"
                md="6">
                 <Dcard :title="orders.name" :total="formatcurrency(orders.total)" :desc="orders.description" :icon="`mdi-cash-plus`" :rout="`/orders`"/>
                </v-col>
                 <v-col  v-if="products"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="products.name" :total="checker(String(parseInt(products.total)))" :desc="products.description" :icon="`mdi-cash-minus`" :rout="`/products`" />
                </v-col>
                 <v-col  v-if="blogs"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="blogs.name" :total="checker(String(parseInt(blogs.total)))" :desc="blogs.description" :icon="`fas fa-blog`" :rout="`/blogs`"   />
                </v-col> <v-col v-if=" IsAdmin && users"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="users.name" :total="checker(String(parseInt(users.total)))" :desc="users.description" :icon="`fas fa-users`"  :rout="`/users`"  />
                </v-col> 
      </v-row>
  </v-container>
</div>
</template>

<script>
import formatMoney from '@/helpers/currencyformat'
import axios from '@/axios'
import Dcard from '@/components/cards/dashboardcard'
export default {
    data(){ 
    return{
      orders:{},
      products:{},
      blogs:{},
      users:{},
      stocks:{},
      errs:{},  
      source: 'api/dashboard',
      search:'',
      title:'Dashboard',
    }
  },

  components:{
    
    Dcard
  },
  computed:{
        IsAdmin(){
          console.log("adminiingg",this.$store.getters.IsAdmin)
            return this.$store.getters.IsAdmin
        },
  },
  created() {
    //  console.log("token", this.$store.getters.Token)
      this.GetData()

      // this.newInvoice()
    
  },
  methods:{
    checker(item){
      console.log(item)
      if (item == "NaN"){
        return "0"
      }else{
        return item
      }
      
    },

      formatcurrency(d) {
          return formatMoney(d)
        },
    
    selected(val){
          if (val === 'custom'){
            this.custom = true
          }else {
            this.custom = false
          }
        },   
   resetFilter(){
            this.search = 'search'
            this.GetData()
        },
      async GetData(){
          try{
              this.$store.commit("setLoaderTrue")
              // console.log("token", this.$store.getters.Token)
            var p = this
            const {data} = await axios.get(`${this.source}?search=${p.search}`)
           const { orders, users,products,blogs, stocks } = data
           this.orders = orders
           this.users = users
           this.products = products
           this.blogs = blogs
           this.stocks = stocks
                this.$store.commit("setLoader")
        }catch(err){
         this.snackbar = true
        //   console.log(err)
        this.errs = err.response.data
                this.$store.commit("setLoader")
        }
    }
  }

}
</script>

<style>

</style>
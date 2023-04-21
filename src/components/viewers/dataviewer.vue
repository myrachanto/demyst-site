<template>
<v-container>
  <v-row>
<v-col>
    <v-toolbar
    >
<v-toolbar-title>{{title}}</v-toolbar-title>
<v-spacer></v-spacer>

<v-btn :to="create">
        create
      </v-btn>
    </v-toolbar>
    <template>
  <v-expansion-panels>
    <v-expansion-panel
    >
      <v-expansion-panel-header>
        filter
      </v-expansion-panel-header>
      <v-expansion-panel-content>
       <v-row>
        <v-col
          cols="12"
          md="9"
        >
          <v-text-field
            v-model="search"
            label="Search query"
            required
            @keyup="GetData"
          ></v-text-field>
        </v-col>
       
    <v-col
      cols="12"
      sm="6"
      md="2"
      v-if="custom"
    >
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="searchq3"
            label="And Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="searchq3"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
    </v-col>

        <v-col
          cols="12"
          md="1"
        >
         <v-btn class="ma-2" 
      depressed
      color="success"
      @click="GetData"
    >
      Search
    </v-btn>
        </v-col>
        <v-col
          cols="12"
          md="1"
        >
         <v-btn class="ma-2" 
      depressed
      color="primary"
      @click="resetFilter"
    >
      Reset
    </v-btn>
        </v-col>
      </v-row></v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    </template>

          <v-data-table
            :headers="headers"
            :items="items"
            item-key="ID"
            class="elevation-1 display-2"
            style="font-size:10rem"
          :footer-props="{
              'items-per-page-options': [5,10, 20, 30, 40, 50]
            }"
          :items-per-page="10"
          >
          <template v-slot:[`item.featured`]="{ item }">
                 <v-switch
                 color="orange"
            v-model="item.featured"
            @change="changing(item)"
          ></v-switch>
            </template>
          <template v-slot:[`item.hotdeals`]="{ item }">
           <div> 
          <v-switch
            v-model="item.hotdeals"
            @change="changing1(item)"
          ></v-switch></div>
            </template>
          <template v-slot:[`item.promoted`]="{ item }">
           <div> 
          <v-switch
            v-model="item.promoted"
            @change="changing2(item)"
          ></v-switch></div>
            </template>
          <template v-slot:[`item.admin`]="{ item }">
           <div> <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>{{ item.admin}}</div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                color="green"
                class="mr-2"
                @click="View(item.code)"
              >
                mdi-eye
              </v-icon>
              <v-icon
                small
                color="orange"
                class="mr-2"
                @click="Edit(item.code)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                class="mr-2"
                color="red"
                @click="Delete(item)"
              >
                mdi-delete
              </v-icon>
          
            </template>
          </v-data-table>

</v-col>
  </v-row>
  </v-container>
</template>
<script>
 import axios from '@/axios'
  export default {

    
    props: ['source', 'headers', 'create', 'title','show'],
    data(){
        return{
            items:[],
            dialog: false,
            showFilter: false,
            form: {},
            editedIndex: 0,
            
            search:'',
            custom: false,
            // date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            status: '',
               
            itemos:[
              "admin",
              "notadmin",
            ]   
        }
    },
    created(){
          this.GetData()
       },
    methods:{
        editItem(item) {
          //  console.log(item)
          this.editedIndex = this.items.indexOf(item);
          this.form = Object.assign({}, item);
          this.dialog = true;
        },
        close() { 
          this.dialog = false;
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem);
            this.editedIndex = -1;
          });
        },
        async save() {
          try {
              this.$store.commit("setLoaderTrue")
            let fd = new FormData();
            fd.append("code", this.form.code);
            fd.append("admin", this.status);
            await axios.put(`api/users/admin/${this.form.code}`, fd);
            this.close()
            this.GetData()
                this.$store.commit("setLoader")
          } catch (err) {
            this.close()
            this.snackbar = true;
            this.errs = err.response.data
                this.$store.commit("setLoader")
          }
        },
        
        async changing(item) {
          try {
              this.$store.commit("setLoaderTrue")
            let fd = new FormData();
            console.log("hellooooooooooo",item.featured)
            fd.append("status", item.featured);
            await axios.put(`api/shop/featured/${item.code}`, fd);
            this.close()
            this.GetData()
                this.$store.commit("setLoader")
          } catch (err) {
            this.close()
            this.snackbar = true;
            this.errs = err.response.data
                this.$store.commit("setLoader")
          }
        },
        
        async changing1(item) {
          try {
            console.log("hellooooooooooo",item)
              this.$store.commit("setLoaderTrue")
            let fd = new FormData();
            fd.append("status", item.hotdeals);
            await axios.put(`api/shop/hotdeals/${item.code}`, fd);
            this.close()
            this.GetData()
                this.$store.commit("setLoader")
          } catch (err) {
            this.close()
            this.snackbar = true;
            this.errs = err.response.data
                this.$store.commit("setLoader")
          }
        },
        
        async changing2(item) {
          try {
            console.log("hellooooooooooo",item)
              this.$store.commit("setLoaderTrue")
            let fd = new FormData();
            fd.append("status", item.promoted);
            await axios.put(`api/shop/promoted/${item.code}`, fd);
            this.close()
            this.GetData()
                this.$store.commit("setLoader")
          } catch (err) {
            this.close()
            this.snackbar = true;
            this.errs = err.response.data
                this.$store.commit("setLoader")
          }
        },

        async Delete(item) {
          try {
            this.$store.commit("setLoaderTrue")
            alert(`are you sure you want to delete ${item.name}`)
            await axios.delete(`/api${this.show}/${item.code}`);
            this.close()
            this.GetData()
                this.$store.commit("setLoader")
          } catch (err) {
            this.close()
            this.snackbar = true;
            this.errs = err.response.data
                this.$store.commit("setLoader")
          }
        },
    View(code){

      this.$router.push(`${this.show}/show/${code }`)
    } ,

    Edit(code){
      this.$router.push(`${this.show}/${code}/edit`)
    } ,
        selected(val){
          if (val === 'custom'){
            this.custom = true
          }else {
            this.custom = false
          }
        },
        resetFilter(){
            this.search = ''
            this.custom = false
            this.GetData()
        },
       async GetData(){
        try{
          this.$store.commit("setLoaderTrue")
          let p = this
            // console.log(token)
           const {data} = await axios.get(`${this.source}?search=${p.search}`)
            this.items = data  

            // console.log(data)
          this.$store.commit("setLoader")
        }catch(err){
           console.log(err)
          this.$store.commit("setLoader")
        }
    },  
    }
  }
</script>
<style>

</style>
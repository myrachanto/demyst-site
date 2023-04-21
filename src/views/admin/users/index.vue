<template>
  <v-container>
    
<DataViewer :source="source" :headers="headers" :title="title" :show="show" />
  </v-container>

</template>
<script>
import DataViewer from '@/components/viewers/dataviewer.vue'
export default {
      name: 'Users',
    components:{
        DataViewer,
    },
      data(){
          return{
              title:'Users',
              source: '/api/users',
              create: '/users/create',
              show:'/users',
              headers:[
                { text: 'First Name', value: 'firstname' },
                { text: 'Last Name', value: 'lastname' },
                { text: 'Username', value: 'username' },
                { text: 'Email', value: 'email' },
                // { text: 'Admin', value: 'admin' },
                // { text: 'Actions', value: 'actions', sortable: false },
              ]
          }
      },
}
</script>

<style>

</style>
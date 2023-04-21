<template>
  <v-container>
    
<DataViewer :source="source" :headers="headers" :create="create" :title="title" :show="show" />
  </v-container>

</template>
<script>
import DataViewer from '@/components/viewers/dataviewer.vue'
export default {
      name: 'acountings',
    components:{
        DataViewer,
    },
      data(){
          return{
              title:'Accounting Softwares',
              source: '/api/accountings',
              create: '/accountings/create',
              show:'/accountings',
              headers:[
                { text: 'Name', value: 'name' },
                { text: 'Business pin', value: 'business_pin' },
                { text: 'Url Endpoint', value: 'urlEndpoint' },
                { text: 'Actions', value: 'actions', sortable: false },
              ]
          }
      },
}
</script>

<style>

</style>
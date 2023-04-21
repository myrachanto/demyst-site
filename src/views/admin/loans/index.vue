<template>
  <v-container>
    
<DataViewer :source="source" :headers="headers" :create="create" :title="title" :show="show" />
  </v-container>

</template>
<script>
import DataViewer from '@/components/viewers/loandataviewer.vue'
export default {
      name: 'acountings',
    components:{
        DataViewer,
    },
      data(){
          return{
              title:'Loans',
              source: '/api/loans',
              create: '/loans/create',
              show:'/loans',
              headers:[
                { text: 'Name', value: 'name' },
                { text: 'Business pin', value: 'business_pin' },
                { text: 'Accounting software', value: 'accounting_software' },
                { text: 'Status', value: 'status' },
                { text: 'Actions', value: 'actions', sortable: false },
              ]
          }
      },
}
</script>

<style>

</style>
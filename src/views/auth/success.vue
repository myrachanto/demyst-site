<template>
  <front>
          
      <v-container fill-height fluid>
        <v-row align="center"
              justify="center"
              >
                <v-col 
                class="auto"
                cols="12"
                sm="8"
                md="4">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Password sent</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  
                </v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon large>mdi-home</v-icon>
                    </v-btn>
                  </template>
                  <span>Home</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                A password has being sent to your email
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </front>
</template>

<script>
import front from '../../layouts/front'

  export default {
    components: {
      front
    },
    data: () => ({
      email: '',
      errors: null,
      timeout: 3000,
      snackbar:false,
      errs:{}
    }),

    methods: {
    }
}
</script>
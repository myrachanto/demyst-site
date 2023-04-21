import Vue from "vue";
import axios from "axios"
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import back from "./layouts/back"
import  {host}  from "./helpers/myconstants"

axios.defaults.baseURL = host
Vue.config.productionTip = false;
Vue.prototype.$hosti = host;

Vue.component("mainlayout", back)
new Vue({
  router,
  store,
  vuetify,

  render: function(h) {
    return h(App);
  }
}).$mount("#app");

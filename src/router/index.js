import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store"
import { auth } from "./modules/auth"
import { general } from "./modules/gerneral"
import mainlayout from "../layouts/mainwrapper"
import { Users} from "./modules/users"
import { loans} from "./modules/loan"
import { accountings } from "./modules/accounting"

Vue.use(VueRouter);

const routes = [
  ...auth,
  {path: "/*", component: mainlayout,
  children: [
    ...general,
    ...Users,
    ...loans,
    ...accountings,
        ]
      },
      
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

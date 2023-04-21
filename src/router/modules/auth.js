// import store from '@/store'
import AdminRegister from '@/views/auth/register'
import adminLogin from '@/views/auth/login'
import forgot from '@/views/auth/forgot'
import success from '@/views/auth/success'


// var token = store.getters.Token
// var isadmin = store.getters.isadmin = true
export const auth = [
  {path: "/login",component: adminLogin},
  {path: "/register",component: AdminRegister},
  {path: "/forgot",component: forgot},
  {path: "/success",component: success},
]

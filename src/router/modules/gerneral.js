// import store from '@/store'
import dashboard from '@/views/admin/general/dashboard'
// import AdminGuard from '@/helpers/guard'


// var token = store.getters.Token
// var isadmin = store.getters.isadmin = true
export const general = [
  {path: "/dashboard", component: dashboard, beforeEnter (to, from, next) {
    let token = localStorage.getItem('access_token') || null
    if (token === null){
      return next('/login')
    }
     return next()
   } },
]

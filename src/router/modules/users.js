// import store from '@/store'
import User from '@/views/admin/users/index'
// import Category from '@/components/datatables/category'
// import userss from '@/components/datatables/users'
import UsersForm from '@/views/admin/users/form'
import UsersShow from '@/views/admin/users/show'
import UsersEdit from '@/views/admin/users/edit'
import password from '@/views/admin/users/password'
// import AdminGuard from '@/helpers/guard'


export const Users = [
  {path: "/users",component: User, beforeEnter (to, from, next) {
    let token = localStorage.getItem('access_token') || null
     if (token === null){
       return next('/login')
     }
     return next()
   } },
{path: "/users/create",component: UsersForm, beforeEnter (to, from, next) {
    let token = localStorage.getItem('access_token') || null
     if (token === null){
       return next('/login')
     }
     return next()
   } },
{path: "/users/password",component: password, beforeEnter (to, from, next) {
    let token = localStorage.getItem('access_token') || null
     if (token === null){
       return next('/login')
     }
     return next()
   } },
{path: "/users/show/:code",component: UsersShow, beforeEnter (to, from, next) {
    let token = localStorage.getItem('access_token') || null
     if (token === null){
       return next('/login')
     }
     return next()
   } },
{path: "/users/:code/edit",component: UsersEdit, beforeEnter (to, from, next) {
    let token = localStorage.getItem('access_token') || null
     if (token === null){
       return next('/login')
     }
     return next()
   } },
// {path: "/products/update",component: Stock, beforeEnter(to, from, next) {
//   if (token && isadmin){
//     next()
//   }else{
//     next('/')
//   }
// }},

]


import accounting from '@/views/admin/accountings/index'
import accountingsForm from '@/views/admin/accountings/form'
import accountingsShow from '@/views/admin/accountings/show'
import accountingsEdit from '@/views/admin/accountings/edit'
export const accountings = [
  {path: "/accountings",component: accounting,  beforeEnter (to, from, next) {
    let token = localStorage.getItem('access_token') || null
    if (token === null){
       return next('/login')
     }
     return next()
   } },

{path: "/accountings/create",component: accountingsForm, beforeEnter (to, from, next) {
  console.log("--------------vamos")
    let token = localStorage.getItem('access_token') || null
    if (token === null){
       return next('/login')
     }
     return next()
   } },
{path: "/accountings/show/:code",component: accountingsShow, beforeEnter (to, from, next) {
    let token = localStorage.getItem('access_token') || null
    if (token === null){
       return next('/login')
     }
     return next()
   } },
{path: "/accountings/:code/edit",component: accountingsEdit, beforeEnter (to, from, next) {
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

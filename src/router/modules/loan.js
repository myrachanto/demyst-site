
import loan from '@/views/admin/loans/index'
import loansForm from '@/views/admin/loans/form'
import loansShow from '@/views/admin/loans/show'
import loansEdit from '@/views/admin/loans/edit'
export const loans = [
  {path: "/loans",component: loan, name: "product", beforeEnter (to, from, next) {
    let token = localStorage.getItem('access_token') || null
    if (token === null){
       return next('/login')
     }
     return next()
   } },

{path: "/loans/create",component: loansForm, beforeEnter (to, from, next) {
    let token = localStorage.getItem('access_token') || null
    if (token === null){
       return next('/login')
     }
     return next()
   } },
{path: "/loans/show/:code",component: loansShow, beforeEnter (to, from, next) {
    let token = localStorage.getItem('access_token') || null
    if (token === null){
       return next('/login')
     }
     return next()
   } },
{path: "/loans/:code/edit",component: loansEdit, beforeEnter (to, from, next) {
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

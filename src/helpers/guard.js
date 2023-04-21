export function AdminGuard (to, from, next) {
   let token = localStorage.getItem('access_token') || null
   let admin = localStorage.getItem('admin') || null 
   console.log("authgaurd", token, admin)
    if (token === null && admin === null){
      return next('/login')
    }
    return next('/dashboard')
  }
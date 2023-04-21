import router from '../../router'
import axios from '@/axios'

const state = {
    token: localStorage.getItem('access_token') || null,
    username: localStorage.getItem('username') || null,
    picture: localStorage.getItem('picture') || null,
    usercode: localStorage.getItem('usercode') || null,
    business: localStorage.getItem('business') || null,
    errs: {},
}
const getters ={
    loggedIn(state){
        return state.token != undefined
    },
    Token(state){
        return state.token
    },
    IsAdmin(state){
        if (state.admin !== "admin") {
            return false
        }
        return true
    },
    IsEmployee(state){
        if (state.employee !== "employee") {
            return false
        }
        return true
    },
    IsSupervisor(state){
        if (state.supervisor !== "supervisor") {
            return false
        }
        return true
    },
    picture(state){
        return state.picture
    },
    username: (state)=> state.username,

    usercode: (state)=> state.usercode,
    business: (state)=> state.business,
} 
const actions ={ 
    login({commit}, user){
        console.log("step one", user)
        return new Promise((resolve, reject) => {
            commit("setLoaderTrue")
        let fd = new FormData();
        fd.append("email", user.email) 
        fd.append("password", user.password)
        axios.post('/login', fd ,{'Content-Type': 'multipart/form-data'})
        // axios.post('/front/login', user )
        .then(resp => {
            console.log("step two")
            const {data} = resp
            commit("setLoader")
            localStorage.setItem('access_token', data.token),
            localStorage.setItem('username', data.username), 
            localStorage.setItem('picture', data.picture),
            localStorage.setItem('usercode', data.usercode),
            axios.defaults.headers.common['Authorization'] = 'Bearer '+ data.token
            commit('userlogin', data)
            resolve(resp)
            commit("setLoader")
        })
        .catch(err => {
            // commit('auth_error')
            localStorage.removeItem('access_token')
            reject(err)
            commit("seterror", err)
            commit("setLoader")
        })
        })
    },
    logout({commit}){
        return new Promise((resolve) => {
        commit("setLoaderTrue")
        commit('logout')
        localStorage.removeItem('access_token'),
        localStorage.removeItem('username'),
        localStorage.removeItem('picture'),
        localStorage.removeItem('business'),
        delete axios.defaults.headers.common['Authorization']
        resolve()
        commit("setLoader")
        })
    }
}
const mutations = {
    
    usernewdata: (state, data) => {
        state.info.unshift(data),
        router.push('/login');
    },
    chooseshop: (state, shop) => { 
        // console.log("frrrrrrrrrr", data)
        (state.business = shop.code)
    },
    userlogin: (state, data) => { 
        // console.log("frrrrrrrrrr", data)
        (state.token = data.token),
        (state.username = data.username),
        (state.picture = data.picture),
        (state.usercode = data.usercode),
        (state.business = data.business)
    },
    logout: (state)=> { 
        (state.token = ''), 
        (state.username = ''),
        (state.picture = ''),
        (state.usercode = ''),
        (state.business = '')
    },
    setError: (state, errs)=> {
        (state.errs = errs),
        (state.snackbar = true)
    },
}

export default{
    state,
    getters,
    actions,
    mutations
}
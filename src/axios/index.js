import axios from 'axios'
import {host} from "../helpers/myconstants"
// import store from '../store'
 const instance = axios.create({
     baseURL:host
 })
 var token = localStorage.getItem('access_token')
 instance.defaults.headers.common['Authorization'] = 'Bearer '+ token

 export default instance
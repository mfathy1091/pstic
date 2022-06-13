import store from '../store'
// import axios from "axios";
import { HTTP } from '@/http-common'

// including or removing token when calling api
store.subscribe((mutation) => {
    // axios.interceptors.request.use((value) => {
    //     value.headers = {
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': '*',
    //         'Access-Control-Allow-Headers': '*',
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     }
    //     return value
    // })
    
    switch(mutation.type){
        case 'auth/SET_TOKEN':
            // add token to axios header and local storage
            if(mutation.payload){
                HTTP.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
                localStorage.setItem('token', mutation.payload)
            }
            // remove token from axios header and local storage
            else{
                HTTP.defaults.headers.common['Authorization'] = null   
                localStorage.removeItem('token')    // remove token from local storage
            }
            break;
    }
})


import store from '../store'
import axios from "axios";

// including or removing token when calling api
store.subscribe((mutation) => {
    switch(mutation.type){
        case 'auth/SET_TOKEN':
            // add token to axios header and local storage
            if(mutation.payload){
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
                localStorage.setItem('token', mutation.payload)
            }
            // remove token from axios header and local storage
            else{
                axios.defaults.headers.common['Authorization'] = null   
                localStorage.removeItem('token')    // remove token from local storage
            }
            break;
    }
})


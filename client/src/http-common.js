// initializes axios with HTTP base Url and headers.

import axios from 'axios';
import success from '@/interceptors/response/success.js'
import failure from '@/interceptors/response/failure.js'

const HTTP = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    // baseURL: process.env.API_BASE_URL,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
})

HTTP.interceptors.response.use(success, failure)

export  {
    HTTP
}
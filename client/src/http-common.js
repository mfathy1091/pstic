// initializes axios with HTTP base Url and headers.

import axios from "axios";
export default axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        "Content-type": "application/json"
    }
});
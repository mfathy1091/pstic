import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import moment from 'moment'
// window.$ = window.jQuery = require('jquery');
import 'bootstrap/dist/css/bootstrap.min.css'

// Font awsome libraries
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

require('@/store/subscriber')

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

//axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers['accept'] = 'application/json';

// import 'bootstrap/dist/css/bootstrap.min.css'

// import '@coreui/dist/css/coreui.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'

// const app = createApp(App).use(store).use(router)
//createApp.config.productionTip = false;

store.dispatch('auth/attempt', localStorage.getItem('token'))
.then(function(e){
    if(e){
        console.log(e)
    }
    // create the app only after the user is authenticated in vuex
    const app = createApp(App)
    app.use(store)
    app.use(router)
    app.use(CoreuiVue, VueSweetalert2)
    app.provide('icons', icons)
    app.component('CIcon', CIcon)
    app.component('DocsCallout', DocsCallout)
    app.component('DocsExample', DocsExample)


    app.config.globalProperties.axios=axios

    app.mount('#app')


    /* add font awesome icon component */
    app.component("font-awesome-icon", FontAwesomeIcon);

    app.config.globalProperties.$filters = {
        upText(text) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        },
        myDateFull(date) {
                    // return moment(date).format('Do MMMM YYYY');
            return moment(date).format('MMMM YYYY');
        },
        myDateShort(date) {
            // return moment(date).format('Do MMMM YYYY');
            return moment(date).format('D/M/YYYY');
        },
    }

})



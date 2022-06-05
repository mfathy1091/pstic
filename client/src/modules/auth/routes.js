// import UsersModule from  "./UsersModule.vue";
import Login from  "./views/Login.vue";



export default [
    { path: '/login', name: 'login', component: Login, meta: { requireAuth: false } },
];



import UsersModule from  "./UsersModule.vue";
import Users from  "./views/Users.vue";



export default [
    {
        path: '/users',
        component: UsersModule,
        children: [ 
            {
                path: '/',
                component: Users
            },
        ]
    },
];

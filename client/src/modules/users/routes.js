import Module from './Module.vue'
import Home from './views/Users.vue'
import createUser from './views/createUser.vue'


export default [
    {
        path: 'users', name: 'users', component: Module,
        children: [
            {
                path: '', name: 'all', component: Home,
            },
            {
                path: 'create', name: 'create_user', component: createUser,
            }

        ]
    },
];
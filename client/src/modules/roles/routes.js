import Module from './Module.vue'
import Roles from './views/Roles.vue'


export default [
    {
        path: 'roles', name: 'roles-module', component: Module,
        children: [
            {
                path: '', name: 'roles', component: Roles,
            },
        ]
    },
];



import Roles from '@/modules/settings/Roles/Roles.vue'

export default [
    {
        path: '/settings', name: 'settings', component: Settings, meta: { requireAuth: true },
        redirect: '/settings/users',
        children:[
            ...usersRoutes,
            {
                path: 'roles', name: 'roles', component: Roles
            },
    
        ]
    }
];
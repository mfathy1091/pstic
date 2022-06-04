import Settings from '@/modules/settings/SettingsModule.vue'
import Users from '@/views/UsersSettings/Users/Users.vue'
import Roles from '@/views/UsersSettings/Roles/Roles.vue'

export default [
    {
        path: '/settings', name: 'settings', component: Settings, meta: { requireAuth: true },
        redirect: '/settings/users',
        children:[
            {
                path: 'users', name: 'users', component: Users
            },
            {
                path: 'roles', name: 'roles', component: Roles
            },
    
        ]
    }
];
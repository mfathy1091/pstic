import Settings from '@/modules/settings/SettingsModule.vue'
import Users from '@/modules/settings/Users/Users.vue'
import Roles from '@/modules/settings/Roles/Roles.vue'

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
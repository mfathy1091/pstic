import ProfileModule from  "./ProfileModule.vue";
import ProfilePage from  "./pages/ProfilePage.vue";
import ProfileSettingsPage from  "./pages/ProfileSettingsPage.vue";



export default [
    {
        path: '/users/:id',
        component: ProfileModule,
        children: [ 
            {
                path: '/',
                component: ProfilePage
            },
            {
                path: '/settings',
                component: ProfileSettingsPage
            }
        ]
    },
];

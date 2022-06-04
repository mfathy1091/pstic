import PsIntakesModule from  "./pages/PsIntakesModule.vue"
import PsIntakes from  "./pages/PsIntakes.vue";
import PSIntake from  "./pages/PsIntakes.vue";



export const psIntakesRoutes = [
    {
        path: '/ps-intakes',
        component: PsIntakesModule,
        children: [ 
            {
                path: '/',
                component: PsIntakes
            },
            {
                path: ':id',
                component: PSIntake
            }
        ]
    },
];

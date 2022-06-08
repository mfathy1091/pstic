import store from '@/store';
import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/modules/home/Home.vue'
// import NotFoundComponent from '../views/pages/Page404.vue'
// import { h, resolveComponent } from 'vue'

import authRoutes from "@/modules/auth/routes.js"
import settingsRoutes from "@/modules/settings/routes.js"

// import { ProfileRoutes } from "./modules/profile/routes.js"
// import HomePage from "./pages/HomePage.vue"

const baseRoutes = [
	{ path: '/', name: 'home', component: Home, meta: { requireAuth: true } },

	{
		path: '/404', component: () => import('@/views/pages/Page404.vue') 
	},
	{
		path: '/:catchAll(.*)', component: () => import('@/views/pages/Page404.vue') 
	},


	// {
    //     path: '/admin', name: 'admin',
    //     component: {
	// 		render() {
	// 			return h(resolveComponent('router-view'))
	// 		},
    //     },
    //     redirect: '/users-settings/roles',
    //     children: []
	// }

];

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes: [
		...baseRoutes,
		...authRoutes,
		...settingsRoutes,
	],
	scrollBehavior() {
		// always scroll to top
		return { top: 0 }
	},
})

// let Authenticated = store.getters['auth/authenticated']
router.beforeEach((to, from, next) => {

	if(to.meta.requireAuth == true && store.getters['auth/authenticated'] == false){
		next({
			name: 'login'
		})
		
	}else if(to.meta.requireAuth == false && store.getters['auth/authenticated'] == true){
		next({
			name: 'admin'
		})
	}else{
		next()
	}
	console.log(to.meta.requireAuth, store.getters['auth/authenticated'])
});

export default router

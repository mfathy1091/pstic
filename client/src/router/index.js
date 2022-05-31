import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout'
import Login from '../views/Login.vue'
import { h, resolveComponent } from 'vue'


const routes = [
	{
		path: '/',
		name: 'DefaultLayout',
		component: DefaultLayout, meta: { auth: true }
	},

	{ path: '/login', name: 'login', component: Login, meta: { auth: false } }, 

	{
        path: '/users-settings',
        name: 'Users Settings',
        component: {
			render() {
				return h(resolveComponent('router-view'))
			},
        },
        redirect: '/users-settings/roles',
        children: [
			{
				path: '/users-settings/users',
				name: 'Users',
				component: () => import('@/views/UsersSettings/Users/Users.vue'),
				meta: { auth: true }
			},
			{
				path: '/users-settings/roles',
				name: 'Roles',
				component: () => import('@/views/UsersSettings/Roles/Roles.vue'),
				meta: { auth: true }
			},
		]
	}

]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

// let authenticated = store.getters['auth/authenticated']
router.beforeEach((to, from, next) => {
	
	if(to.meta.auth && !store.getters['auth/authenticated']){
		next({
			name: 'login'
		})
		
	}else if(!to.meta.auth && store.getters['auth/authenticated']){
		next({
			name: 'DefaultLayout'
		})
	}else{
		next()
	}
	console.log(to.meta.auth, store.getters['auth/authenticated'])
});

export default router

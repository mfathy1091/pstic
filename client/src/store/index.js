import { createStore } from 'vuex'
import auth from '@/modules/auth/store.js'
import users from '@/modules/users/store.js'
import roles from '@/modules/roles/store.js'
import areas from '@/store/modules/areas.js'
import budgets from '@/store/modules/budgets.js'
import departments from '@/store/modules/departments.js'


export default createStore({
	state: {
		showLoadingSpinner: false,
		sidebarVisible: '',
		sidebarUnfoldable: false,
		isModalVisible: false,
	},
	getters: {
		showLoadingSpinner(state){
            return state.showLoadingSpinner
        },

		isModalVisible(state){
			return state.isModalVisible
		}
	},
	mutations: {
		toggleSidebar(state) {
			state.sidebarVisible = !state.sidebarVisible
		},
		toggleUnfoldable(state) {
			state.sidebarUnfoldable = !state.sidebarUnfoldable
		},
		updateSidebarVisible(state, payload) {
			state.sidebarVisible = payload.value
		},
		setModalVisibility(state, isVisible) {
			state.isModalVisible = isVisible
		},
	},
	actions: {
	},
	modules: {
		auth,
		users,
		roles,
		areas,
		budgets,
		departments
	}
})

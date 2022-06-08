import { createStore } from 'vuex'
import auth from '@/modules/auth/store.js'
import users from '@/modules/settings/Users/store.js'
import roles from '@/modules/settings/Roles/store.js'


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
		roles
	}
})

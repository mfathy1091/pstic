import { createStore } from 'vuex'
import auth from './modules/auth'

export default createStore({
	state: {
		showLoading: false,
		sidebarVisible: '',
		sidebarUnfoldable: false,
	},
	getters: {
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
	},
	actions: {
	},
	modules: {
		auth
	}
})

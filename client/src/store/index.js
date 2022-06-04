import { createStore } from 'vuex'
import auth from './modules/auth'

export default createStore({
	state: {
		showLoadingSpinner: false,
		sidebarVisible: '',
		sidebarUnfoldable: false,
	},
	getters: {
		showLoadingSpinner(state){
            return state.showLoadingSpinner
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
	},
	actions: {
	},
	modules: {
		auth
	}
})

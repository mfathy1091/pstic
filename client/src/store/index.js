import { createStore } from 'vuex'
import auth from '@/modules/auth/store.js'

export default createStore({
	state: {
		showLoadingSpinner: false,
		sidebarVisible: '',
		sidebarUnfoldable: false,
		modalVisible: false,
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
		setModalVisible(state, payload) {
			state.modalVisible = payload
		},
	},
	actions: {
	},
	modules: {
		auth
	}
})

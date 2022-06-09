import axios from "axios";
// import router from '../../router';

export default {
    namespaced: true,

    state: {
        areas: [],
    },


    getters: {
        areas(state){
            return state.areas
        },

    },

    mutations: {
        setAreas (state, value) {
            state.areas = value
        },

    },

    actions: {
        async fetchAreas({ commit }, filter){
			// this.$Progress.start();
			await axios.get('/areas/', { params: filter } )
			.then((response) => {
                commit('setAreas', response.data.data);
				// this.$Progress.finish();
			})
			.catch((e) => {
				// this.$Progress.fail();
				console.log(e);
			})
		},

    }

}

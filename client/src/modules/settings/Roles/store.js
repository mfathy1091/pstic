import axios from "axios";
// import router from '../../router';

export default {
    namespaced: true,

    state: {
        roles: [],
    },


    getters: {
        roles(state){
            return state.roles
        },
    },

    mutations: {
        setRoles (state, value) {
            state.roles = value
        },
    },

    actions: {
        async fetchRoles({ commit }, filter){
			// this.$Progress.start();
			await axios.get('/roles/', { params: filter } )
			.then((response) => {
                commit('setRoles', response.data.data);
				// this.$Progress.finish();
			})
			.catch((e) => {
				// this.$Progress.fail();
				console.log(e);
			})
		},

    }

}

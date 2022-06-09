import axios from "axios";
// import router from '../../router';

export default {
    namespaced: true,

    state: {
        users: [],
    },


    getters: {
        users(state){
            return state.users
        },

    },

    mutations: {
        setUsers (state, value) {
            state.users = value
        },

    },

    actions: {
        async fetchUsers({ commit }, filter){
			await axios.get('/users/', { params: filter } )
			.then((response) => {
                commit('setUsers', response.data.data.data);
				// this.$Progress.finish();
			})
			.catch((e) => {
				// this.$Progress.fail();
				console.log(e);
			})
		},

        async createUser( payload ){
            let response = await axios.post('/users/', { params: payload } )
            return response
        }
    }

}

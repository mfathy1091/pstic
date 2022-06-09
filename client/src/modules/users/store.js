import axios from "axios";
// import router from '../../router';

export default {
    namespaced: true,

    state: {
        users: [],
        createdData: null,
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

        setCreatedData(state, value) {
            state.createdData = value
        },

    },

    actions: {
        async fetchUsers({ commit }, filter){
			await axios.get('/users/', { params: filter } )
			.then((response) => {
                commit('setUsers', response.data.data.data);
				// this.$Progress.finish();
                return response
			})
			.catch((e) => {
				// this.$Progress.fail();
				console.log(e);
                return e
			})
            
            
		},

        async createUser( user) {
            await axios.post('users', user)
            
            .then(res => {
                // commit('setCreatedData', res.data.data);
                // commit('setProductIsCreating', false);
                console.log(res);
            }).catch(err => {
                // console.log('error', err);
                // commit('setProductIsCreating', false);
                console.log(err);
            });
        },
    }

}

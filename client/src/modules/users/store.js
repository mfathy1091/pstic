// import { HTTP } from "@/http-common";
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
            try {
                let response = await this.$HTTP.get('/users/', { params: filter } );
                commit('setUsers', response.data.data.data);
            } catch (e) {
                console.log(e);
            }
		},

        async createUser({ commit }, data) {
            
                let response = await this.$HTTP.post('users', data);
               //  await HTTP.post('users', data);
                commit('setCreatedData', response.data.data);
            
        },
    }

}

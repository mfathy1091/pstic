import axios from "axios";
// import router from '../../router';

export default {
    namespaced: true,

    state: {
        token: null,
        user: null,
        abilities: null,
        // attemptingAuthentication: true
    },

    getters: {
        authenticated(state){
            if(state.token && state.user){
                return true
            }else{
                return false
            }
            // return state.token && state.user
        },
        
        user(state){
            return state.user
        }
    },

    mutations: {
        SET_TOKEN (state, value) {
            state.token = value
        },

        SET_USER (state, value) {
            state.user = value
        },

        setAbilities(state, value){
            state.abilities = value;
        },

    },

    actions: {

        // async init({commit, state}) {
        //     if(!state.user && state.token) {
        //         const user = await service.getUser();
        //         commit('SET_TOKEN', token)
        //         commit('SET_USER', user)
        //     }
        // },
        // async attemptingAuthentication({commit, state}) {
        //     if(!state.attemptingAuthentication) {
        //         const user = await service.getUser();
        //         commit('SET_TOKEN', token)
        //         commit('SET_USER', user)
        //     }
        // },

        async login({ dispatch }, credentials) {
            let response = await axios.post('auth/login', credentials)

            return dispatch('attempt', response.data.token)
        },

        async attempt({commit, state}, token){
            if(token){
                commit('SET_TOKEN', token)
            }
            
            if(!state.token){
                return
            }

            try {
                let response = await axios.get('auth/user')
                commit('SET_USER', response.data)
                console.log('success')
            } catch (e) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        },

        logout({commit}){
            return axios.post('auth/logout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            })

        },


        async getAbilities({commit}){
            try{
                const response = await axios.get("/abilities");
                commit('setAbilities', response.data.data)
            }catch(error){
                console.error(error);
            }
        },

    }

}

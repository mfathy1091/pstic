import axios from "axios";
// import router from '../../router';

export default {
    namespaced: true,

    state: {
        departments: [],
    },


    getters: {
        departments(state){
            return state.departments
        },

    },

    mutations: {
        setDepartments (state, value) {
            state.departments = value
        },

    },

    actions: {
        async fetchDepartments({ commit }, filter){
			// this.$Progress.start();
			await axios.get('/departments/', { params: filter } )
			.then((response) => {
                commit('setDepartments', response.data.data);
				// this.$Progress.finish();
			})
			.catch((e) => {
				// this.$Progress.fail();
				console.log(e);
			})
		},

    }

}

import axios from "axios";
// import router from '../../router';

export default {
    namespaced: true,

    state: {
        budgets: [],
    },


    getters: {
        budgets(state){
            return state.budgets
        },

    },

    mutations: {
        setBudgets (state, value) {
            state.budgets = value
        },

    },

    actions: {
        async fetchBudgets({ commit }, filter){
			// this.$Progress.start();
			await axios.get('/budgets/', { params: filter } )
			.then((response) => {
                commit('setBudgets', response.data.data);
				// this.$Progress.finish();
			})
			.catch((e) => {
				// this.$Progress.fail();
				console.log(e);
			})
		},

    }

}

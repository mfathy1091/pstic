// import store from '../store/index';
import axios from 'axios'

export default {
	// data(){
    //     return{
    //         abilities: ['user_create'],
    //     }
    // },
	methods: {
		async getAll(method, url, dataObj){
			try {
                return await axios({
                    method: method,
                    url: url,
                    data:dataObj,
                });
            } catch (e) {
                return e.response
            }	  
		},


		getNationalities(){
			// this.$Progress.start();
			axios.get("/nationalities")
			.then(({data}) => {
				this.nationalities = data.data
			});
			// this.$Progress.finish();
		},

		getReferralSources(){			
			// this.$Progress.start();
			axios.get("/referral_sources").then(({data}) => (this.referralSources = data.data));
			// this.$Progress.finish();
		},
		getReferralReasons(){
			// this.$Progress.start();
			axios.get("/referral_reasons")
			.then(({data}) => {
				this.referralReasons = data.data
			});
			// this.$Progress.finish();
		},

		getAreas(){			
			// this.$Progress.start();
			axios.get("/areas")
			.then(({data}) => (this.areas = data.data));
			// this.$Progress.finish();
		},
		getDepartments(){			
			// this.$Progress.start();
			axios.get("/departments")
			.then(({data}) => (this.departments = data.data));
			// this.$Progress.finish();
		},



		getPermissions(){			
			// this.$Progress.start();
			axios.get("/permission")
			.then(({data}) => (this.permissions = data.data));
			// this.$Progress.finish();
		},
		// getAbilities(){			
		// 	// this.$Progress.start();
		// 	axios.get("/abilities")
		// 	.then(({data}) => (this.abilities = data.data));
		// 	// this.$Progress.finish();
		// },


		getCasee(caseeId){
			// this.$Progress.start();
			this.$store.state.showLoadingSpinner = true;
			axios.get("/casees/"+caseeId)
            .then(({data}) => {
                this.casee = data.data
            });
			// this.$Progress.finish();
			this.$store.state.showLoadingSpinner = false;
        },



		getCaseeHousingReferrals(caseeId){
			// this.$Progress.start();
			this.$store.state.showLoadingSpinner = true;
			axios.get('/casees/'+ caseeId +'/housing-referrals', { params: { casee_id: caseeId } } )
			.then((response) => {
				// success
                this.caseeHousingReferrals = response.data.data;
				// this.$Progress.finish();
				this.$store.state.showLoadingSpinner = false;
			})
			.catch((e) => {
				// error
				// this.$Progress.fail();
				this.$store.state.showLoadingSpinner = false;
                console.log(e);
			})
		},

		getCaseeReferrals(caseeId){
			// this.$Progress.start();
			this.$store.state.showLoadingSpinner = true;
			axios.get('/casees/' + caseeId + '/referrals', { params: { casee_id: caseeId } } )
			.then((response) => {
				// success
                this.caseeReferrals = response.data.data;
				// this.$Progress.finish();
				this.$store.state.showLoadingSpinner = false;
			})
			.catch((e) => {
				// error
				// this.$Progress.fail();
				this.$store.state.showLoadingSpinner = false;
                console.log(e);
			})
		},


		getPsIntake(psIntakeId){			
			// this.$Progress.start();
			axios.get("/ps-intakes/"+psIntakeId)
            .then(({data}) => (this.psIntake = data.data));
			// this.$Progress.finish();
		},

		getHousingGrantStatuses(){
			// this.$Progress.start();
			axios.get('/housing-grant-statuses/')
			.then((response) => {
				// success
				this.housingGrantStatuses = response.data.data;
				// this.$Progress.finish();
			})
			.catch((e) => {
				// error
				// this.$Progress.fail();
				console.log(e);
			})
		},

		getBeneficiaryStatuses(){
			// this.$Progress.start();
			axios.get('/beneficiary-statuses/')
			.then((response) => {
				// success
				this.beneficiaryStatuses = response.data.data;
				// this.$Progress.finish();
			})
			.catch((e) => {
				// error
				// this.$Progress.fail();
				console.log(e);
			})
		},

		getRelationships(){
			// this.$Progress.start();
			axios.get('/relationships/')
			.then((response) => {
				// success
				this.relationships = response.data.data;
				// this.$Progress.finish();
			})
			.catch((e) => {
				// error
				// this.$Progress.fail();
				console.log(e);
			})
		},
		getMonths(){
			// this.$Progress.start();
			this.$store.state.showLoadingSpinner = true;
			axios.get('/months/')
			.then((response) => {
				// success
				this.months = response.data.data;
				// this.$Progress.finish();
				this.$store.state.showLoadingSpinner = false;
			})
			.catch((e) => {
				// error
				// this.$Progress.fail();
				this.$store.state.showLoadingSpinner = false;
				console.log(e);
			})
		},

		getCaseeBeneficiaries(caseeId){
			// this.$Progress.start();
			axios.get('/beneficiaries/', { params: { casee_id: caseeId } })
			.then((response) => {
				// success
				this.caseeBeneficiaries = response.data.data;
				// this.$Progress.finish();
			})
			.catch((e) => {
				// error
				// this.$Progress.fail();
				console.log(e);
			})
		},

		getCaseeActiveBeneficiaries(caseeId){
			// this.$Progress.start();
			axios.get('/beneficiaries/', { params: { casee_id: caseeId, is_active: 1  } })
			.then((response) => {
				// success
				this.CaseeActiveBeneficiaries = response.data.data;
				// this.$Progress.finish();
			})
			.catch((e) => {
				// error
				// this.$Progress.fail();
				console.log(e);
			})
		},

		getActiveReferralBeneficiaries(referralId){
			// this.$Progress.start();
			axios.get('/referral-beneficiaries/', { params: {referral_id: referralId, is_active: 1 } })
			.then((response) => {
				// success
				this.referralBeneficiaries = response.data.data;
				// this.$Progress.finish();
			})
			.catch((e) => {
				// error
				// this.$Progress.fail();
				console.log(e);
			})
		},



		getServiceTypes(){
			// this.$Progress.start();
			this.$store.state.showLoadingSpinner = true;
			axios.get('/service-types/')
			.then((response) => {
				this.serviceTypes = response.data.data;
				// this.$Progress.finish();
				this.$store.state.showLoadingSpinner = false;
			})
			.catch((e) => {
				// this.$Progress.fail();
				this.$store.state.showLoadingSpinner = false;
				console.log(e);
			})
		},

		getBudgets(){
			// this.$Progress.start();
			this.$store.state.showLoadingSpinner = true;
			axios.get('/budgets/')
			.then((response) => {
				this.budgets = response.data.data;
				// this.$Progress.finish();
				this.$store.state.showLoadingSpinner = false;
			})
			.catch((e) => {
				// this.$Progress.fail();
				this.$store.state.showLoadingSpinner = false;
				console.log(e);
			})
		},

		getEmergencies(){
			// this.$Progress.start();
			this.$store.state.showLoadingSpinner = true;
			axios.get('/emergencies', { params: {month_id: this.filter.month_id, user_id: this.filter.user_id} })
            .then((response) => {
				// success
				this.emergencies = response.data.data;
				// this.$Progress.finish();
				this.$store.state.showLoadingSpinner = false;
			})
			.catch((e) => {
				// error
				// this.$Progress.fail();
				console.log(e);
				this.$store.state.showLoadingSpinner = false;
			})
		},
	},

	
};



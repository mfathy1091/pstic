<style 
src="vue-multiselect/dist/vue-multiselect.css">
</style>

<template>
    <div>
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Create New User</h4>
                    <form @submit.prevent="createUser()" @keydown="userForm.errors.clear($event.target.name)">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="name" class="form-label">First Name</label>
                                <input
                                    id="name"
                                    v-model="userForm.first_name"
                                    type="text"
                                    name="name"
                                    class="form-control"
                                />
                                <span v-if="userForm.errors.has('first_name')" v-text="userForm.errors.get('first_name')" class="text-danger"></span>
                            </div>

                            <div class="mb-3">
                                <label for="name" class="form-label">Last Name</label>
                                <input
                                    id="name"
                                    v-model="userForm.last_name"
                                    type="text"
                                    name="name"
                                    class="form-control"
                                />
                                <span v-if="userForm.errors.has('last_name')" v-text="userForm.errors.get('last_name')" class="text-danger"></span>
                            </div>

                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input
                                    id="email"
                                    v-model="userForm.email"
                                    type="email"
                                    name="email"
                                    class="form-control"
                                />
                                <span v-if="userForm.errors.has('email')" v-text="userForm.errors.get('email')" class="text-danger"></span>
                            </div>

                            <div class="mb-3" v-if="roles">
                                <label class="typo__label">Roles</label>
                                <multiselect
                                    v-model="userForm.roles"
                                    :options="roles"
                                    :multiple="true"
                                    :close-on-select="false"
                                    :clear-on-select="false"
                                    :preserve-search="true"
                                    placeholder="Pick some"
                                    label="name"
                                    track-by="name"
                                    :preselect-first="true"
                                >
                                    <!-- <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template> -->
                                </multiselect>
                                <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
                                <span v-if="userForm.errors.has('roles')" v-text="userForm.errors.get('roles')" class="text-danger"></span>
                            </div>
                            <div class="mb-3" v-if="areas">
                                <label class="typo__label">Areas</label>
                                <multiselect
                                    v-model="userForm.areas"
                                    :options="areas"
                                    :multiple="true"
                                    :close-on-select="false"
                                    :clear-on-select="false"
                                    :preserve-search="true"
                                    placeholder="Pick some"
                                    label="name"
                                    track-by="name"
                                    :preselect-first="true"
                                >
                                    <!-- <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template> -->
                                </multiselect>
                                <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
                                <span v-if="userForm.errors.has('areas')" v-text="userForm.errors.get('areas')" class="text-danger"></span>
                            </div>
                            <div class="mb-3">
                                <label for="budget_id" class="form-label">Budget</label>
                                <select
                                    name="budget_id"
                                    v-model="userForm.budget_id"
                                    id="budget_id"
                                    class="form-control"
                                    :class="{ 'is-invalid': userForm.errors.has('budget_id') }"
                                >
                                    <option value="">Choose...</option>
                                    <option
                                        v-for="budget in budgets"
                                        :value="budget.id"
                                        :key="budget.id"
                                    >
                                        {{ budget.name }}
                                    </option>
                                </select>
                                <span v-if="userForm.errors.has('budget_id')" v-text="userForm.errors.get('budget_id')" class="text-danger"></span>
                            </div>

                            <div class="mb-3">
                                <label for="department_id" class="form-label">Department</label>
                                <select
                                    name="department_id"
                                    v-model="userForm.department_id"
                                    id="department_id"
                                    class="form-control"
                                    :class="{ 'is-invalid': userForm.errors.has('department_id') }"
                                >
                                    <option value="">Choose...</option>
                                    <option
                                        v-for="department in departments"
                                        :value="department.id"
                                        :key="department.id"
                                    >
                                        {{ department.name }}
                                    </option>
                                </select>
                                <span v-if="userForm.errors.has('department_id')" v-text="userForm.errors.get('department_id')" class="text-danger"></span>
                            </div>

                            <div v-show="!userEditMode" class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input
                                    v-model="userForm.password"
                                    type="password"
                                    name="password"
                                    id="password"
                                    class="form-control"
                                    :class="{ 'is-invalid': userForm.errors.has('password') }"
                                />
                                <span v-if="userForm.errors.has('password')" v-text="userForm.errors.get('password')" class="text-danger"></span>
                            </div>

                            <div class="mb-3">
                                <input
                                    v-model="userForm.is_active"
                                    type="checkbox"
                                    class="form-check-input"
                                    id="is_active"
                                />
                                <label class="form-check-label" for="is_active">Active?</label>
                            </div>
                        </div>
                        <hr>
                        <button class="btn btn-primary" type="submit" :disabled="isAdding">Create
                        </button>
                    </form>
                    <button class="btn btn-primary" @click="show">show</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import Form from '@/utils/Form.js'
import { mapGetters, mapActions } from 'vuex'
import MySwal from '@/utils/MySwal.js'
import UserDataService from '../services/UserDataService'

export default {

	components: {
        Multiselect
	},
    data(){
		return {
            userEditMode: false,
            isAdding: false,
			userForm: new Form({
				id: "",
				first_name: "",
				last_name: "",
				email: "",
				password: "",
				photo: "",
				budget_id: "",
				department_id: "",
				is_active: 0,
                areas: [],
                roles: []
			}),
		};
    },

    computed: {
        ...mapGetters({
			roles: 'roles/roles',
            areas: 'areas/areas',
            budgets: 'budgets/budgets',
            departments: 'departments/departments'
		})
	},
    methods: {
        ...mapActions({
			fetchRoles: "roles/fetchRoles",
            fetchAreas: "areas/fetchAreas",
            fetchBudgets: "budgets/fetchBudgets",
            fetchDepartments: "departments/fetchDepartments",
            createUserAction: "users/createUser",
		}),


        show() {
            MySwal.error('Created Successfuly')
        },

        async createUser() {
            this.isAdding = true;
            UserDataService.create(this.userForm)
            .then(response => {
                this.user = response.data.data.data;
                this.$router.go(-1);
                MySwal.success('Created Successfuly', '');
            }).catch(e => {
                switch(e.response.status) {
                    case 422:
                        this.userForm.errors.set(e.response.data.errors)
                        break;
                    default:
                        MySwal.error(e.response.status, e);
                }
            });
        }

    },
    created(){
        this.fetchRoles();
        this.fetchAreas();
        this.fetchBudgets();
        this.fetchDepartments();
    }

}

</script>
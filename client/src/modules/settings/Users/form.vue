<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<template>
    <div>
        <form @submit.prevent="userEditMode ? updateUser() : createUser()">
            <div class="modal-body">
                <div class="form-group">
                    <label for="name" class="form-label">First Name</label>
                    <input
                        id="name"
                        v-model="userForm.first_name"
                        type="text"
                        name="name"
                        class="form-control"
                    />
                    <HasError :form="userForm" field="first_name" />
                </div>

                <div class="form-group">
                    <label for="name" class="form-label">Last Name</label>
                    <input
                        id="name"
                        v-model="userForm.last_name"
                        type="text"
                        name="name"
                        class="form-control"
                    />
                    <HasError :form="userForm" field="last_name" />
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">Email</label>
                    <input
                        id="email"
                        v-model="userForm.email"
                        type="email"
                        name="email"
                        class="form-control"
                    />
                    <HasError :form="userForm" field="email" />
                </div>

                <div class="form-group" v-if="roles">
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
                </div>
                <div class="form-group" v-if="areas">
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
                </div>
                <div class="form-group">
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
                    <HasError :form="userForm" field="budget_id" />
                </div>

                <div class="form-group">
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
                    <HasError :form="userForm" field="department_id" />
                </div>

                <div v-show="!userEditMode" class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input
                        v-model="userForm.password"
                        type="password"
                        name="password"
                        id="password"
                        class="form-control"
                        :class="{ 'is-invalid': userForm.errors.has('password') }"
                    />
                    <has-error :form="userForm" field="password"></has-error>
                </div>

                <div class="form-group form-check">
                    <input
                        v-model="userForm.is_active"
                        type="checkbox"
                        class="form-check-input"
                        id="is_active"
                    />
                    <label class="form-check-label" for="is_active">Active?</label>
                </div>
            </div>
            <!-- <div class="modal-footer">
                <button
                    v-show="!userEditMode"
                    type="submit"
                    class="btn btn-success"
                >
                    Create
                </button>
                <button v-show="userEditMode" type="submit" class="btn btn-primary">
                    Update
                </button>
            </div> -->
        </form>
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import Form from '@/utils/Form.js'

export default {
    name: 'UsersForm',
    components: { Multiselect },
    data() {
		return {
			userEditMode: false,
			selected: this.selectedUser,
			users: {},
			roles: [],
			budgets: [],
			areas: [],
			departments: [],
			userForm: new Form({
				id: "",
				first_name: "",
				last_name: "",
				email: "",
				password: "",
				photo: "",
				roles: [],
				areas: [],
				budget_id: "",
				department_id: "",
				is_active: "",
			}),
		};
	},
    methods: {
		setUserEditMode(value, user) {
			this.userEditMode = value;
            if(this.userEditMode == true){
                this.selectedUser = user;
            }else{
                this.selectedUser = {};
            }
		},
    },

    created() {
		// this.getUsers();
		// this.getRoles();
		// this.getBudgets();
	}
}
</script>
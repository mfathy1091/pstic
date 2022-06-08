<style scoped>
.badge {
	font-size: 0.7rem;
	margin-left: 2px;

}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css">
</style>


<template>
	<div>
		<div class="row">
			<div class="card">
				<div class="card-body">
					<div class="form-inline ml-2">
						<button class="btn btn-primary btn-sm mr-2" @click="setModalVisible(true)">
							<i class="fa-solid fa-circle-plus"></i>
							<span><b> User</b></span>
						</button>

						<button class="btn btn-secondary btn-sm mr-5" @click="getUsers">
							<i class="fas fa-sync-alt"></i>
						</button>

						<div class="input-group mr-2">
							<input v-model="filter.name" type="search" placeholder="Search by Name"
								class="form-control form-control-sidebar" aria-label="Search">
							<div class="input-group-append">
								<button type="sumbit" class="btn btn-sidebar" @click="getUsers">
									<i class="fas fa-search fa-fw"></i>
								</button>
							</div>
						</div>

						<select v-model="filter.role_id" @change="getUsers" class="custom-select my-1 mr-sm-2"
							id="inlineFormCustomSelectPref">
							<option value=''>Select Role</option>
							<option v-for='role in roles' :value='role.id' :key="role.id">{{ role.name }}</option>
						</select>
						<select v-model="filter.is_active" @change="getUsers" class="custom-select my-1 mr-sm-2"
							id="inlineFormCustomSelectPref">
							<option value=''>Select Status</option>
							<option value='0'>Inactive</option>
							<option value='1'>Active</option>
						</select>
						<select v-model="filter.budget_id" @change="getUsers" class="custom-select my-1 mr-sm-2"
							id="inlineFormCustomSelectPref">
							<option value=''>Select Budget</option>
							<option v-for='budget in budgets' :value='budget.id' :key="budget.id">{{ budget.name }}
							</option>
						</select>
					</div>
					<div class="row mt-3">
						<table class=" table table-hover">
							<thead>
								<tr>
									<th>Full Name</th>
									<th>Email</th>
									<th>Registered At</th>
									<th>Roles</th>
									<th>Working Areas</th>
									<th>Is Active</th>
									<th>Direct Manager</th>
									<th>Budget</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="user in users" :key="user.id">
									<td>{{ user.full_name }}</td>
									<td>{{ user.email }}</td>
									<td>{{ $filters.myDateShort(user.created_at) }}</td>
									<td>
										<ul v-if="user.roles">
											<li v-for="role in user.roles" :key="role.id" class="badge bg-primary">
												{{ role.name }}</li>
										</ul>
									</td>
									<td>
										<div v-if="user.areas">
											<span v-for="area in user.areas" :key="area.id"
												class="badge bg-primary">{{ area.name }}</span>
										</div>
									</td>
									<td>
										<span v-show="user.is_active == '0'" class="badge bg-secondary">Inactive</span>
										<span v-show="user.is_active == '1'" class="badge bg-success">Active</span>
									</td>
									<td>
										<span v-if="user.direct_manager">{{ user.direct_manager.full_name }}</span>
									</td>
									<td>{{ user.budget.name }}</td>
									<td>
										<!-- <a class="clickable" @click="showEditUserModal(user)" v-if="$can('user_edit')"> -->
										<a class="clickable" @click="showEditUserModal(user)">
											<i class="fa fa-edit blue"></i>
										</a>

										<a class="clickable" @click="deleteUser(user.id)">
											<i class="fa fa-trash red"></i>
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

				</div>
			</div>
		</div>
		<router-view />
		<UsersAddModal />


		<!--USER Modal -->
		<!-- <UserModal :v-if="selectedUser.id" :userEditMode='userEditMode' :selectedUser='selectedUser'
			v-on:usersChanged="getUsers()">
		</UserModal> -->

	</div>
</template>
<script>

import axiosMixin from '../../../mixins/axiosMixin'
import axios from 'axios'
import $ from 'jquery'
import UsersAddModal from './UsersAddModal.vue'
import store from '@/store/index.js'
// import { computed } from 'vue'
// import { useStore } from 'vuex'
// import { mapGetters, mapMutations } from 'vuex'


export default {
	name: 'UsersView',
	mixins: [axiosMixin],
	components: {UsersAddModal},


	// setup() {
	// 	let store = useStore()
	// 	return {
	// 		modalVisible: computed(() => store.state.modalVisible),
	// 		showModal: computed(() => store.commit('setModalVisible', true)),
	// 	}
	// },

    data() {
		return {
			userEditMode: false,
			selectedUser: {},
			users: {},
			roles: [],
			budgets: [],
			filter: {
				role_id: '',
				is_active: '',
				name: '',
				budget_id: '',
			}
		}
	},
	methods: {
		setModalVisible (isVisible) {
			store.commit('setModalVisible', isVisible)
		},

		showCreateUserModal() {
			this.userEditMode = false;
			this.selectedUser = {};
			$('#userModal').modal('show')
		},


		showEditUserModal(user) {
			this.userEditMode = true;
			this.selectedUser = user;
			$('#userModal').modal('show')
		},


		deleteUser(id) {
			this.$swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			})
				.then((result) => {
					if (result.isConfirmed) {
						this.$Progress.start();
						axios.delete('/api/users/' + id)
							.then(() => {
								// success
								this.$emit('usersChanged');
								this.$swal.fire(
									'Deleted!',
									'It has been deleted.',
									'success'
								)
								this.$Progress.finish();
							})
							.catch(() => {
								this.$swal("Failed!", "There was something wrong.", "warning");
							});
					}
				})
		},
	},

	created() {
		// console.log($getPermissions());

		this.getUsers();
		this.getRoles();
		this.getBudgets();
	}
}
</script>
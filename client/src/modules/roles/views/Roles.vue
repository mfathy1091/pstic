<style scoped>
.badge{
	font-size: 0.7rem;
	margin-left: 2px;
	
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>


<template>
	<div>
		<div class="card-body">
			<div class="form-inline ml-2">
				<button class="btn btn-primary btn-sm mr-2" @click="showCreateRoleModal">
					<i class="fas fa-plus-circle"></i><span><b> Role</b></span>
				</button>

                <button class="btn btn-primary btn-sm mr-5" @click="getRoles">
					<i class="fas fa-sync-alt"></i>
				</button>

                <select @change="getRoles" class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
					<option value='-1' disabled>Worker...</option>
					<!-- <option v-for='user in users' :value='user.id' :key="user.id">{{ user.full_name }}</option> -->
                </select>                
            </div>
			<div class="row mt-3">
				<table class="border table table-hover">
					<thead>
						<tr>
							<th>Name</th>
							<th>Permissions</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody v-if="roles">
							<tr v-for="role in roles" :key="role.id">
								<td>{{ role.name }}</td>
								<td class="row">
									<ul>
										<li v-for="permission in role.permissions" :key="permission.id" class="badge bg-primary">
											{{permission.name}}
										</li>
									</ul>

								</td>
								<td>
									<a href="#" @click="showEditRoleModal(role)">
										<i class="fa fa-edit blue"></i>
									</a>
									
									<a href="#" @click="deleteRole(role.id)">
										<i class="fa fa-trash red"></i>
									</a>
								</td>
							</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Modal -->
		<div class="modal fade" id="roleModal" tabindex="-1" aria-labelledby="roleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 v-show="!editMode" class="modal-title" id="roleModalLabel">Create Role</h5>
						<h5 v-show="editMode" class="modal-title" id="roleModalLabel">Edit Role</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<form @submit.prevent="editMode ? updateRole() : createRole()">
						<div class="modal-body">
							<div class="form-group">
								<label for="name" class="form-label">Name</label>
								<input id="name" v-model="form.name" type="text" name="name" class="form-control">
								<HasError :form="form" field="name" />
							</div>
							
							<div class="form-group" v-if="roles">
								<label class="typo__label">Permissions</label>
								<multiselect 
								v-model="form.permissions" 
								:options="permissions" 
								:multiple="true" 
								:close-on-select="false" 
								:clear-on-select="false" 
								:preserve-search="true" 
								placeholder="Pick some" 
								label="name" 
								track-by="name" 
								:preselect-first="true">
									<!-- <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template> -->
								</multiselect>
								<!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
							</div>

						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
							<button v-show="!editMode" type="submit" class="btn btn-success">Create</button>
							<button v-show="editMode" type="submit" class="btn btn-primary">Update</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Form from 'vform';
import Multiselect from 'vue-multiselect'
import $ from 'jquery'

export default {
	
	name: 'RolesView',
	components: { Multiselect },
	data() {
		return {
			editMode: false,
			roles: {},
			permissions: [],
			form: new Form({
				id: '',
				name: '',
				permissions: [],
			})
		}
	},
	methods: {

		showCreateRoleModal(){
			this.editMode = false;
			// this.form.reset()
			$('#roleModal').modal('show')
		},
		createRole() {
			this.$Progress.start();
			this.form.post('/api/roles')
			.then(() => {
				// success
				this.$emit('rolesChanged');

				$('#roleModal').modal('hide')
				this.$swal.fire({
					icon: 'success',
					title: 'Added successfully'
				})
				
				this.$Progress.finish();
			})
			.catch(() => {
				// error
				this.$Progress.fail();
			})
		},

		showEditRoleModal(role){
			this.editMode = true;
			this.form.reset()
			$('#roleModal').modal('show')
			this.form.fill(role)
		},
		updateRole(){
			this.$Progress.start();
			this.form.put('/api/roles/'+this.form.id)
			.then(() => {
				// success
				this.$emit('rolesChanged');
				$('#roleModal').modal('hide')
				this.$swal.fire(
					'Updated!',
					'It has been updated.',
					'success'
				)
				this.$Progress.finish();
			})
			.catch(() => {
				// error
				this.$Progress.fail();
			})
		},

		deleteRole(id){
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
					this.form.delete('/api/roles/'+id)
					.then(() => {
						// success
						this.$emit('rolesChanged');
						this.$swal.fire(
							'Deleted!',
							'It has been deleted.',
							'success'
						)
						this.$Progress.finish();
					})
					.catch(() => {
						// error
						this.$Progress.fail();
						this.$swal.fire({
							icon: 'error',
							title: 'There is an error!'
						})
					});
				}
			})
		},

	},
	
	created() {
		// this.getRoles();
		// this.getPermissions();
	}
}
</script>
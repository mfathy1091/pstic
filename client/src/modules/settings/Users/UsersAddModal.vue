<template>
    <div>
        <Modal
			v-show="modalVisible"
		>
			<template v-slot:header>
				<h5>Add User</h5>
			</template>
			<template v-slot:body>
				<usersForm></usersForm>
			</template>
			<template v-slot:footer>
				<button
                    type="submit"
                    class="btn btn-primary"
                >Create
				</button>
			</template>
		</Modal>
    </div>
</template>
<script>
import Modal from "@/components/Modal.vue"
import store from '@/store/index.js'
import usersForm from './form.vue'

export default {
    components: {
		Modal,
		usersForm
	},

    computed: {
		modalVisible () {
			return this.$store.state.modalVisible
		}
	},

	methods: {
		showModal () {
			store.commit('setModalVisible', true)
		},
    }
}
</script>
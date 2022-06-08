<template>
    <div>
        <Modal
			v-show="isModalVisible"
		>
			<template v-slot:header>
				<h5>Add User</h5>
			</template>
			<template v-slot:body>
				<usersForm></usersForm>
			</template>
			<template v-slot:footer>
				<button type="submit" class="btn btn-primary">
					Create
				</button>
				<button type="button" class="btn btn-secondary" @click="setModalVisible(false)">
					Close
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
		isModalVisible () {
			return this.$store.state.isModalVisible
		}
	},

	methods: {
		setModalVisible (isVisible) {
			store.commit('setModalVisible', isVisible)
		},
    }
}
</script>
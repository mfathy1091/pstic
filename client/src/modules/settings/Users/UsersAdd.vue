<template>
    <div>
        <Modal v-show="modalVisible"/>
    </div>
</template>
<script>
import Modal from "@/components/Modal.vue"
import store from '@/store/index.js'

export default {

	components: {
		Modal
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
    },
    created(){
        this.showModal();
    }

}

</script>
<template>
		<transition name="fade">
			<div class="vue-modal">
				<transition name="drop-in">
					<div class="vue-modal-inner">
						<div class="vue-modal-content">
							<header class="modal-header" id="modalTitle">
								<h5 class="modal-title">
									<slot name="header">
										This is the default tile!
									</slot>
								</h5>

								<button type="button" class="btn-close" @click="closeModal" aria-label="Close modal"></button>
							</header>

							<section class="modal-body" id="modalDescription">
								<slot name="body">
									This is the default body!
								</slot>
							</section>

							<footer class="modal-footer">
								<button type="button" class="btn btn-secondary" @click="closeModal" aria-label="Close modal">
									Close
								</button>
								<slot name="footer">
									<!-- This is the default footer! -->
								</slot>
							</footer>
						</div>
					</div>
				</transition>
			</div>
		</transition>
</template>

<script>
// import { onMounted, onUnmounted } from 'vue';
// import { computed } from 'vue'
// import { useStore } from 'vuex'
import store from '@/store/index.js'


export default {
	name: 'ModalComponent',
	props: {
		// open: {
		// 	type: Boolean,
		// 	required: true
		// }
	},
	// setup(){
	// 	const handleKeyUp = (event) => {
	// 		if(event.keyCode === 27){
	// 			// close()
	// 		}
	// 	};

	// 	onMounted(() => document.addEventListener("keyup", handleKeyUp))
	// 	onUnmounted(() => document.removeEventListener("keyup", handleKeyUp))

	// 	const store = useStore()
	// 	return {
	// 		closeModal: computed(() => store.commit("setModalVisible", false)),
	// 	}

	// },
	methods: {
		closeModal () {
			store.commit('setModalVisible', false)
		},
	}


};
</script>

<style scoped>
*,
::before,
::after {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.vue-modal {
	position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
	/* display: flex;
	/* justify-content: center;
	/* align-items: center; */
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 1031;
}

.vue-modal-inner {
	max-width: 500px;
	margin: 2rem auto
}

.vue-modal-content {
	position: relative;
	background-color: #fff;
	border: 1px solid rgba(0, 0, 0, 0.3);
	border-radius: 0.3rem;
	background-clip: padding-box;
	padding: 1rem;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active {
	transition: all 0.3s ease-out;
}

.drop-in-enter-from,
.drop-in-leave-to {
	opacity: 0;
	transform: translateY(-50px);
}
</style>
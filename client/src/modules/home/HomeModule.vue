<template>
	<div>
		<HomeSideBar />
		<div class="wrapper d-flex flex-column min-vh-100 bg-light">
			<AppHeader />
			<div class="body flex-grow-1 px-3">
				<router-view />
			</div>
			<AppFooter />
		</div>
	</div>
</template>
<script>
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import HomeSideBar from "./components/HomeSideBar.vue";

export default {
	name: "HomeView",
	components: {
		AppFooter,
		AppHeader,
		HomeSideBar,
	},
	methods:{
		submit(){
			this.$swal.fire('welcome')
		}
	}
};
</script>

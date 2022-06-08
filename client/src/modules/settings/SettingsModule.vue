<template>
	<div>
		<SettingsSideBar />
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
// import { CContainer } from "@coreui/vue";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import SettingsSideBar from "./components/SettingsSideBar.vue";


export default {
	name: "AdminModule",
	components: {
		AppFooter,
		AppHeader,
		SettingsSideBar,
		// CContainer,
	},

};
</script>

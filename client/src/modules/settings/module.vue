<template>
	<div>
		<SettingsSidebar />
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
import SettingsSidebar from "./components/SettingsSidebar.vue";

export default {
	name: "AdminModule",
	components: {
		AppFooter,
		AppHeader,
		SettingsSidebar,
		// CContainer,
	},

};
</script>

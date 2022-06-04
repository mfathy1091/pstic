<template>
	<div>
		<div class="dropdown">
  <span class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </span>
	<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

					<CDropdownItem @click="logout">
					<CIcon icon="cil-lock-locked" /> Logout
				</CDropdownItem>
	</ul>
</div>
	
	
	<CDropdown variant="nav-item">
		
		<CDropdownToggle color="primary" component="button">
			<CAvatar :src="avatar" size="md" />
		</CDropdownToggle>
		<CDropdownMenu class="pt-0">
			<CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
				Account
			</CDropdownHeader>
			<CDropdownItem>
				<CIcon icon="cil-bell" /> Updates
				<CBadge color="info" class="ms-auto">{{ itemsCount }}</CBadge>
			</CDropdownItem>
			<CDropdownItem>
				<CIcon icon="cil-envelope-open" /> Messages
				<CBadge color="success" class="ms-auto">{{ itemsCount }}</CBadge>
			</CDropdownItem>
			<CDropdownItem>
				<CIcon icon="cil-task" /> Tasks
				<CBadge color="danger" class="ms-auto">{{ itemsCount }}</CBadge>
			</CDropdownItem>
			<CDropdownItem>
				<CIcon icon="cil-comment-square" /> Comments
				<CBadge color="warning" class="ms-auto">{{ itemsCount }}</CBadge>
			</CDropdownItem>
			<CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
				Settings
			</CDropdownHeader>
			<CDropdownItem> <CIcon icon="cil-user" /> Profile </CDropdownItem>
			<CDropdownItem> <CIcon icon="cil-settings" /> Settings </CDropdownItem>
			<CDropdownItem>
				<CIcon icon="cil-dollar" /> Payments
				<CBadge color="secondary" class="ms-auto">{{ itemsCount }}</CBadge>
			</CDropdownItem>
			<CDropdownItem>
				<CIcon icon="cil-file" /> Projects
				<CBadge color="primary" class="ms-auto">{{ itemsCount }}</CBadge>
			</CDropdownItem>
			<CDropdownDivider />
			<CDropdownItem>
				<CIcon icon="cil-shield-alt" /> Lock Account
			</CDropdownItem>
			<CDropdownItem @click="logout">
				<CIcon icon="cil-lock-locked" /> Logout 
			</CDropdownItem>
		</CDropdownMenu>
	</CDropdown>
	</div>
</template>

<script>
import {mapActions} from 'vuex'
import avatar from "@/assets/images/avatars/8.jpg";
export default {
	name: "AppHeaderDropdownAccnt",
	setup() {
		return {
			avatar: avatar,
			itemsCount: 42,
		};
	},
	methods: {
		...mapActions({
			logoutAction: "auth/logout",
		}),

		async logout() {
            this.logoutAction().then(() => {
				this.$router.replace({
                    name: 'login'
                })
            }).catch((e) => {
				console.log(e)
            })
        }
	},
};
</script>

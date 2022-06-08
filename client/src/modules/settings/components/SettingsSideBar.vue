<template>
    <SideBar>
        <template v-slot:nav>
            <SettingsSidebarNav/>
        </template>
        
    </SideBar>
</template>
<script>
import SideBar from '@/components/Sidebar.vue';
import { SettingsSidebarNav } from './SettingsSidebarNav'
export default {
    name: 'SettingsSideBar',
    components: {
        SideBar,
        SettingsSidebarNav
    },
}
</script>
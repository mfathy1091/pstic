<template>
    <Sidebar>
        <template v-slot:nav>
            <SettingsSidebarNav/>
        </template>
        
    </Sidebar>
</template>
<script>
import Sidebar from '@/components/Sidebar.vue';
import { SettingsSidebarNav } from './SettingsSidebarNav'
export default {
    name: 'SettingsSidebar',
    components: {
        Sidebar,
        SettingsSidebarNav
    },
}
</script>
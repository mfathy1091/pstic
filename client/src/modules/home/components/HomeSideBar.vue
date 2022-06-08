<template>
    <SideBar>
        <template v-slot:nav>
            <HomeSidebarNav/>
        </template>
        
    </SideBar>
</template>
<script>
import SideBar from '@/components/Sidebar.vue';
import { HomeSidebarNav } from './HomeSidebarNav'
export default {
    name: 'HomeSideBar',
    components: {
        SideBar,
        HomeSidebarNav
    },
}
</script>
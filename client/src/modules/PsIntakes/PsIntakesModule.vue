// Route = /user/:id
<template>
<div>
    <vue-router :key="moduleKey" v-if="moduleIsReady" />
    <div v-else>Loading profile ...</div>
</div>
    
</template>
<script>

import { FETCH_USER_BY_ID } from "./store";
export default {
    methods :{
        async  bootstrap() {
            const id = this.$route.params.id;
            // Fetch data from the backend
            // Will set the `stat.user` property
            await this.$store.dispatch(FETCH_USER_BY_ID, {id});
        }
    },

    computed: {
        user(){
            return this.$store.getters.user
        },

        moduleIsReady() {
            // wait for all calls to be resolved
            return this.user;
        },

        moduleKey() {
            return this.user ? this.user.id : 0;
        }
    },
    created(){
        this.bootstrap();
    }
}
</script>
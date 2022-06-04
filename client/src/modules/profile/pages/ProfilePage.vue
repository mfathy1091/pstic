// Route = /user/:id
<template>
<div>
    <h1>{{ user.name }}</h1>
    <router-link :to="{ name: 'profile.settings', params: { id: user.id } }">Settings</router-link>
    <br>
    <router-link to="/">Back to Home</router-link>
</div>
    
</template>
<script>

import { FETCH_USER_BY_ID } from "./store";
export default {
    name: "ProfilePage",

    computed: {
        user(){
            return this.$store.getters.user
        },
    }

}
</script>
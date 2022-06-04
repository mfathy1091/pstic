<template>
    <div class="container">
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" v-model="credentials.email" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" v-model="credentials.password" id="exampleInputPassword1">
        </div>

        <button type="submit" @click="login" class="btn btn-primary">Login</button>
    
	</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'LoginView',
    data() {
        return {
            credentials: {
                email: "",
                password: ""
            }
        }
    },

    methods: {
        ...mapActions({
            loginAction: 'auth/login'
        }),

        async login() {
            this.loginAction(this.credentials).then(() => {
				this.$router.replace({
                    path: '/'
                })
            }).catch((e) => {
				console.log(e)
            })
        }
    }
}
</script>


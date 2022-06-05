<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <form @submit.prevent>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" v-model="loginForm.email" id="exampleInputEmail1" aria-describedby="emailHelp">
                        <span v-text="errors.get('email')" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" v-model="loginForm.password" id="exampleInputPassword1">
                        <span v-text="errors.get('password')" class="text-danger"></span>
                    </div>
                    <br>
                    <div>
                        <button type="submit" @click="login" class="btn btn-primary">Login</button>
                    </div>

                </form>
            </div>
        </div>
	</div>
</template>

<script>
import {mapActions} from 'vuex'
import Errors from '../utils/Errors.js'

export default {
    name: 'LoginView',
    data() {
        return {
            loginForm: {
                email: "",
                password: "",
                
            },
            errors: new Errors()
        }
    },

    methods: {
        ...mapActions({
            loginAction: 'auth/login'
        }),

        async login() {
            this.loginAction(this.loginForm)
                .then(() => {
                    this.$router.replace({
                        path: '/'
                    })
                }).catch(error => console.log(error));
        }
    }
}
</script>


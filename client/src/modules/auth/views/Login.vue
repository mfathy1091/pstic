<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <form @submit.prevent="login" @keydown="loginForm.errors.clear($event.target.name)">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input name="email" class="form-control" v-model.trim="loginForm.email">
                        <span v-if="loginForm.errors.has('email')" v-text="loginForm.errors.get('email')" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input name="password" type="password" class="form-control" v-model="loginForm.password" id="exampleInputPassword1">
                        <span v-if="loginForm.errors.has('password')" v-text="loginForm.errors.get('password')" class="text-danger"></span>
                    </div>
                    <br>
                    <div>
                        <button type="submit" :disabled="loginForm.errors.any()" class="btn btn-primary">Login</button>
                    </div>

                </form>
            </div>
        </div>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Form from '@/utils/Form.js'
import MySwal from '@/utils/MySwal.js'


export default {
    name: 'LoginView',
    data() {
        return {
            loginForm: new Form({
                email: "",
                password: "",
            }),

        }
    },
    computed: {
        ...mapGetters({
            authenticatedUser : 'auth/user'
        })
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
                MySwal.success( this.authenticatedUser.full_name, 'Welcome Back');
                }).catch((error) => {
                    switch(error.response.status) {
                        case 401:
                            MySwal.warning('Invalid credentials');
                            break;
                        case 422:
                            this.loginForm.errors.set(error.response.data.errors)
                            break;
                        default:
                            // code block
                    }
                })// .finally(() => this.loading = false)
        }
    }
}
</script>


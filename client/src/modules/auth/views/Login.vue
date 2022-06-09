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
import {mapActions} from 'vuex'
import Form from '@/utils/Form.js'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

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
                }).catch((error) => {
                    switch(error.response.status) {
                        case 401:
                            Toast.fire({
                                icon: 'warning',
                                title: 'Invalid credentials'
                            })
                            break;
                        case 422:
                            this.loginForm.errors.set(error.response.data.errors)
                            break;
                        default:
                            // code block
                    }
                })
        }
    }
}
</script>


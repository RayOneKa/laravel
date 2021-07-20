<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Регистрация</div>

                <div class="card-body">
                    <div v-for='error, idx in errors' :key='idx'>
                        <div class="alert alert-danger" role="alert">
                            {{error[0]}}
                        </div>                        
                    </div>
                    <div class="form-group row">
                        <label for="login" class="col-md-4 col-form-label text-md-right">Логин</label>

                        <div class="col-md-6">
                            <input
                            v-model='login'
                            id="login"
                            type="text"
                            class="form-control"
                            name="login"
                            required
                            autocomplete="login"
                            autofocus
                            >
                        </div>
                    </div>                     
                    <div class="form-group row">
                        <label for="email" class="col-md-4 col-form-label text-md-right">EMAIL</label>

                        <div class="col-md-6">
                            <input
                            v-model='email'
                            id="email"
                            type="email"
                            class="form-control"
                            name="email"
                            required
                            autocomplete="email"
                            autofocus
                            >
                        </div>
                    </div>    
                    <div class="form-group row">
                        <label for="password" class="col-md-4 col-form-label text-md-right">Пароль</label>

                        <div class="col-md-6">
                            <input
                            v-model='password'
                            id="password"
                            type="password"
                            class="form-control"
                            name="password"
                            required
                            autofocus
                            >
                        </div>
                    </div>       
                    <div class="form-group row">
                        <label for="passwordRepeat" class="col-md-4 col-form-label text-md-right">Повторите пароль</label>

                        <div class="col-md-6">
                            <input
                            v-model='passwordRepeat'
                            @input='checkPasswordsMatch'
                            id="passwordRepeat"
                            type="password"
                            class="form-control"
                            name="passwordRepeat"
                            required
                            autofocus
                            >
                        </div>
                    </div>                       
                    <div class="form-group row mb-0">
                        <div class="col-md-8 offset-md-4">
                            <button
                                @click='register'
                                :disabled='!passwordsMatch'
                                class="btn btn-primary">
                                Зарегистрироваться
                            </button>
                        </div>
                    </div>                              
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            login: '',
            email: '',
            password: '',
            passwordRepeat: '',
            errors: []
        }
    },
    computed: {
        passwordsMatch () {
            return this.password == this.passwordRepeat
        }
    },
    methods: {
        checkPasswordsMatch () {
            if (!this.passwordsMatch) {
                this.errors = [
                    ['Пароли не совпадают']
                ]
            } else {
                this.errors = []
            }
        },
        register () {
            this.errors = []
            const params = {
                name: this.login,
                email: this.email,
                password: this.password,
                password_confirmation: this.passwordRepeat
            }
            axios.post('/api/auth/register', params)
                .then(({data}) => {
                    this.$store.dispatch('setUser', data)
                    this.$router.push('/')
                })
                .catch((error) => {
                    this.errors = error.response.data.errors
                })
        }
    }
}
</script>


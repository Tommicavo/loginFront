<script>
import axios from 'axios';

import { store } from '@/assets/data/store.js';

export default {
  name: 'RegisterPage',
  data() {
    return {
        store,
        form: {name: '', email: '', password: '', password_confirmation: ''},
        errors: {name: [], email: [], password: [], password_confirmation: []},
        isPristine: true,
        formSended: false
    }
  },
  components: {},
  props: {},
  computed: {
    nameIsValid(){
        if (!this.formSended) return '';
        if (this.isPristine) {
            return '';
        }
        return Boolean(this.errors.name.length) ? 'is-invalid' : 'is-valid';
    },
    emailIsValid(){
        if (!this.formSended) return '';
        if (this.isPristine) {
            return '';
        }
        return Boolean(this.errors.email.length) ? 'is-invalid' : 'is-valid';
    },
    passwordIsValid(){
        if (!this.formSended) return '';
        if (this.isPristine) {
            return '';
        }
        return Boolean(this.errors.password.length) ? 'is-invalid' : 'is-valid';
    },
    confirmIsValid(){
        if (!this.formSended) return '';
        if (this.isPristine) {
            return '';
        }
        return Boolean(this.errors.password_confirmation.length) ? 'is-invalid' : 'is-valid';
    }
  },
  methods: {
    sendForm(){
        const endpoint = 'http://127.0.0.1:8000/api/register';
        const data = this.form;
        
        this.isPristine = false;
        this.formSended = false;
        this.errors = {name: [], email: [], password: [], password_confirmation: []};

        axios.post(endpoint, data)
        .then(res => {
            const status = res.data.status;
            if (status == 'validationError'){
                const errors = res.data.errors;

                for (const field in this.errors) {
                    if (errors[field]) {
                        this.errors[field] = errors[field];
                    }
                }
            } else if (status == 'signinOk'){
                store.isLoggedIn = true;
                store.accountId = res.data.accountData.id;
                this.$router.push({ name: 'userPage', params: {slug: res.data.accountData.slug}});
            }
        })
        .catch(err => {console.error(err)})
        .then(() => {this.formSended = true;})
    }
  }
}
</script>

<template>
<div class="registerPage">
    <div class="card formCard pt-3">
        <div class="card-body">
            <form method="POST" @submit.prevent="sendForm" novalidate>
                <!-- Nome -->
                <div class="row">
                    <div class="col-3 offset-1">
                        <label for="name" class="form-label">Name</label>
                    </div>
                    <div class="col-6">
                        <input type="text" class="form-control" id="name" placeholder="Your name here"
                        :class="nameIsValid" v-model="form.name">
                    </div>
                </div>
                <div class="row errors nameErrors mb-3">
                    <div class="col-6 offset-4" v-for="error in this.errors.name">{{ error }}</div>
                </div>
                
                <!-- Email -->
                <div class="row">
                    <div class="col-3 offset-1">
                        <label for="email" class="form-label">Email</label>
                    </div>
                    <div class="col-6">
                        <input type="email" class="form-control" id="email" placeholder="Your email here"
                        :class="emailIsValid" v-model="form.email">
                    </div>
                </div>
                <div class="row errors emailErrors mb-3">
                    <div class="col-6 offset-4" v-for="error in this.errors.email">{{ error }}</div>
                </div>
        
                <!-- Password -->
                <div class="row">
                    <div class="col-3 offset-1">
                        <label for="password" class="form-label">Password</label>
                    </div>
                    <div class="col-6">
                        <input type="password" class="form-control" id="password" placeholder="Choose a password"
                        :class="passwordIsValid" v-model="form.password">
                    </div>
                </div>
                <div class="row errors passwordErrors mb-3">
                    <div class="col-6 offset-4" v-for="error in this.errors.password">{{ error }}</div>
                </div>
                
                <!-- Conferma Password -->
                <div class="row">
                    <div class="col-3 offset-1">
                        <label for="confirmPassword" class="form-label">Confirm Password</label>
                    </div>
                    <div class="col-6">
                        <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm your password"
                        :class="confirmIsValid" v-model="form.password_confirmation">
                    </div>
                </div>
                <div class="row errors confirmationPasswordErrors mb-3">
                    <div class="col-6 offset-4" v-for="error in this.errors.password_confirmation">{{ error }}</div>
                </div>

                <div class="row mb-3">
                    <div class="col-2 offset-4">
                        <button type="submit" class="btn btn-primary">Sign in</button>
                    </div>
                </div>
                
                <div class="d-flex justify-content-center align-items-center gap-3">
                    <div class="haveAccount">Already have an account?</div>
                    <router-link :to="{name: 'loginPage'}" class="btn btn-primary">Login</router-link>
                </div>

            </form>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.formCard{
    border-radius: 1.6rem;
    box-shadow: 4px 4px 4px gray;
    border: 0;
}

.row.errors>*{
    font-size: 0.9rem;
    font-weight: 500;
    color: red;
    padding-left: 1.2rem;
}


</style>
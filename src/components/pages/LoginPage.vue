<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {email: '', password: ''},
      errors: {email: [], password: []},
      messages: {email: null, password: null},
      isPristine: true,
      formSended: false
    }
  },
  components: {},
  props: {},
  computed: {
    emailIsValid(){
      if (!this.formSended) return '';
      if (this.isPristine) return '';
      if (!this.validationOk){
        return Boolean(this.errors.email.length != 0) ? 'is-invalid' : '';
      } else if (this.validationOk){
        return Boolean(this.messages.email != null) ? 'is-invalid' : 'is-valid';
      }
    },
    passwordIsValid(){
      if (!this.formSended) return '';
      if (this.isPristine) return '';
      if (!this.validationOk){
        if (Boolean(this.errors.password.length != 0)) return 'is-invalid';
      } else if (this.validationOk){
        if (Boolean(this.messages.email == null && this.messages.password != null)) return 'is-invalid';
        else if (this.messages.email == null && this.messages.password == null) return 'is-valid';
      }
    },
    validationOk(){
      return Object.values(this.errors).every(array => array.length === 0);
    }
  },
  methods: {
    sendForm(){
      const endpoint = 'http://127.0.0.1:8000/api/login';
      const data = this.form;
      
      // Init data
      this.formSended = false;
      this.isPristine = false;
      this.errors = {email: [], password: []};
      this.messages = {email: null, password: null, success: null};

      axios.post(endpoint, data)
      .then(res => {
        console.log(res.data);
        const status = res.data.status;
        if (status == 'validationError'){
          const errors = res.data.errors;

          for (const field in this.errors) {
            if (errors[field]) {
              this.errors[field] = errors[field];
            }
          }
        } else if (status == 'deniedEmail'){
          this.messages.email = res.data.message;
        } else if (status == 'deniedPassword'){
          this.messages.password = res.data.message;
          console.log('message: ', this.messages.password);
        } else if (status == 'loginOk'){
          this.$router.push({ name: 'userPage', params: {slug: res.data.slug}});
        }
      })
      .catch(err => {console.error(err)})
      .then(() => {this.formSended = true})
    }
  }
}
</script>

<template>
<div class="registerPage">
    <div class="card formCard pt-3">
        <div class="card-body">
            <form method="POST" @submit.prevent="sendForm" novalidate>  

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
                <div class="row errorMessages mb-3">
                    <div class="col-6 offset-4" v-for="error in errors.email">{{ error }}</div>
                    <div class="col-6 offset-4">{{ messages.email }}</div>
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
                <div class="row errorMessages mb-3">
                    <div class="col-6 offset-4" v-for="error in errors.password">{{ error }}</div>
                    <div class="col-6 offset-4">{{ messages.password }}</div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-1 offset-4">
                        <button type="submit" class="btn btn-primary">Login</button>
                    </div>
                </div>
                
                <div class="d-flex justify-content-center align-items-center gap-3">
                    <div>Don't have an account yet?</div>
                    <router-link :to="{name: 'registerPage'}" class="btn btn-primary">Sign in</router-link>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.formCard{
    border-radius: 1.6rem;
    box-shadow: 4px 4px 8px gray;
    border: 0;
}

.row.errorMessages>*{
    font-size: 0.9rem;
    font-weight: 500;
    color: red;
    padding-left: 1.2rem;
}
</style>
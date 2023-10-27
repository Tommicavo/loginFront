<script>
import axios from 'axios';
import { store } from '@/assets/data/store.js';

export default {
  name: 'AppHeader',
  data() {
    return {
      store
    }
  },
  components: {},
  props: {},
  computed: {},
  methods: {
    logout(){
      const endpoint = 'http://127.0.0.1:8000/api/logout';
      const id = store.accountId;
      axios.patch(endpoint, {id: id})
      .then(res => {
        const status = res.data.status;
        if (status == 'loggedOut'){
          store.isLoggedIn = false;
          store.accountId = -1;
          this.$router.push({name: 'homePage'});
        }
      })
      .catch(err => {console.error(err)})
    }
  }
}
</script>

<template>
  <header class="appHeader">
      <nav class="h-100">
        <div class="container d-flex justify-content-between align-items-center h-100">
          <router-link :to="{name: 'homePage'}" class="navLink d-flex gap-2">
            <span><font-awesome-icon icon="fa-solid fa-house" /></span>
            <span>Home</span>
          </router-link>
          <div v-if="store.isLoggedIn == false">
            <router-link :to="{name: 'loginPage'}" class="navLink d-flex gap-2">
              <span><font-awesome-icon icon="fa-solid fa-user" /></span>
              <span>Login</span>
            </router-link>
          </div>
          <div v-else>
            <div class="navLink d-flex gap-2" @click="logout">
              <span><font-awesome-icon icon="fa-solid fa-user" /></span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </nav>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/partials/vars' as *;
.appHeader{
  height: $headerHeight;
  background-color: #0e1111;
}

.navLink{
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
}

.navLink:hover{
  color: gold;
}
</style>

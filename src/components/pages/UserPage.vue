<script>
import axios from 'axios';
import { store } from '@/assets/data/store.js';

export default {
  name: 'UserPage',
  data() {
    return {
      store,
      name: ''
    }
  },
  components: {},
  props: {},
  computed: {},
  methods: {
    fetchAccount(){
      const baseUri = 'http://127.0.0.1:8000/api/account/';
      const endpoint = `${baseUri}${this.$route.params.slug}`;

      axios.post(endpoint, {id: store.accountId})
      .then(res => {
        const status = res.data.status;
        if (status == 'denied'){
          store.isLoggedIn = false;
          store.accountId = -1;
          this.$router.push({name: 'notFoundPage'});
        } else if (status == 'ok'){
          this.name = res.data.name;
        }
      })
      .catch(err => console.error(err))
    }
  },
  mounted(){
    this.fetchAccount();
  }
}
</script>

<template>
  <h1 class="text-center py-3">Welcome Back, {{ name }}!</h1>
</template>

<style lang="scss" scoped>

</style>
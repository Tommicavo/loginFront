<script>
import axios from 'axios';


export default {
  name: 'UserPage',
  data() {
    return {
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

      axios.get(endpoint)
      .then(res => {
        console.log(res.data);
        this.name = res.data.name;
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
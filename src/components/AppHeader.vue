<script>

export default {
  name: 'AppHeader',
  data() {
    return {}
  },
  components: {},
  props: {},
  computed: {},
  methods: {}
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
          <router-link :to="{name: 'loginPage'}" class="navLink d-flex gap-2">
            <span><font-awesome-icon icon="fa-solid fa-user" /></span>
            <span>Profile</span>
          </router-link>
        </div>
      </nav>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/partials/vars' as *;
.appHeader{
  height: $headerHeight;
  background-color: #2c313c;
}

.navLink{
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
}

.navLink:hover{
  color: gold;
}
</style>

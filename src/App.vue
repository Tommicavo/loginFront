<script>

import AppHeader from '@/components/AppHeader.vue'

export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    AppHeader
  }

}
</script>

<template>
  <AppHeader/>
  <main>
    <div class="container py-5">  
      <router-view></router-view>
    </div>
  </main>
</template>

<style lang="scss">
@use './assets/scss/style.scss' as *;
@use '@/assets/scss/partials/vars' as *;

main{
  height: calc(100vh - $headerHeight);
  background-color: #aaaaaa;
}
</style>

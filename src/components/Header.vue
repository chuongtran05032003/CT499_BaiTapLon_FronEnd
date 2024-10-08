<template>
  <header class="w-full h-16 flex items-center justify-between pr-5 pt-2">
    <HeaderNav />
    <HeaderSearch />
    <HeaderProfile />
  </header>
</template>

<script setup>
import HeaderNav from './HeaderNav.vue';
import HeaderSearch from './HeaderSearch.vue';
import HeaderProfile from './HeaderProfile.vue';
</script>

<style scoped>

</style>

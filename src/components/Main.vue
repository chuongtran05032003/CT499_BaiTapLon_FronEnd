<template>
  <main class="flex flex-1 w-full overflow-hidden bg-[#F8FAFD]">
    <MainNav />
    <section class="flex flex-1 m-5 overflow-hidden box-border justify-center bg-transparent rounded-xl">
      <div class="flex w-full h-full overflow-hidden">
        <router-view />
      </div>
    </section>
  </main>
</template>

<script setup>
import MainNav from '../components/MainNav.vue';
</script>

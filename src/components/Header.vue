<template>
  <header class="w-full h-16 flex items-center justify-between pr-5 py-2 bg-white">
    <div :class="isSearchOpen ? 'hidden' : 'flex'" class="h-fit w-56 ml-2">
        <HeaderNav/>
    </div>
    <div class="h-fit flex-1  flex items-center justify-center max-[480px]:justify-end pl-5"> 
      <HeaderSearch  @openSearch="handleOpenSearch" @closeSearch="handleCloseSearch"/>
    </div>
    <div :class="isSearchOpen ? 'hidden' : 'flex'" class="h-full items-center space-x-2 relative cursor-pointer">
      <HeaderProfile v-if="isLoggedIn" :user="userData"/>
      <HeaderSign v-else />
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';


import HeaderNav from './HeaderNav.vue';
import HeaderSearch from './HeaderSearch.vue';
import HeaderProfile from './HeaderProfile.vue';
import HeaderSign from './HeaderSign.vue';

const isSearchOpen = ref(false);

import { useStore } from 'vuex';
const store = useStore();

const isLoggedIn = computed(() => store.getters.isLoggedIn);
const userData = computed(() => store.getters.userData);

onMounted(async () => {
  try {
    await store.dispatch('checkLoggedIn');
  } catch (error) {
    console.log(error);
  }
});

const handleOpenSearch = () =>  {
  isSearchOpen.value = true;
}
const handleCloseSearch = () =>  {
  isSearchOpen.value = false;
}

</script>


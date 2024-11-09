<template>
  <div id="close_search" class=" h-10 w-10 rounded-full justify-center items-center" @click="closeSearch"
    :class="isSearchOpen ? 'flex' : 'hidden'">
    <i class="fa-solid fa-arrow-left"></i>
  </div>
  <div id="search_bar" ref="search_bar"
    class="h-fit rounded-full bg-white flex items-center mx-2 space-x-1 border border-slate-500  focus-within:border-blue-500 cursor-pointer"
    :class="isSearchOpen ? 'flex-1' : 'max-[480px]:basis-0 grow-0 shrink basis-2/3'">
    <div id="open_search" class="h-10 w-10 rounded-full flex bg-white items-center justify-center" @click="openSearch">
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
    <div class="flex-1 flex items-center" :class="isSearchOpen ? '' : 'max-[480px]:hidden'">
      <input id="search_input" type="text"
        class="bg-white h-8 focus:outline-none text-base w-full min-w-20 mr-3"
        placeholder="Tìm kiếm..."
        v-model="searchInput"
        @keydown.enter="handleSearch"
        @input="toggleClearButton">
      <div class="items-center justify-center w-fit h-fit p-2 hover:bg-slate-300 rounded-full"
        :class="showClearButton ? 'flex' : 'hidden'"
        @click="clearSearch">
        <i class="fa-solid fa-circle-xmark"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(["openSearch", "closeSearch"]);
const searchInput = ref('');
const isSearchOpen = ref(false);
const showClearButton = ref(false);
const search_bar = ref(null);
const router = useRouter();

const clearSearch = () => {
  searchInput.value = '';
  showClearButton.value = false;
};

const toggleClearButton = () => {
  showClearButton.value = searchInput.value !== '';
};

const openSearch = () => {
  if (search_bar.value.offsetWidth < 50) {
    isSearchOpen.value = true;
    emit("openSearch");
  }
};

const closeSearch = () => {
  isSearchOpen.value = false;
  emit("closeSearch");
};


const searchBarResize = () => {
  if (window.innerWidth > 480) {
    isSearchOpen.value = false;
    emit("closeSearch");
  }
};

const handleSearch = () => {
  router.push({ name: 'resultSearch', query: { searchQuery: searchInput.value } });
  searchInput.value = '';
  toggleClearButton();
};

onMounted(() => {
  searchBarResize();
  window.addEventListener('resize', searchBarResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', searchBarResize);
});
</script>

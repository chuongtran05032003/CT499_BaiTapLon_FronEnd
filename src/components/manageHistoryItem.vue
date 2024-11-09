<template>
    <td class="p-2 whitespace-nowrap">
        {{ item?.MaSach || 'N/A' }}</td>
    <td class="p-2 book-title">
        {{ item?.TenSach || 'N/A' }}</td>
    <td class="p-2 whitespace-nowrap hidden sm:table-cell">
        {{ formatDate(item?.NgayMuon) || 'N/A' }}</td>
    <td class="p-2 whitespace-nowrap">
        {{ hanTra(item?.NgayMuon) || 'N/A' }}</td>
    <td class="p-2 whitespace-nowrap hidden sm:table-cell">
        {{ formatDate(item?.NgayTra) || 'N/A' }}</td>
</template>
<style scoped>
    .book-title {
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-wrap: break-word;
    }
</style>
<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';

const props = defineProps({
    item: {
    type: Object,
  },
});
const hanTra = (ngayTraString) => {
    if (!ngayTraString) return 'N/A';

    const ngayTra = new Date(ngayTraString);
    ngayTra.setDate(ngayTra.getDate() + 7);

    return formatDate(ngayTra.toISOString());
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A'; 
    
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; 
};

const isOpenDropButton = ref(false);
const dropdownButton = ref(null);
const dropdownMenu = ref(null);

const handleClickOutside = (event) => {
  if (isOpenDropButton.value && 
      !dropdownButton.value.contains(event.target) && 
      !dropdownMenu.value.contains(event.target)) {
    isOpenDropButton.value = false; 
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeMount(() => {
    document.removeEventListener('click', handleClickOutside);
});

</script>
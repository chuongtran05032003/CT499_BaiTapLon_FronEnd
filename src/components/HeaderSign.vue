<template>
<div class="flex flex-1 items-center">
    <button @click="goToSignIn" class="px-4 py-2  border-r border-[#FFD573] hover:bg-[#FEF6DF]  rounded-l-lg whitespace-nowrap" >Đăng nhập</button>
    <button @click="goToRegister" class="px-4 py-2 border-l border-[#FFD573] hover:bg-[#FEF6DF]  rounded-r-lg whitespace-nowrap hidden sm:flex">Đăng ký</button>
</div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goToSignIn = () => {
  router.push({ name: 'login' });
}
const goToRegister = () => {
  router.push({ name: 'register' });
}

</script>
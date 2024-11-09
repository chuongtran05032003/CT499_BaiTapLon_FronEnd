<template>
<div
    class="flex-1 rounded-xl bg-[#FEF6DF] flex flex-col overflow-y-auto relative" style="scrollbar-gutter: stable;">
    <div class="h-full w-full flex flex-col md:flex-row p-10">
        <div class=" w-full h-fit md:w-1/2 md:h-full flex flex-col">
            <div class="w-full h-full flex flex-col pt-6 lg:pt-20 lg:pl-10">
                <h2 class="font-bold text-4xl">CHÀO MỪNG ĐẾN VỚI</h2>
                <h1 class="font-bold text-6xl text-[#FFD573] my-5">DITBOOK</h1>
                <h2 class="font-bold text-2xl ">CÂU LẠC BỘ <span class="text-[#FFD573]">LỮ HÀNH SÁCH</span></h2>
                <h4 class=" font-semibold text-lg mt-5 text-slate-500 md:pr-10"><span class="cursor-pointer text-[#FFD573]" @click="goToSignIn">Đăng ký</span> để trở thành thành viên. </h4>
                <h4 class=" font-semibold text-lg text-slate-500 md:pr-10">Tham gia vào hành trình một trang sách mới, một chân chời mới.</h4>
                <h5 class="text-slate-500 font-semibold mt-10">Email: booksdit@gmail.com</h5>
                <h5  class="text-slate-500 font-semibold">Địa chỉ: Long Trị, Long Mỹ, Hậu Giang</h5>
            </div>
       </div>
        <div class=" w-full h-fit md:w-1/2 md:h-full flex justify-center items-center">
                <img src="../assets/pic/duck.png" alt="" class="object-cover w-full lg:h-full md:w-auto">
        </div>
    </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goToSignIn = () => {
  router.push({ name: 'login' });
}
</script>
<template>
  <div class=" fixed top-0 left-0 not-found h-full w-full flex flex-col justify-center items-center text-center bg-[#FEF6DF]">
    <div class="w-60 h-60">
        <img src="../assets/pic/notfound.png" alt="" class="w-full object-cover">
    </div>
    <h1 class="text-6xl font-bold text-gray-800 mt-2">404</h1>
    <p class="text-2xl mt-4 text-gray-600">Oops! Trang bạn tìm không tồn tại.</p>
    <router-link to="/" class="mt-6 px-4 py-2 bg-[#FFD573] text-white rounded-lg hover:bg-[#ffca4f]">
      Quay về Trang chủ
    </router-link>
  </div>
</template>

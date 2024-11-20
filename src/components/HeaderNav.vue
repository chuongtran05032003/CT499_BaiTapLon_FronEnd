<template>
        <div class="h-10 w-10 m-2 hover:bg-[#FEF6DF] rounded-full flex items-center justify-center cursor-pointer"
            @click="openNav">
            <i class="fa-solid fa-bars"></i>
        </div>
        <div class="h-14 flex-1 flex items-center text-lg font-bold">
            <span>DitBook</span>
        </div>
</template>
<script setup>
import eventBus from '../eventBus';
const openNav = () => {
    eventBus.emit('toggleNav');
}
</script>
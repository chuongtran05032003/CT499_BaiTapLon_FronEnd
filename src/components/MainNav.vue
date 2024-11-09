<template>
    <nav ref="nav" class="h-full flex flex-col w-0 md:w-16 overflow-x-hidden pl-2" :class="{'xl:w-52' : showLabel}">
        <div class="h-full mb-5 mt-5 pr-1 overflow-y-auto">
            <div class="mb-2 w-full">
                <MenuItem1
                    iconClass="fa-solid fa-house"
                    text="Trang chủ"
                    :isVisible="showLabel"
                    route='home'
                    @button-clicked="getActiveButton"
                    :isActive="activeButton === 'home'"
                    />
                <MenuItem1
                    iconClass="fa-solid fa-bars"
                    text="Danh mục"
                    :isVisible="showLabel"
                    route='category'
                    @button-clicked="getActiveButton"
                    :isActive="activeButton === 'category'"
                    />
                <div v-if="userData !== null && userData.ChucVu">
                    <div class="h-12 items-center rounded-xl justify-normal px-4 cursor-pointer" :class="showLabel ? 'xl:flex' : 'hidden'">
                        <span  class="font-medium">Quản Lý ></span>
                    </div>
                    <MenuItem1
                        iconClass="fa-solid fa-book"
                        text="Sách"
                        :isVisible="showLabel"
                        route='manageBook'
                        @button-clicked="getActiveButton"
                        :isActive="activeButton === 'manageBook'"
                        />
                    <MenuItem1
                        iconClass="fa-solid fa-list"
                        text="Danh mục"
                        :isVisible="showLabel"
                        route='manageCategory'
                        @button-clicked="getActiveButton"
                        :isActive="activeButton === 'manageCategory'"
                        />
                    <MenuItem1
                        iconClass="fa-solid fa-synagogue"
                        text="Nhà xuất bản"
                        :isVisible="showLabel"
                        route='managePublisher'
                        @button-clicked="getActiveButton"
                        :isActive="activeButton === 'managePublisher'"
                        />
                    <MenuItem1
                        iconClass="fa-solid fa-arrow-right-arrow-left"
                        text="Yêu cầu"
                        :isVisible="showLabel"
                        route='manageRequest'
                        @button-clicked="getActiveButton"
                        :isActive="activeButton === 'manageRequest'"
                        />
                </div>
                <div v-if="userData !== null && userData.ChucVu && userData.ChucVu === 'Admin' ">
                    <MenuItem1
                        iconClass="fa-solid fa-users-gear" 
                        text="Tài khoản"
                        :isVisible="showLabel"
                        route='manageStaff'
                        @button-clicked="getActiveButton"
                        :isActive="activeButton === 'manageStaff'"
                        />
                </div>
                <div v-if="userData !== null">
                    <div class="h-12 items-center rounded-xl justify-normal px-4 cursor-pointer" :class="showLabel ? 'xl:flex' : 'hidden'">
                        <span class="font-medium">Cá Nhân ></span>
                    </div>
                    <MenuItem1
                        iconClass="fa-solid fa-user-pen"
                        text="Tài khoản"
                        :isVisible="showLabel"
                        route='manageAccount'
                        @button-clicked="getActiveButton"
                        :isActive="activeButton === 'manageAccount'"
                        />
                    <MenuItem1  v-if="!userData.ChucVu "
                        iconClass="fa-solid fa-clock-rotate-left"
                        text="Lịch sử"
                        :isVisible="showLabel"
                        route='manageHistory'
                        @button-clicked="getActiveButton"
                        :isActive="activeButton === 'manageHistory'"
                        />
                </div>
            </div>
        </div>
    </nav>
    <div class="absolute inset-0 bg-black opacity-25 z-30 " :class="showNav_hidden ? 'block' : 'hidden'"></div>
    <nav class="h-full flex-col w-56 fixed top-0 z-40 bg-white pt-2 px-2" :class="showNav_hidden ? 'flex' : 'hidden'">
        <div class="h-fit w-56 flex ">
            <div class="h-10 w-10 m-2 hover:bg-slate-400 rounded-full flex items-center justify-center"
                @click="toggleNav">
                <i class="fa-solid fa-bars"></i>
            </div>
            <div class="h-14 flex-1 flex items-center text-lg font-bold">
                <span>DitBook</span>
            </div>
        </div>
        <div class="flex-1 ml-2 pr-1 my-5 overflow-y-auto">
            <div class="mb-2">
                <MenuItem2
                    iconClass="fa-solid fa-house"
                    text="Trang chủ"
                    route='home'
                    @button-clicked="getActiveButton"
                    :isActive="activeButton === 'home'"
                    @closeNav="close_HiddenNav"
                    />
                <MenuItem2
                    iconClass="fa-solid fa-list"
                    text="Danh mục"
                    route='category'
                    @button-clicked="getActiveButton"
                    :isActive="activeButton === 'category'"
                    @closeNav="close_HiddenNav"
                    />
            </div>
            <div v-if="userData !== null && userData.ChucVu" class="w-full mb-2">
                    <div class="h-12 items-center rounded-xl justify-normal px-4 cursor-pointer flex">
                        <span class="font-medium">Quản lý > </span>
                    </div>
                    <MenuItem2
                        iconClass="fa-solid fa-book"
                        text="Sách"
                        route='manageBook'
                        @button-clicked="getActiveButton"
                        :isActive="activeButton === 'manageBook'"
                        @closeNav="close_HiddenNav"
                        />
                    <MenuItem2
                        iconClass="fa-solid fa-list"
                        text="Danh mục"
                        route='manageCategory'
                        @button-clicked="getActiveButton"
                        :isActive="activeButton === 'manageCategory'"
                        @closeNav="close_HiddenNav"
                        />
                    <MenuItem2
                        iconClass="fa-solid fa-synagogue"
                        text="Nhà xuất bản"
                        route='managePublisher'
                        @button-clicked="getActiveButton"
                        :isActive="activeButton === 'managePublisher'"
                        @closeNav="close_HiddenNav"
                        />
                    <MenuItem2
                        iconClass="fa-solid fa-arrow-right-arrow-left"
                        text="Yêu cầu"
                        route='manageRequest'
                        @button-clicked="getActiveButton"
                        :isActive="activeButton === 'manageRequest'"
                        @closeNav="close_HiddenNav"
                        />
            </div>
            <div v-if="userData !== null && userData.ChucVu && userData.ChucVu === 'Admin' ">
                    <MenuItem2
                        iconClass="fa-solid fa-users-gear" 
                        text="Tài khoản"
                        :isVisible="showLabel"
                        route='manageStaff'
                        @button-clicked="getActiveButton"
                        :isActive="activeButton === 'manageStaff'"
                        @closeNav="close_HiddenNav"
                        />
                </div>
            <div v-if="userData !== null" class="w-full mb-2">
                <div class="h-12 items-center rounded-xl justify-normal px-4 cursor-pointer flex">
                        <span class="font-medium">Cá nhân ></span>
                </div>
                    <MenuItem2
                        iconClass="fa-solid fa-user-pen"
                        text="Tài khoản"
                        route='manageAccount'
                        @button-clicked="getActiveButton"
                        :isActive="activeButton === 'manageAccount'"
                        @closeNav="close_HiddenNav"
                        />
                    <MenuItem2 v-if="!userData.ChucVu "
                        iconClass="fa-solid fa-clock-rotate-left"
                        text="Lịch sử"
                        route='manageHistory'
                        @button-clicked="getActiveButton"
                        :isActive="activeButton === 'manageHistory'"
                        @closeNav="close_HiddenNav"
                        />
            </div>
        </div>
    </nav>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import eventBus from '../eventBus';
import MenuItem1 from './MenuItem1.vue';
import MenuItem2 from './MenuItem2.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const currentRouteName = computed(() => route.name);
const activeButton = currentRouteName;
const getActiveButton = (route) => {
    activeButton.value = route;
};

const nav = ref(false);
const showLabel = ref(true);
const showNav_hidden = ref(false);
const toggleNav = () => {
    if (window.innerWidth > 1280) {
        showLabel.value = !showLabel.value;
        showNav_hidden.value = false;
    } else {
        showNav_hidden.value = !showNav_hidden.value;
    }
}
const checkScreenSize = () => {
    showLabel.value = window.matchMedia('(min-width: 1280px)').matches;
    
};

import { useStore } from 'vuex';
const store = useStore();

const userData = computed(() => store.getters.userData);
const close_HiddenNav = () => {
    showNav_hidden.value = false;
}
onMounted( async () => {
try {
    eventBus.on('toggleNav', () => { toggleNav() });
    checkScreenSize();
    const mediaQuery = window.matchMedia('(min-width: 1280px)');
    mediaQuery.addEventListener('change', (event) => {
        showLabel.value = event.matches;
        showNav_hidden.value = false;
    });
  } catch (error) {
    console.log(error);
  }
});

onBeforeUnmount(() => {
    eventBus.off('toggleNav');
    const mediaQuery = window.matchMedia('(min-width: 1280px)');
    mediaQuery.removeEventListener('change', checkScreenSize);
});
</script>
<style>
        ::-webkit-scrollbar {
            width: 4px;
        }

        ::-webkit-scrollbar-thumb {
            border-radius: 6px;
            background: #d1d1d1;
        }

        ::-webkit-scrollbar-track {
            background: transparent;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #c2c2c2;
        }
</style>
<template>
        <div class="h-10 w-10 rounded-full box-border cursor-pointer overflow-hidden" @click="toggleProfile">
            <img v-if="props.user.avatar" :src="fileImage" alt=""
                class="rounded-full object-cover">
            <div v-else class="flex justify-center items-center text-lg  bg-[#FFD573] w-full h-full text-white">
                <div v-if="props.user.Ten">{{ props.user.Ten.charAt(0).toUpperCase() }}</div>
                <div v-if="props.user.HoTenNV">{{ props.user.HoTenNV.split(' ').pop().charAt(0).toUpperCase() }}</div>
            </div>
        </div>
        <div id="user_profile"
            class="absolute top-full right-0 bg-[#FFD9A8] rounded-xl w-fit h-fit flex-col items-center overflow-hidden shadow-lg z-30"
            :class="isProfileOpen ? 'flex': 'hidden'">
            <div class="relative mt-16 bg-white w-full h-fit flex flex-col items-center">
                <div
                    class="h-16 w-16 rounded-full border-2  bg-[#FFD9A8] absolute right-1/2 top-0 translate-x-1/2 -translate-y-1/2 overflow-hidden">
                    <img v-if="props.user.avatar" :src="fileImage" alt=""
                        class="rounded-full object-cover">
                    <div v-else class="flex justify-center items-center text-lg  bg-[#FFD573] w-full h-full text-white">
                        <div v-if="props.user.Ten">{{ props.user.Ten.charAt(0).toUpperCase() }}</div>
                        <div v-if="props.user.HoTenNV">{{ props.user.HoTenNV.split(' ').pop().charAt(0).toUpperCase() }}</div>
                    </div>
                </div>
                <div class="justify-center flex flex-col items-center mt-12 w-fit px-10">
                  <div v-if="props.user.ChucVu && props.user.HoTenNV" class="justify-center flex flex-col items-center">
                    <span class="whitespace-nowrap">{{ props.user.ChucVu}}</span>
                    <span class="text-lg font-medium whitespace-nowrap">{{ props.user.HoTenNV }}</span>
                  </div>
                  <div v-if="props.user.HoLot && props.user.Ten && props.user.email" class="justify-center flex flex-col items-center">
                    <span class="text-lg font-medium whitespace-nowrap">{{ props.user.HoLot + ' ' + props.user.Ten}}</span>
                    <span class="whitespace-nowrap">{{ props.user.email}}</span>
                  </div>
                </div>
                <div  class="flex flex-col mt-3 mb-2 w-full">
                    <button  @click="modify" class="py-2 hover:bg-[#FEF6DF] text-start px-6 whitespace-nowrap">
                        <i class="fa-solid fa-pen-to-square mr-3"></i>
                        Quản lý tài khoản
                    </button>
                    <button @click="signout" class="py-2 hover:bg-[#FEF6DF] text-start px-6 whitespace-nowrap">
                        <i class="fa-solid fa-arrow-right-from-bracket mr-3"></i>
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch  } from 'vue';
import service from '@/services/user_service';
const props = defineProps({
  user: {
    type: Object,
  }
});

const fileImage = ref(null);

const getAvatar = async () => {
  try {
    if (props.user.avatar) {
      const blob = await service.getAvatar(props.user.avatar);
      fileImage.value = URL.createObjectURL(blob);  
    }
  } catch (error) {
    console.log(error);
  }
}

watch(() => props.user, (newUser) => {
  getAvatar();
}, { immediate: true });

const isProfileOpen = ref(false);

const toggleProfile = (event) => {
    event.stopPropagation();
    isProfileOpen.value = !isProfileOpen.value;
};
const closeProfile = (event) => {
    if (!event.target.closest('#user_profile') && isProfileOpen.value) {
        isProfileOpen.value = false;
    }
};
import { useRouter } from 'vue-router';
const router = useRouter();
import { useStore } from 'vuex';
const store = useStore();

const signout = async () => {
  try {
    await store.dispatch('logout');
    router.push({ name: 'home' });
  } catch (error) {
    console.error('Error during logout:', error);
    alert('Có lỗi xảy ra khi đăng xuất');
  }
};

const modify = () => {
  isProfileOpen.value = false;
  router.push({ name: 'manageAccount' });
}

onMounted(() => {
  document.addEventListener('click', closeProfile);
});
onBeforeUnmount(() => {
    document.removeEventListener('click', closeProfile);
});

</script>
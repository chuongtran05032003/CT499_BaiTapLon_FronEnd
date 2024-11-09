<template>
  <div
      class="absolute inset-0 bg-[#FEF6DF] z-30"
      @click="closeForm"
    ></div>
  <div
    ref="formContainer"
    class="bg-white absolute z-30 box-border overflow-y-auto overflow-x-hidden rounded-xl w-fit top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-6 border-2 shadow-md"
    style="scrollbar-gutter: stable; clip-path: inset(0 round 10px);"
  >
    <div class="w-full h-full rounded-xl bg-white">
      <div v-if="isShow" class="rounded-xl w-full h-full bg-white">
        <h2 class="text-xl font-bold mb-6 text-center whitespace-nowrap">Đăng nhập</h2>
        <form @submit.prevent="login" class="space-y-4">
            <div>
                <label for="email" class="block font-medium text-gray-700 whitespace-nowrap">Tên đăng nhập</label>
                <input required  type="text" v-model="email"  id="email" name="email" placeholder="Nhập email đăng nhập"
                    class="mt-1 block w-full px-3 py-2 text-[#aaa] border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
                <label for="pass" class="block font-medium text-gray-700 whitespace-nowrap">Mật Khẩu</label>
                <input required  type="password" v-model="password"  id="pass" name="pass" placeholder="Nhập mật khẩu"
                    class="mt-1 block w-full px-3 py-2 text-[#aaa] border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div class="">
                <button type="submit"
                    class="inline-flex w-full mt-5 justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 whitespace-nowrap">
                    Đăng Nhập
                </button>
                <div class="text-center w-full mt-3">Nếu bạn chưa có tài khoản</div>
                <div @click="toggleShow"
                    class="inline-flex w-full justify-center font-medium  text-indigo-500  whitespace-nowrap cursor-pointer">
                    Đăng Ký
                </div>
                <div @click="closeForm" class="text-center w-full mt-3 text-sm font-light cursor-pointer">Trở lại trang chủ</div>
            </div>
        </form>
      </div>
      <div v-else class="rounded-xl w-full h-full bg-white">
          <h2 class="text-xl font-bold mb-6 text-center whitespace-nowrap ">Đăng Ký</h2>
          <form @submit.prevent="register" class="space-y-4">
            <div class="flex flex-col sm:flex-row sm:space-x-2">
              <div>
                <label for="firstName" class="block font-medium text-gray-700 whitespace-nowrap">Họ & Tên đệm</label>
                <input required type="text" id="firstName" v-model="form.HoLot" placeholder="Nhập họ và tên đệm"
                  class="mt-1 block w-full px-3 py-2 text-[#aaa] border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" >
              </div>
              <div>
                <label for="name" class="block font-medium text-gray-700 whitespace-nowrap">Tên</label>
                <input required type="text" id="name" v-model="form.Ten" placeholder="Nhập tên"
                  class="mt-1 block w-full px-3 py-2 text-[#aaa] border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" >
              </div>
            </div>
            <div>
              <label for="date" class="block font-medium text-gray-700 whitespace-nowrap">Ngày sinh</label>
              <input required type="date" id="date" v-model="form.NgaySinh" placeholder="Nhập ngày sinh"
                class="mt-1 block w-full px-3 py-2 text-[#aaa] border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" >
            </div>
            <div>
              <label for="phone" class="block font-medium text-gray-700 whitespace-nowrap">Số điện thoại</label>
              <input required type="tel" pattern="[0-9]{10}" id="phone" v-model="form.SoDienThoai" placeholder="0123456789"
                class="mt-1 block w-full px-3 py-2 text-[#aaa] border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" >
            </div>

            <div class="sm:flex">
              <label class="block font-medium text-gray-700 whitespace-nowrap mr-5">Giới tính</label>
              <div class="flex items-center">
                <input required type="radio" id="male" value="Nam" v-model="form.Phai" class="mr-2" >
                <label for="male" class="mr-4">Nam</label>

                <input required type="radio" id="female" value="Nữ" v-model="form.Phai" class="mr-2" >
                <label for="female" class="mr-4">Nữ</label>

                <input required type="radio" id="other" value="Khác" v-model="form.Phai" class="mr-2" >
                <label for="other">Khác</label>
              </div>
            </div>
            
            <div>
              <label for="address" class="block font-medium text-gray-700 whitespace-nowrap">Địa chỉ</label>
              <input required type="text" id="address" v-model="form.DiaChi" placeholder="Xã/Phường, Quận/Huyện, Tỉnh/Thành phố"
                class="mt-1 block w-full px-3 py-2 text-[#aaa] border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            </div>

            <div>
              <label for="email" class="block font-medium text-gray-700 whitespace-nowrap">Email</label>
              <input required type="email" id="email" v-model="form.email" placeholder="email@gmail.com"
                class="mt-1 block w-full px-3 py-2 text-[#aaa] border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" >
            </div>
            <div>
              <label for="pass" class="block font-medium text-gray-700 whitespace-nowrap">Mật Khẩu</label>
              <input required type="password" v-model="form.password" id="pass" placeholder="Nhập mật khẩu"
                class="mt-1 block w-full px-3 py-2 text-[#aaa] border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" >
            </div>
            <div class="">
              <button type="submit"
                class="inline-flex w-full mt-5 justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 whitespace-nowrap">
                Đăng Ký
              </button>
              <div class="text-center w-full mt-3">Nếu bạn đã có tài khoản</div>
              <div @click="toggleShow"
                    class="inline-flex w-full justify-center font-medium  text-indigo-500  whitespace-nowrap cursor-pointer">
                    Đăng Nhập
                </div>
                <div @click="closeForm" class="text-center w-full mt-3 text-sm font-light cursor-pointer">Trở lại trang chủ</div>
            </div>
          </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
const formContainer = ref(null);
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';
const toast = useToast();
const store = useStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const props = defineProps({
  action: {
    type: Boolean,
  },
});

const login = async () => {
  try {
    await store.dispatch('login', { username: email.value, password: password.value });
    router.go(-1);
  } catch (error) {
    console.log(error);
    const errorMessage = error.response?.data?.error?.message.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
    toast.error(errorMessage);
  }
};
const form = ref({
  HoLot: '',
  Ten: '',
  NgaySinh: '',
  SoDienThoai: '',
  Phai: '',
  DiaChi: '',
  email: '',
  password: '',
});

const register = async () => {
  try {
    await store.dispatch('register', form.value);
    router.go(-1);
  } catch (error) {
    const errorMessage = error.response?.data?.error?.message?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
    toast.error(errorMessage);
  }
};

const isShow = ref(true);
const toggleShow = () => {
  isShow.value = !isShow.value;
}

const closeForm = () => {
  router.go(-1);
}

function adjustFormPosition() {
  const form = formContainer.value;


  if (form) {
    const Height = window.innerHeight;
    const Width = window.innerWidth;

    const form_padding = parseFloat(window.getComputedStyle(form).padding);

    const maxHeight = Height - 64 - 2*form_padding;
    const maxWidth = Width - 2*form_padding;

    form.style.maxHeight = `${maxHeight}px`;
    form.style.maxWidth = `${maxWidth}px`;
  }
}

watch(
    () => props.action,
    (newAction, oldAction) => {
        if (newAction !== oldAction) {
            isShow.value = props.action;
        }
    },
    { deep: true }
);

onMounted(() => {
  adjustFormPosition();
  isShow.value = props.action;
  window.addEventListener('resize', adjustFormPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustFormPosition);
});
</script>
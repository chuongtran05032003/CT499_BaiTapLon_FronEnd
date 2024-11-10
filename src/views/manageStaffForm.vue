<template>
  <div>
    <div
      class="absolute inset-0 bg-black opacity-50 z-30"
      @click="closeForm"
    ></div>
    <div
    ref="formContainer"
    class="fixed bg-white z-40 box-border overflow-y-auto overflow-x-hidden rounded-xl w-fit top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border-2 shadow-md"
    style="scrollbar-gutter: stable; clip-path: inset(0 round 10px);"
  >
    <div class="w-full h-full rounded-xl bg-white">
      <div class="rounded-xl w-full h-full bg-white">
        <div class="rounded-xl w-full h-full bg-white">
            <h2 class="text-xl font-bold text-center whitespace-nowrap sticky py-6 top-0 bg-white z-30">{{ getTitle(props.action) }}</h2>
            <form @submit.prevent="confirmSave" class="">
              <div class="space-y-4 px-6 pb-5">
                <div v-if="props.action !== 'add'">
                  <label for="msnv" class="block font-medium text-gray-700 whitespace-nowrap">Mã số nhân viên</label>
                  <input
                    type="text"
                    id="msnv"
                    v-model="formData.MSNV"
                    :disabled="true"
                    class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label for="name" class="block font-medium text-gray-700 whitespace-nowrap">Họ và tên</label>
                  <input
                    type="text"
                    id="name"
                    v-model="formData.HoTenNV"
                    :disabled="props.action === 'view'"
                    placeholder="Nhập tên sách"
                    class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 " 
                  />
                </div>
                <div class="sm:flex sm:space-x-2 flex-1">
                  <div class="w-full">
                    <label for="chuc-vu" class="block font-medium text-gray-700 whitespace-nowrap">Chức vụ</label>
                     <select 
                        id="chuc-vu" 
                        v-model="formData.ChucVu" 
                        :disabled="props.action === 'view'"
                        class="mt-1 px-3 py-2 border border-[#aaa] rounded-md block w-full shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
                        <option class="text-sm" value="ThuThu">Thủ thư</option>
                        <option class="text-sm" value="Admin">Admin</option>
                    </select>
                  </div>
                  <div class="w-full">
                    <label for="phone" class="block font-medium text-gray-700 whitespace-nowrap">Số điện thoại</label>
                    <input
                      type="tel"
                      id="phone"
                      v-model="formData.SoDienThoai"
                      :disabled="props.action === 'view'"
                      placeholder="Nhập số điện thoại"
                      class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 " 
                    />
                  </div>
                </div>
                <div>
                  <label for="tac-gia" class="block font-medium text-gray-700 whitespace-nowrap">Địa chỉ</label>
                  <input
                    type="text"
                    id="dia-chi"
                    v-model="formData.DiaChi"
                    :disabled="props.action === 'view'"
                    placeholder="Xã/Phường, Quận/Huyện, Tỉnh/Thành phố"
                    class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 " 
                  />
                </div>
                <div class="sm:flex sm:space-x-2" v-if="props.action !== 'view'">
                  <div>
                    <label for="pass1" class="block font-medium text-gray-700 whitespace-nowrap">Mật khẩu</label>
                    <input
                      type="password"
                      id="pass1"
                      v-model="Password"
                      placeholder="Nhập mật khẩu"
                      class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 " 
                    />
                  </div>
                  <div>
                    <label for="pass2" class="block font-medium text-gray-700 whitespace-nowrap">Nhập lại mật khẩu</label>
                    <input
                      type="password"
                      id="pass2"
                      v-model="Password2"
                      placeholder="Nhập lại mật khẩu"
                      class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 " 
                    />
                  </div>
                </div>
              </div>
              <div class="flex justify-end space-x-2 p-6 sticky bottom-0 bg-white z-30">
                <button type="button" @click="closeForm" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 whitespace-nowrap">
                  {{ props.action === 'view' ? 'Thoát' : 'Hủy' }}
                </button>
                <button v-if="props.action !== 'view'" type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 whitespace-nowrap">
                  Xác Nhận
                </button>
              </div>
            </form>
        </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import service from '@/services/staff_service';
import Swal from 'sweetalert2';
const formContainer = ref(null);
import eventBus from '../eventBus';
import { useRouter } from 'vue-router';
const router = useRouter();
import { useToast } from 'vue-toastification';

const toast = useToast();



const props = defineProps({
  action: {
    type: String,
  },
  id: {
    type: String,
  },
});


const showPopup = ref(false);

const getTitle = (action) => {
  switch (action) {
    case 'add':
      return 'Thêm Tài Khoản';
    case 'update':
      return 'Cập Tài Khoản';
    case 'view':
      return 'Chi tiết Tài Khoản';
    default:
      return 'Hành động không xác định';
  }
};

const closeForm = () => {
    router.go(-1);
};


const confirmSave = async () => {
  const result = await Swal.fire({
    title: 'Xác nhận lưu?',
    text: "Bạn có chắc muốn lưu các thay đổi này?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Lưu',
    cancelButtonText: 'Hủy',
  });

  if (result.isConfirmed) {
    await save();
  }
};

const save = async () => {
  try {
    if (Password.value !== Password2.value) {
      toast.error('Mật khẩu nhập lại không khớp');
      return;
    } else {
      if (props.action === 'add') {
        formData.value.Password = Password.value;
        const response = await service.create(formData.value);
        eventBus.emit('reload');
        toast.success(response.message);
        router.go(-1);
      }
      if (props.action === 'update') {
        if (Password.value) {
          formData.value.Password = Password.value;
        } else {
          delete formData.value.Password;
        }
        const response = await service.update(props.id, formData.value);
        eventBus.emit('reload');
        toast.success(response.message);
        router.go(-1);
      }
    }
  } catch (error) {
    console.log(error)
    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
    toast.error(errorMessage);
  }
};



function adjustFormPosition() {
  const form = formContainer.value;
  if (form) {
    const Height = window.innerHeight;
    const Width = window.innerWidth;

    const maxHeight = Height - 48;
    const maxWidth = Width - 48;

    form.style.maxHeight = `${maxHeight}px`;
    form.style.maxWidth = `${maxWidth}px`;
  }
}

const formData = ref({
  MSNV: '',
  HoTenNV: '',
  SoDienThoai: '',
  ChucVu: 'ThuThu',
  DiaChi: '',
});
const Password = ref('');
const Password2 = ref('');

onMounted(async () => {
  adjustFormPosition();
  window.addEventListener('resize', adjustFormPosition);
  if (props.action !== 'add') {
    try {
      const response = await service.get(props.id);
      formData.value = { ...response };

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
    toast.error(errorMessage);
    }
  }
});


onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustFormPosition);
});

</script>
<style>
.vs__dropdown-toggle {
  padding: 0;
  border: 1px solid #aaa;
  border-radius: 6px;
}
.vs__search, .vs__search:focus {
  margin: 0;
  padding: 8px 12px;
}

</style>

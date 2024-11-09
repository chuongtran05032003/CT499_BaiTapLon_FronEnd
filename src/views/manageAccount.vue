<template>
<router-view />
 <div
    class="flex-1 rounded-xl bg-white flex flex-col overflow-hidden relative py-5 pl-5">
    <div class="h-fit w-full mb-5 items-center ">
        <h3 class="font-bold text-lg whitespace-nowrap ">Tùy chỉnh hồ sơ</h3>
    </div>
    <div v-if="userData" class="flex-1 overflow-y-auto flex flex-col md:flex-row pr-5" style="scrollbar-gutter: stable;">
      <div class="h-full w-full md:w-1/2 flex justify-center items-center min-w-fit pb-5 md:pb-0">
            <div class="h-64 w-64 rounded-full overflow-hidden relative">
              <img v-if="data.avatar || fileImage" :src="fileImage" alt=""
                class="rounded-full object-cover">
              <div v-else class="flex justify-center items-center text-7xl font-bold bg-[#FFD573] w-full h-full text-white">
                  <div v-if="data.Ten">{{ data.Ten.charAt(0).toUpperCase() }}</div>
                  <div v-if="data.HoTenNV">{{ data.HoTenNV.split(' ').pop().charAt(0).toUpperCase() }}</div>
              </div>
              <div v-if="isModify && !('ChucVu' in userData)" class="absolute bg-black opacity-40 w-full h-full top-0"></div>
              <div v-if="isModify && !('ChucVu' in userData)" @click="openExplorer" class="absolute w-16 h-16 rounded-full bg-slate-100 opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center cursor-pointer">
                <i class="fa-solid fa-file-import text-2xl"></i>
              </div>
              <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="onFileChange">
            </div>
      </div>
      <div v-if="!('ChucVu' in userData)" class="h-full w-full md:w-1/2 space-y-2">
            <div class="flex w-full flex-col sm:flex-row sm:space-x-2">
              <div class="w-full">
                <label for="firstName" class="block font-medium text-gray-700 whitespace-nowrap">Họ & Tên đệm</label>
                <input :disabled="!isModify" type="text" id="firstName" v-model="data.HoLot" 
                  class="mt-1 block w-full px-3 py-2 text-black border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
              </div>
              <div class="w-full">
                <label for="name" class="block font-medium text-gray-700 whitespace-nowrap">Tên</label>
                <input :disabled="!isModify" type="text" id="name" v-model="data.Ten" 
                  class="mt-1 block w-full px-3 py-2 text-black border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
              </div>
            </div>
            <div>
              <label for="id" class="block font-medium text-gray-700 whitespace-nowrap">Mã độc giả</label>
              <input :disabled="true" type="text" id="id" v-model="data.MaDocGia" 
                class="mt-1 block w-full px-3 py-2 text-black border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
            </div>
            <div>
              <label for="date" class="block font-medium text-gray-700 whitespace-nowrap">Ngày sinh</label>
              <input :disabled="!isModify" type="date" id="date" v-model="data.NgaySinh" 
                class="mt-1 block w-full px-3 py-2 text-black border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
            </div>
            <div>
              <label for="phone" class="block font-medium text-gray-700 whitespace-nowrap">Số điện thoại</label>
              <input :disabled="!isModify" type="tel" pattern="[0-9]{10}" id="phone" v-model="data.SoDienThoai" 
                class="mt-1 block w-full px-3 py-2 text-black border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
            </div>

            <div class="sm:flex">
              <label class="block font-medium text-gray-700 whitespace-nowrap mr-5 my-3">Giới tính</label>
              <div class="flex items-center">
                <input :disabled="!isModify" type="radio" id="male" value="Nam" v-model="data.Phai" class="mr-2" required>
                <label for="male" class="mr-4">Nam</label>

                <input :disabled="!isModify" type="radio" id="female" value="Nữ" v-model="data.Phai" class="mr-2" required>
                <label for="female" class="mr-4">Nữ</label>

                <input :disabled="!isModify" type="radio" id="other" value="Khác" v-model="data.Phai" class="mr-2" required>
                <label for="other">Khác</label>
              </div>
            </div>
            
            <div>
              <label for="address" class="block font-medium text-gray-700 whitespace-nowrap">Địa chỉ</label>
              <input :disabled="!isModify" type="text" id="address" v-model="data.DiaChi"
                class="mt-1 block w-full px-3 py-2 text-black border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            </div>

            <div>
              <label for="email" class="block font-medium text-gray-700 whitespace-nowrap">Email</label>
              <input :disabled="true" type="email" id="email" v-model="data.email" 
                class="mt-1 block w-full px-3 py-2 text-black border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
            </div>
      </div>
      <div v-if="('ChucVu' in userData)" class="h-full w-full md:w-1/2  space-y-2">
            <div>
              <label for="hoTen" class="block font-medium text-gray-700 whitespace-nowrap">Họ tên nhân viên</label>
              <input :disabled="!isModify" type="text" id="hoTen" v-model="data.HoTenNV" 
                class="mt-1 block w-full px-3 py-2 text-black border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
            </div>
            <div>
              <label for="id_nv" class="block font-medium text-gray-700 whitespace-nowrap">Mã số nhân viên</label>
              <input :disabled="true" type="text" id="id_nv" v-model="data.MSNV" 
                class="mt-1 block w-full px-3 py-2 text-black border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
            </div>
            <div>
              <label for="cv" class="block font-medium text-gray-700 whitespace-nowrap">Chức vụ</label>
              <input :disabled="!isModify" type="text" id="cv" v-model="data.ChucVu" 
                class="mt-1 block w-full px-3 py-2 text-black border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
            </div>
            <div>
              <label for="phone" class="block font-medium text-gray-700 whitespace-nowrap">Số điện thoại</label>
              <input :disabled="!isModify" type="tel" pattern="[0-9]{10}" id="phone" v-model="data.SoDienThoai" 
                class="mt-1 block w-full px-3 py-2 text-black border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
            </div>
            <div>
              <label for="address" class="block font-medium text-gray-700 whitespace-nowrap">Địa chỉ</label>
              <input :disabled="!isModify" type="text" id="address" v-model="data.DiaChi"
                class="mt-1 block w-full px-3 py-2 text-black border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            </div>
      </div>

      
      <div v-if="!('ChucVu' in userData)">
        <div v-if="isModify" class="absolute w-fit h-fit bottom-10 right-10 rounded-xl flex justify-center items-center space-x-2" >
          <div @click="confirmSave" class="flex items-center w-fit h-fit bg-green-300 rounded-lg cursor-pointer">
            <div class="w-10 h-10 flex justify-center items-center">
              <i class="fa-regular fa-circle-check"></i>
            </div>
          <span class="pr-4">Lưu</span>
          </div>
          <div @click="toggleModify" class="flex items-center w-fit h-fit bg-slate-300 rounded-lg cursor-pointer">
              <div class="w-10 h-10 flex justify-center items-center">
                <i class="fa-solid fa-ban"></i>
              </div>
            <span class="pr-4">Hủy</span>
          </div>
        </div>
        <div v-else class="absolute w-fit h-fit bottom-10 right-10 rounded-xl flex justify-center items-center space-x-2" >
          <div @click="toggleModify" class="flex items-center w-fit h-fit bg-[#FFD573] hover:bg-[#FEF6DF] rounded-lg cursor-pointer">
            <span class="pl-4">Chỉnh sửa</span>
            <div class="w-10 h-10 flex justify-center items-center">
              <i class="fa-regular fa-pen-to-square"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import service from '@/services/user_service';
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
import Swal from 'sweetalert2';
const toast = useToast();
import { useStore } from 'vuex';
const store = useStore();
const userData = computed(() => store.getters.userData);

const fileInput = ref(null);
const openExplorer = () => {
  fileInput.value.click();
};

const file = ref(null);
const fileImage = ref(null);

const onFileChange = (event) => {
  file.value = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = (e) => {
    fileImage.value = e.target.result;
  };
  
  if (file.value) {
    reader.readAsDataURL(file.value);
  }
};

const data = ref({
  HoLot: '',
  HoTenNV: '',
  Ten: '',
  NgaySinh: '',
  SoDienThoai: '',
  Phai: '',
  DiaChi: '',
  email: '',
  ChucVu: '',
  MaDocGia: '',
  MSNV: '',
  avatar: '',
});

const originalData = ref({});

const loadData = async () => {
    data.value.SoDienThoai = userData.value.SoDienThoai;
    data.value.DiaChi = userData.value.DiaChi;

    if (userData.value.ChucVu) {
        data.value.HoTenNV = userData.value.HoTenNV;
        data.value.MSNV = userData.value.MSNV;
        data.value.ChucVu = userData.value.ChucVu;
    }
    if (!userData.value.ChucVu) {
      data.value.HoLot = userData.value.HoLot;
      data.value.Ten = userData.value.Ten;
      data.value.email = userData.value.email;
      data.value.MaDocGia = userData.value.MaDocGia;
      data.value.NgaySinh = userData.value.NgaySinh.split("T")[0];
      data.value.Phai = userData.value.Phai;
      data.value.avatar = userData.value.avatar;
  }
  originalData.value = JSON.parse(JSON.stringify(data.value));
  await getAvatar();
}

const isModify = ref(false);
const toggleModify = () => {
  if (isModify.value) {
        data.value = JSON.parse(JSON.stringify(originalData.value));
    }
    isModify.value = !isModify.value;
}

const getAvatar = async () => {
  try {
    if (data.value.avatar) {
      const blob = await service.getAvatar(data.value.avatar);
      if (fileImage.value) {
        URL.revokeObjectURL(fileImage.value); 
      }
      fileImage.value = URL.createObjectURL(blob);
    }  
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
    toast.error(errorMessage);
  }
}

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
    isModify.value = !isModify.value;
  }
};

const filterEmptyFields = (data) => {
  return Object.fromEntries(
    Object.entries(data).filter(([key, value]) => value !== null && value !== "")
  );
};

const save = async () => {
  try {
    const formData = new FormData();
    
    const filteredData = filterEmptyFields(data.value);
    for (const key in filteredData) {
      formData.append(key, filteredData[key]);
    }
    
    if (file.value) {
      formData.append('file', file.value);
    }
    const response = await service.update(userData.value._id, formData);
    await store.dispatch('checkLoggedIn');
    toast.success(response.message);
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
    toast.error(errorMessage);
  }
};

onMounted(() => {
  loadData();
});

</script>
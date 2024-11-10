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
                  <label for="ma-sach" class="block font-medium text-gray-700 whitespace-nowrap">Mã sách</label>
                  <input
                    type="text"
                    id="ma-sach"
                    v-model="formData.MaSach"
                    :disabled="true"
                    class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label for="ten-sach" class="block font-medium text-gray-700 whitespace-nowrap">Tên sách</label>
                  <input
                  :disabled="props.action === 'view'"
                    required
                    type="text"
                    id="ten-sach"
                    v-model="formData.TenSach"
                    placeholder="Nhập tên sách"
                    class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 " 
                  />
                </div>
                <div>
                  <label for="bia-sach" class="block font-medium text-gray-700 whitespace-nowrap">Bìa sách</label>
                  <div class="w-full h-11 border border-[#aaa] rounded-md flex">
                    <div class="w-fit h-full px-4 border rounded-md flex justify-center items-center relative cursor-pointer" 
                      @mouseover="showPopup = true" @mouseleave="showPopup = false" 
                      :class="{'text-green-400': showPopup}">
                      <i class="fa-solid fa-eye" ></i>
                      <div v-if="showPopup" class="w-56 h-fit absolute bg-black left-full top-0 z-40 border shadow-lg overflow-hidden rounded-md">
                        <img :src="imageUrl" alt="" class="object-contain">
                      </div>
                    </div>
                    <div class="flex-1 h-full  flex items-center pl-3" :disabled="true">
                      {{ fileName }}
                    </div>
                    <div class="w-fit h-full px-4 border rounded-md flex justify-center items-center cursor-pointer hover:text-green-400" @click="triggerFileInput">
                      <i v-if="props.action === 'add'" class="fa-solid fa-plus text-sm"></i>
                      <i v-else class="fa-solid fa-pen-to-square"></i>
                      <input
                        type="file"
                        @change="onFileChange"
                        accept="image/*"
                        id="bia-sach"
                        class="hidden"
                        ref="fileInput"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label for="tac-gia" class="block font-medium text-gray-700 whitespace-nowrap">Tác giả</label>
                  <input
                  :disabled="props.action === 'view'"
                  required
                    type="text"
                    id="dia-chi"
                    v-model="formData.TacGia"
                    placeholder="Nhập tên tác giả"
                    class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 " 
                  />
                </div>
                <div>
                  <label class="block font-medium text-gray-700 whitespace-nowrap">Thể Loại</label>
                  <v-select 
                  :disabled="props.action === 'view'"
                  required
                  class="block w-full border-[#aaa] rounded-md shadow-sm"
                  v-model="formData.TheLoai"
                  :options="DSTheLoai"
                  placeholder="Chọn thể loại"
                  />
                </div>
                <div>
                  <label class="block font-medium text-gray-700 whitespace-nowrap">Nhà xuất bản</label>
                  <v-select 
                  :disabled="props.action === 'view'"
                  required
                  class="block w-full border-[#aaa] rounded-md shadow-sm"
                  v-model="formData.NXB"
                  :options="DSNXB"
                  placeholder="Chọn nhà xuất bản"
                  />
                </div>
                <div class="flex flex-col sm:flex-row sm:space-x-2">
                  <div>
                    <label for="nam-xuat-ban" class="block font-medium text-gray-700 whitespace-nowrap">Năm xuất bản</label>
                    <input :disabled="props.action === 'view'" required type="number" id="nam-xuat-ban" v-model="formData.NamXuatBan"
                    placeholder="Nhập năm xuất bản"
                    class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  </div>
                  <div>
                    <label for="don-gia" class="block font-medium text-gray-700 whitespace-nowrap">Đơn giá</label>
                    <input :disabled="props.action === 'view'" required type="number" id="don-gia" v-model="formData.DonGia"
                    placeholder="Nhập đơn giá"
                    class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  </div>
                  <div>
                    <label for="so-luong" class="block font-medium text-gray-700 whitespace-nowrap">Số lượng</label>
                    <input :disabled="props.action === 'view'" required type="number" id="so-luong" v-model="formData.SoLuong"
                    placeholder="Nhập số lượng"
                    class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  </div>
                  <div v-if="props.action !== 'add'">
                    <label for="so-luong" class="block font-medium text-gray-700 whitespace-nowrap">Số lượng hiện tại</label>
                    <input :disabled="true" type="number" id="so-luong" v-model="formData.SoLuongHienTai"
                    placeholder="Nhập số lượng"
                    class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  </div>
                </div>
              </div>
              <div class="flex justify-end space-x-1 p-6 sticky bottom-0 bg-white z-30">
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
import { ref, onMounted, onBeforeUnmount} from 'vue';
import book_service from '@/services/book_service';
import category_service from '@/services/category_service';
import publisher_service from '@/services/publisher_service';
const formContainer = ref(null);
import eventBus from '../eventBus';
import { useRouter } from 'vue-router';
const router = useRouter();
import { useToast } from 'vue-toastification';
import Swal from 'sweetalert2';
const toast = useToast();

const formData = ref({});

const props = defineProps({
  action: {
    type: String,
  },
  id: {
    type: Object,
  },
});


const showPopup = ref(false);

const getTitle = (action) => {
  switch (action) {
    case 'add':
      return 'Thêm Sách';
    case 'update':
      return 'Cập Nhật Sách';
    case 'view':
      return 'Chi tiết Sách';
    default:
      return 'Hành động không xác định';
  }
};


const DSTheLoai = ref([]);
const DSNXB = ref([]);

async function loadCategories() {
  try {
    const response = await category_service.getAll();
    DSTheLoai.value = Array.isArray(response) 
      ? response.map(c => ({ label: c.TenMucSach, value: c._id }))
      : response && typeof response === 'object'
        ? [{ label: response.TenMucSach, value: response._id }]
        : [];
  } catch (error) {
    console.error("Error loading categories:", error);
    alert('Có lỗi xảy ra khi tải thể loại.');
  }
}

async function loadPublishers() {
  try {
    const response = await publisher_service.getAll();
    DSNXB.value = Array.isArray(response) 
      ? response.map(p => ({ label: p.TenNXB, value: p._id }))
      : response && typeof response === 'object'
        ? [{ label: response.TenNXB, value: response._id }]
        : [];
  } catch (error) {
    console.error("Error loading publishers:", error);
    alert('Có lỗi xảy ra khi tải nhà xuất bản.');
  }
}


const imageUrl = ref(null);
const fileName = ref('');
const getImg = async () => {
  const blob = await book_service.getImg(formData.value.BiaSach);
  imageUrl.value = URL.createObjectURL(blob);
  fileName.value = await book_service.getImgName(formData.value.BiaSach);
}



const closeForm = () => {
    router.go(-1);
};

const fileInput = ref(null);
const triggerFileInput = () => {
  fileInput.value.click();
};

const onFileChange = (event) => {
  formData.value.BiaSach = event.target.files[0];
  if (formData.value.BiaSach) {
    fileName.value = formData.value.BiaSach.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
    };
    reader.readAsDataURL(formData.value.BiaSach);
  }
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
    const data = new FormData();
    data.append('file', formData.value.BiaSach);
    data.append('TenSach', formData.value.TenSach);
    data.append('TacGia', formData.value.TacGia);
    data.append('TheLoai', formData.value.TheLoai.value);
    data.append('NXB', formData.value.NXB.value);
    data.append('NamXuatBan', formData.value.NamXuatBan);
    data.append('SoLuong', formData.value.SoLuong);
    data.append('DonGia', formData.value.DonGia);

    if (props.action === 'add') {
      const response = await book_service.create(data);
      eventBus.emit('reload');
      toast.success(response.message);
      router.go(-1);
    } else if (props.action === 'update') {
      const response = await book_service.update(props.id, data);
      eventBus.emit('reload');
      toast.success(response.message);
      router.go(-1);
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


onMounted(async () => {
  adjustFormPosition();
  window.addEventListener('resize', adjustFormPosition);
  if (props.action !== 'add') {
    try {
      const response = await book_service.get(props.id);
      formData.value = { ...response };
      formData.value.TheLoai = {
        label: response.TheLoai.TenMucSach, 
        value: response.TheLoai._id 
      };

      formData.value.NXB = {
        label: response.NXB.TenNXB,
        value: response.NXB._id
      };
      getImg();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
    toast.error(errorMessage);
    }
  } else {
    formData.value = {
      TenSach: '',
      TacGia: '',
      TheLoai: '',
      NXB: '',
      NamXuatBan: null,
      SoLuong: null,
      DonGia: null,
      BiaSach: null,
    };
  }
  await Promise.all([loadCategories(), loadPublishers()]);
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
.v-select .vs__dropdown-menu {
    max-height: 180px;
    overflow-y: auto;  
}
</style>

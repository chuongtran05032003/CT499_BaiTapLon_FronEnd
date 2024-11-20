<template>
  <div>
    <div
      class="absolute inset-0 bg-black opacity-50 z-30"
      @click="closeForm"
    ></div>
    <div
    ref="formContainer"
    class="fixed bg-white z-40 box-border overflow-y-auto overflow-x-hidden rounded-xl w-fit top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-6 border-2 shadow-md"
    style="scrollbar-gutter: stable; clip-path: inset(0 round 10px);"
  >
    <div class="w-full h-full rounded-xl bg-white">
      <div class="rounded-xl w-full h-full bg-white">
        <div class="rounded-xl w-full h-full bg-white ">
            <h2 class="text-xl font-bold mb-6 text-center whitespace-nowrap">{{ getTitle(props.action) }}</h2>
            <form @submit.prevent="confirmSave" class="space-y-4" >
              <div class="sm:flex sm:space-x-2 w-full">
                <div v-if="formData.MSNV !== null && props.action !== 'add'" class="w-full">
                  <label for="MSNV" class="block font-medium text-gray-700 whitespace-nowrap">Mã số nhân viên</label>
                  <input
                    type="text"
                    id="MSNV" required
                    v-model="formData.MSNV"
                    :disabled="true"
                    class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div class="w-full">
                  <label for="MaDocGia" class="block font-medium text-gray-700 whitespace-nowrap">Mã độc giả</label>
                  <input
                    type="text"
                    id="MaDocGia" required
                    v-model="formData.MaDocGia"
                    :disabled="props.action !== 'add'"
                    placeholder="Nhập mã độc giả"
                    class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div class="w-full">
                  <label for="maSach" class="block font-medium text-gray-700 whitespace-nowrap">Mã sách</label>
                  <input
                    type="text"
                    id="maSach"
                    v-model="formData.MaSach" required
                    :disabled="props.action !== 'add'"
                    placeholder="Nhập mã sách"
                    class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 " 
                  />
                </div>
              </div>
              <div class="sm:flex sm:space-x-2 w-full">
                <div>
                  <label for="ngayMuon" class="block font-medium text-gray-700 whitespace-nowrap">Ngày mượn</label>
                  <input
                    type="date" required
                    id="ngayMuon"
                    v-model="formData.NgayMuon"
                    :disabled="props.action !== 'add'"
                    class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 " 
                  />
                </div>
                <div v-if="props.action !== 'add'">
                  <label for="ngayTra" class="block font-medium text-gray-700 whitespace-nowrap">Ngày trả</label>
                  <input
                    type="date"
                    id="ngayTra"
                    required
                    v-model="formData.NgayTra"
                    :disabled="props.action === 'view'"
                    class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 " 
                  />
                </div>
                <div class="w-full min-w-40">
                  <label for="status" class="block font-medium text-gray-700 whitespace-nowrap">Trạng thái</label>
                  <div class="flex w-full items-center relative">
                    <select  required :disabled="props.action === 'view'" v-model="formData.TrangThai" class="block w-full rounded-md border mt-1 border-[#aaa] py-2 pl-4 pr-10 appearance-none">
                        <option class="text-sm" value="DangKy">Đăng ký</option>
                        <option class="text-sm" value="Muon">Mượn</option>
                        <option class="text-sm" value="Tra">Trả</option>
                        <option class="text-sm" value="QuaHan">Quá hạn</option>
                    </select>
                    <span class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 10l5 5 5-5" />
                        </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex justify-end space-x-1">
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
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import staff_service from '@/services/staff_service';
import user_service from '@/services/user_service';
import book_service from '@/services/book_service';
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
    type: String,
  },
});




const getTitle = (action) => {
  switch (action) {
    case 'add':
      return 'Thêm phiếu mượn sách';
    case 'update':
      return 'Cập nhật phiếu mượn sách';
    case 'view':
      return 'Chi tiết phiếu mượn sách';
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
import { useStore } from 'vuex';
const store = useStore();

const userData = computed(() => store.getters.userData);

const save = async () => {
  try {

    const docGia = await user_service.getVerify(formData.value.MaDocGia);
    const bookArray = await book_service.getOne(formData.value.MaSach);
    const book = bookArray[0];

    if (formData.value.TrangThai === 'QuaHan') {
      formData.value.TrangThai = 'Muon';
    }
    const data = {
      ID_DocGia: docGia,
      ID_Sach: book._id,
      NgayMuon: formData.value.NgayMuon,
      TrangThai: formData.value.TrangThai,
      NgayTra: formData.value.NgayTra,
      ID_NV: userData.value._id,
    };

    if (props.action === 'add') {
      const response = await user_service.borrow(data);
      eventBus.emit('reload');
      toast.success(response.message);
      router.go(-1);
    }
    else if (props.action === 'update') {
      const response = await staff_service.updateBorrow(props.id, formData.value); 
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

    const form_padding = parseFloat(window.getComputedStyle(form).padding);

    const maxHeight = Height - 2*form_padding;
    const maxWidth = Width - 2*form_padding;

    form.style.maxHeight = `${maxHeight}px`;
    form.style.maxWidth = `${maxWidth}px`;
  }
}

onMounted(async () => {
  adjustFormPosition();
  window.addEventListener('resize', adjustFormPosition);
  if (props.action !== 'add') {
    try {
      const response = await user_service.getBorrowLogByID(props.id);
      response.NgayMuon = new Date(response.NgayMuon).toISOString().slice(0, 10);
      if (response.NgayTra) {
        response.NgayTra = new Date(response.NgayTra).toISOString().slice(0, 10);
      }
      formData.value = { ...response };
      const currentDate = new Date();
      const ngayMuon = new Date(formData.value.NgayMuon);
      const expiryDate = new Date(ngayMuon);
      expiryDate.setDate(ngayMuon.getDate() + 7);
      if (currentDate > expiryDate) {
          formData.value.TrangThai = 'QuaHan';
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
      toast.error(errorMessage);
    }
    console.log(formData.value);
  } else {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    formData.value = {
      MaDocGia: '',
      NgayMuon: formattedDate,
      MaSach: '',
      NgayTra: '',
      TrangThai: 'DangKy',
    };
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

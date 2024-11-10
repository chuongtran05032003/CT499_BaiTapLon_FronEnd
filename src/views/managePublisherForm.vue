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
              <div v-if="props.action !== 'add'">
                <label for="ma-nxb" class="block font-medium text-gray-700 whitespace-nowrap">Mã NXB</label>
                <input
                  type="text"
                  id="ma-nxb"
                  v-model="formData.MaNXB"
                  :disabled="true"
                  placeholder="Nhập mã nhà xuất bản"
                  class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label for="ten-nxb" class="block font-medium text-gray-700 whitespace-nowrap">Tên NXB</label>
                <input
                  type="text"
                  id="ten-nxb"
                  v-model="formData.TenNXB"
                  :disabled="props.action === 'view'"
                  placeholder="Nhập tên nhà xuất bản"
                  class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 " 
                />
              </div>
              <div>
                <label for="dia-chi" class="block font-medium text-gray-700 whitespace-nowrap">Địa Chỉ</label>
                <input
                  type="text"
                  id="dia-chi"
                  v-model="formData.DiaChi"
                  :disabled="props.action === 'view'"
                   placeholder="Xã/Phường, Quận/Huyện, Tỉnh/Thành phố"
                  class="mt-1 block w-full px-3 py-2  border border-[#aaa] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 " 
                />
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import service from '@/services/publisher_service';
const formContainer = ref(null);
import eventBus from '../eventBus';
import { useRouter } from 'vue-router';
const router = useRouter();
import { useToast } from 'vue-toastification';
const toast = useToast();
const formData = ref({});
import Swal from 'sweetalert2';
const props = defineProps({
  action: {
    type: String,
  },
  id: {
    type: Object,
  },
});




const getTitle = (action) => {
  switch (action) {
    case 'add':
      return 'Thêm Nhà Xuất Bản';
    case 'update':
      return 'Cập nhật Nhà Xuất Bản';
    case 'view':
      return 'Chi tiết Nhà Xuất Bản';
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
    const payload = {
      TenNXB: formData.value.TenNXB,
      DiaChi: formData.value.DiaChi,
    };
    console.log(payload);
    if (props.action === 'add') {
      const response = await service.create(payload);
      eventBus.emit('reload');
      toast.success(response.message);
      router.go(-1);
    } else if (props.action === 'update') {
      const response = await service.update(props.id, payload);
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
      const reponse = await service.get(props.id);
      formData.value = { ...reponse }; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
    toast.error(errorMessage);
    }
  } else {
    formData.value = {
      TenNXB: '',
      DiaChi:'',
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

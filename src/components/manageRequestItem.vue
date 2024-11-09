<template>
    <td class="p-2">
        {{ item?.MaDocGia || 'N/A' }}</td>
    <td class="p-2 ">
        {{ item?.MaSach || 'N/A' }}</td>
    <td class="p-2 ">
        {{ formatDate(item?.NgayMuon) || 'N/A' }}</td>
    <td class="p-2 hidden sm:table-cell">
        {{ formatDate(item?.NgayTra) || 'N/A' }}</td>
    <td class="p-2 flex justify-end">
        <div class="relative inline-block">
            <div @click="toggleDropdown" ref="dropdownButton" class="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-[#FFD573]"
                >
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
            <div 
                :class="{ 'hidden': !isOpenDropButton, 'bottom-full mb-2': showAbove }"
                ref="dropdownMenu" class="absolute bg-white shadow-lg rounded-lg w-40 border mt-2 z-10 right-0" >
                <ul class="py-2">
                    <li @click="edit" class="px-4 py-2 cursor-pointer hover:bg-[#FEF6DF]">Cập nhật</li>
                    <li @click="confirmDelete" class="px-4 py-2 cursor-pointer hover:bg-[#FEF6DF]">Xóa</li>
                    <li @click="view" class="px-4 py-2 cursor-pointer hover:bg-[#FEF6DF]">Chi tiết</li>
                </ul>
            </div>
        </div>
    </td>
</template>
<script setup>
import { ref, onMounted, onBeforeMount, nextTick } from 'vue';
import service from '@/services/staff_service';
import Swal from 'sweetalert2';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import eventBus from '../eventBus';
const router = useRouter();
const toast = useToast();

const props = defineProps({
    item: {
    type: Object,
  },
});

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

const isOpenDropButton = ref(false);
const dropdownButton = ref(null);
const dropdownMenu = ref(null);

const showAbove = ref(false);

const toggleDropdown = async () => {
  isOpenDropButton.value = !isOpenDropButton.value;


  if (isOpenDropButton.value) {
    await nextTick(); 
    const dropdownRect = dropdownMenu.value.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (dropdownRect.bottom > windowHeight) {
      showAbove.value = true;
    }
    
  }
};


const handleClickOutside = (event) => {
  if (isOpenDropButton.value && 
      !dropdownButton.value.contains(event.target) && 
      !dropdownMenu.value.contains(event.target)) {
    isOpenDropButton.value = false;
  }
};

const confirmDelete = async () => {
  const result = await Swal.fire({
    title: 'Xác nhận xóa?',
    text: "Bạn sẽ không thể khôi phục lại điều này!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
  });

  if (result.isConfirmed) {
    const response = await service.deleteBorrow(props.item._id);
    toast.success(response.message);
    eventBus.emit('reload');
  }
};


const view = () => {
    isOpenDropButton.value = false;
    router.push({
      name: 'manageRequestView',
      params: { id: props.item._id },
    });
}

const edit = () => {
    isOpenDropButton.value = false;
    router.push({
      name: 'manageRequestEdit',
      params: { id: props.item._id },
    });
}

onMounted(() => {

  document.addEventListener('click', handleClickOutside);
});


onBeforeMount(() => {
    
    document.removeEventListener('click', handleClickOutside);
});

</script>
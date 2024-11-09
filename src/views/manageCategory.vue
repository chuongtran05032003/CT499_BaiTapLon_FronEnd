<template>
<router-view />
 <div
    class="flex-1 rounded-xl bg-white flex flex-col overflow-hidden relative py-5 pl-5">
    <div class="h-fit w-full  items-center pr-5">
        <h3 class="font-bold text-lg whitespace-nowrap mb-5">Quản lý danh mục sách</h3>
        <div class="flex items-center justify-end h-fit">
            <div
                class="w-full sm:w-1/2 flex justify-end border border-slate-500 focus-within:border-blue-500 rounded-2xl overflow-hidden bg-white">
                <input type="text"
                    class="h-10 flex-1 pl-4 text-sm focus:outline-none"
                    @keydown.enter="handleSearch"
                    v-model="searchInput"
                    @input="toggleClearButton"
                    placeholder="Tìm kiếm mục sách...">
                <div
                    class="flex items-center justify-center w-10 h-10 hover:bg-slate-300 rounded-full bg-white"
                    :class="showClearButton ? 'flex' : 'hidden'"
                    @click="clearSearch">
                    <i class="fa-solid fa-circle-xmark"></i>
                </div>
                <div class="w-10 h-10 bg-white flex items-center justify-center cursor-pointer border-l-2"
                @click="handleSearch">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="flex-1 relative overflow-y-auto mt-10 pr-5" style="scrollbar-gutter: stable;">
        <table class="table-auto w-full">
            <thead>
                    <tr class="text-left sticky top-0 border-b-2 border-x-0 bg-white m-0 z-20">
                        <th class="p-2 w-fit">
                            Mã mục sách</th>
                        <th class="p-2 w-fit">
                            Tên mục sách</th>
                        <th class="p-2 w-16"></th>
                    </tr>
            
            </thead>
            <tbody>
                <tr class="border-y-2 border-x-0 cursor-pointer hover:bg-[#FEF6DF]"
                v-for="(item, index) in List" :key="index">
                    <Item :item="item"/>
                </tr>
            </tbody>
        </table>
        <div v-if="showNotFound" class="text-center py-2 cursor-pointer w-full h-fit  hover:bg-[#FEF6DF]">Không tìm thấy kết quả phù hợp!</div>
        <button @click="getAllList" class="text-left py-2 px-4 rounded-2xl mt-5 text-blue-600 cursor-pointer w-fit h-fit  hover:bg-[#FEF6DF]">Hiển thị tất cả</button>
    </div>

    <div class="absolute w-fit h-fit bottom-6 right-6 rounded-xl flex justify-center items-center space-x-2" >
        <div @click="add" class="flex items-center w-fit h-fit bg-[#FFD573] hover:bg-[#FEF6DF] rounded-lg cursor-pointer">
        <span class="pl-4">Thêm</span>
        <div class="w-10 h-10 flex justify-center items-center">
            <i class="fa-solid fa-plus"></i>
        </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import Item from '@/components/manageCategoryItem.vue';
import service from '@/services/category_service';
import { useRouter } from 'vue-router';
import eventBus from '../eventBus';
const router = useRouter();
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const searchInput = ref('');
const List = ref([]);
const showClearButton = ref(false);
const getAllList = async () => {
    try {
        const response = await service.getAll();
        List.value = response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
    toast.error(errorMessage);
  }
}
const add = () => {
    router.push({ name: 'manageCategoryAdd'});
}
const clearSearch = () => {
    searchInput.value = '';
    showClearButton.value = false;
};
const toggleClearButton = () => {
    if (searchInput.value !== '') {
        showClearButton.value = true;
    } else {
        showClearButton.value = false;
    }
};
const showNotFound = ref(false);

const handleSearch = async () => {
    try {
        if (searchInput.value.trim()) {
            const response = await service.getOne(searchInput.value);
            List.value = response;
        }
    } catch (error) {
        showNotFound.value = true;
    }
};

onMounted(() => {
   eventBus.on('reload', () => {
    if (searchInput.value.trim() === '') {
      getAllList();
    } else {
      handleSearch();
    }
  });
})
onBeforeUnmount(() => {

  eventBus.off('reload');
});
</script>
<template>
<router-view />
 <div
    class="flex-1 rounded-xl bg-white flex flex-col overflow-hidden relative py-5 pl-5">
    <div class="h-fit w-full items-center pr-5">
        <h3 class="font-bold text-lg whitespace-nowrap mb-5">Quản lý yêu cầu</h3>
        <div class="flex items-center justify-end h-fit space-x-2">
            <div class="flex w-fit items-center relative">
                <select v-model="status" class="block w-full rounded-2xl border border-[#aaa] py-2 pl-4 pr-10 appearance-none">
                    <option class="text-sm" value="TatCa">Tất cả</option>
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
            <div
                class="w-full sm:w-1/2 flex justify-end border border-[#aaa] focus-within:border-blue-500 rounded-2xl overflow-hidden bg-white">
                <input type="text"
                    class="h-10 flex-1 pl-4 text-sm focus:outline-none"
                    @keydown.enter="handleSearch"
                    v-model="searchInput"
                    @input="toggleClearButton"
                    placeholder="Tìm kiếm...">
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
                            Mã đọc giả</th>
                        <th class="p-2 w-auto">
                            Mã sách</th>
                        <th class="p-2 w-auto">
                            Ngày mượn</th>
                        <th class="p-2 w-auto">
                            Ngày trả</th>
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
import Item from '@/components/manageRequestItem.vue';
import service from '@/services/user_service';
import { useRouter } from 'vue-router';
import eventBus from '../eventBus';
const router = useRouter();
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useToast } from 'vue-toastification';
const toast = useToast();
const status = ref('TatCa');
const searchInput = ref('');
const List = ref([]);
const showClearButton = ref(false);
const getAllList = async () => {
    try {
        const response = await service.getBorrowLog(status.value);
        List.value = response;
  } catch (error) {
    console.error("Error loading publishers:", error);
    
  }
}
const add = () => {
    router.push({ name: 'manageRequestAdd'});
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
            const response = await service.getBorrowLog(status.value, searchInput.value);
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
<template>
<router-view />
 <div
    class="flex-1 rounded-xl bg-white flex flex-col overflow-hidden relative py-5 pl-5">
    <div class="h-fit w-full items-center ">
        <h3 class="font-bold text-lg whitespace-nowrap ">Lịch sử mượn sách</h3>
    </div>
    <div class="flex-1 relative overflow-y-auto pr-5 mt-5" style="scrollbar-gutter: stable;">
        <div class="flex items-center justify-around overflow-x-auto hidden-scrollbar border-b-2">
            <div
            v-for="status in statuses"
            :key="status.key"
            @click="setActiveStatus(status.key)"
            :class="[
                'w-full flex items-center justify-center cursor-pointer whitespace-nowrap px-5 pt-3 pb-2 hover:bg-slate-200 rounded-t-lg',
                activeStatus === status.key ? 'border-b-4 border-blue-500' : ''
            ]"
            >
            {{ status.value }}
            </div>
        </div>
        <table class="table-auto w-full mt-10">
            <thead>
                    <tr class="text-left sticky top-0 border-b-2 border-x-0 bg-white m-0 z-20">
                        <th class="p-2 w-auto whitespace-nowrap">
                            Mã sách</th>
                        <th class="p-2 w-auto whitespace-nowrap">
                            Tên sách</th>
                        <th class="p-2 w-auto whitespace-nowrap hidden sm:block">
                            Ngày mượn</th>
                        <th class="p-2 w-auto whitespace-nowrap">
                            Hạn trả</th>
                        <th class="p-2 w-auto whitespace-nowrap hidden sm:block">
                            Ngày trả</th>
                    </tr>
            
            </thead>
            <tbody>
                <tr class="border-y-2 border-x-0 cursor-pointer hover:bg-[#FEF6DF]"
                v-for="(item, index) in filteredList" :key="index">
                    <Item :item="item"/>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>
<style scoped>
    .hidden-scrollbar::-webkit-scrollbar{
      display: none;
    }
</style>
<script setup>
import Item from '@/components/manageHistoryItem.vue';
import service from '@/services/user_service';
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
const toast = useToast();


const statuses = [
  { key: 'TatCa', value: 'Tất cả' },
  { key: 'DangKy', value: 'Đăng ký' },
  { key: 'Muon', value: 'Đang mượn' },
  { key: 'Tra', value: 'Đã trả' },
  { key: 'QuaHan', value: 'Quá hạn' },
];

const activeStatus = ref('TatCa'); 


const setActiveStatus = (key) => {
  activeStatus.value = key;
};

const List = ref([]);

const getAllList = async () => {
    try {
        const response = await service.getBorrowLogByID(userData.value._id);
        List.value = response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
    toast.error(errorMessage);
  }
}

import { useStore } from 'vuex';
const store = useStore();

const userData = computed(() => store.getters.userData);

import dayjs from 'dayjs'; 

const filteredList = computed(() => {
    if (List.value.length !== 0) {
        if (activeStatus.value === 'TatCa') return List.value;
        
        if (activeStatus.value === 'QuaHan') {
            const sevenDaysAgo = dayjs().subtract(7, 'day');
            return List.value.filter(item => 
                item.NgayTra === null && 
                dayjs(item.NgayMuon).isBefore(sevenDaysAgo)
            );
        }
        
        return List.value.filter(item => item.TrangThai === activeStatus.value);
    }
    return [];
});



onMounted(() => {
    getAllList();
})

</script>
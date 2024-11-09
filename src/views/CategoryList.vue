<template>
    <div class="w-full overflow-y-auto pr-4 py-5 pl-5 bg-white" style="scrollbar-gutter: stable;">
        <div class="w-full h-fit pb-5 flex">
            <span class="py-2 px-5 rounded-xl font-semibold">Danh mục</span>
        </div>
        <div class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 ">
            <div class="w-full h-20 bg-[#FEF6DF] hover:bg-[#FFD573] rounded-lg overflow-hidden cursor-pointer" 
                v-for="(item, index) in List" :key="index">
                    <Item :item="item"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import Item from '@/components/CategoryItem.vue'
import service from '@/services/category_service';
import { ref, onMounted} from 'vue';

const List = ref([]);

const getAllList = async () => {
    try {
        const response = await service.getAll();
        List.value = response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
    toast.error(errorMessage);
  }
}

onMounted(() => {
    getAllList();
})
</script>
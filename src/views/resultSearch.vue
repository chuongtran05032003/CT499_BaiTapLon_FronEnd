<template>
<div
    class="flex-1 rounded-xl flex flex-col overflow-hidden relative pl-5 bg-white">
    <div v-if="categoryName !== ''" class="w-full h-fit pb-5 flex">
        <span class="py-2 px-5 rounded-xl font-semibold hover:bg-[#FEF6DF] cursor-pointer" @click="goBack">Danh mục</span>
        <span class="p-2"> > </span>
        <span class="py-2 px-5 rounded-xl font-semibold hover:bg-[#FEF6DF]">{{ categoryName }}</span>
    </div>
    <div v-else class="w-full h-fit pb-5 flex flex-col">
        <div class="flex">
            <span class="p-2" >Kết quả tìm kiếm của: </span>
            <span class="p-2">{{ route.query.searchQuery }}</span>
        </div>
        <div v-if="notfound === true">
            <span class="p-2 text-lg" >Không có kết quả trùng khớp với yêu cầu!</span>
        </div>
    </div>
    <div class="flex-1 overflow-y-auto pr-4" style="scrollbar-gutter: stable;">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div class="flex h-56 w-full mb-2"
                v-for="(item, index) in List" :key="index">
                    <Item :item="item"/>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import service from '@/services/book_service';

import Item from '@/components/BookItem.vue'
import { ref, onMounted, watch  } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
import { useRouter, useRoute } from 'vue-router';
const route = useRoute();
const router = useRouter();
const List = ref([]);

const goBack = () => {
    router.go(-1);
}
const notfound = ref(true);
const searchBook = async (query) => {
    try {
        const response = await service.getOne(query);
        List.value = response;
        categoryName.value = '';
        if (List.value.length === 0) {
            notfound.value = true;
        } else {
            notfound.value = false;
        }
    } catch (error) {
        console.log(error);
        notfound.value = true;
    }
};

const categoryName = ref('');
const getBooks = async (categoryId) => {
    try {
        const response = await service.getBookByCategory(categoryId);
        List.value = response.books;
        categoryName.value = response.categoryName;

    } catch (error) {
        console.error(error);
    }
};

watch(
    () => route.query.searchQuery,
    (newQuery, oldQuery) => {
        if (newQuery !== oldQuery) {
            searchBook(newQuery);
        }
    },
);

onMounted(() => {
    const initialQuery = route.query.searchQuery;
    const categoryId = route.params.id;

    if (initialQuery) {
        searchBook(initialQuery);
    } else if (categoryId) {
        getBooks(categoryId); 
    }
});

</script>
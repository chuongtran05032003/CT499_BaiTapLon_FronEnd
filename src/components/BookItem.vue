<template>
    <div class="w-full h-full relative flex items-end">
        <div class="absolute w-full h-full p-5 flex group cursor-pointer" @click="showDetail">
            <div class="h-full w-fit bg-slate-300 overflow-hidden rounded-md shadow-lg scale-image ">
                <img :src="imageUrl" alt="" class="object-contain h-full w-auto">
            </div>
            <div  class="bg-transparent h-full pl-5 pt-3 space-y-2 flex-1 flex items-end">
                <div class="w-full h-2/3">
                    <div class="book-title text-lg font-semibold"> {{ item.TenSach }}</div>
                    <div class="book-title text-sm"> {{ item.TacGia }}</div>
                </div>
            </div>
        </div>
        <div class="w-full h-4/6 flex justify-end bg-[#FFD573] rounded-xl ">
        </div>
    </div>
</template>
<style scoped>
    .book-title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-wrap: break-word;
    }
    .scale-image {
        transition: transform 0.3s ease;
    }

    .group:hover .scale-image {
        transform: scale(1.1);
    }
</style>
<script setup>
import book_service from '@/services/book_service';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
    item: {
        type: Object,
    },
});

const imageUrl = ref(null);

const getImg = async () => {
    const blob = await book_service.getImg(props.item.BiaSach);
    imageUrl.value = URL.createObjectURL(blob);
};

watch(
    () => props.item,
    (newItem, oldItem) => {
        if (newItem !== oldItem) {
            getImg();
        }
    },
    { deep: true }
);

const showDetail = () => {
    router.push({ name: 'bookDetail', params: { id: props.item._id } });
}
onMounted( async () => {
    getImg();
});

onBeforeUnmount(() => {

});
</script>

<template>
    <div class="w-full h-full flex items-center justify-center text-center p-5" @click="getBooks">
        {{ item.TenMucSach }}
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
    item: {
        type: Object,
    },
});

const getBooks = () => {
  router.push({ 
    name: 'resultSearch', 
    params: { id: props.item._id }
  });
};

</script>

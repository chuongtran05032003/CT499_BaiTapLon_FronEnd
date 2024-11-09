<template>
  <button 
    class="h-12 flex items-center rounded-xl px-4 hover:bg-[#FEF6DF] cursor-pointer w-full mr-1"
    :class="{
      'bg-[#FEF6DF]': isActive
    }"
    
    @click="handleClick"
  >
    <i :class="[iconClass]" class="text-base mr-4"></i>
    <span >{{ text }}</span>
  </button>
</template>

<script setup>
const emit = defineEmits(['button-clicked', 'closeNav']);
const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  route: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

import { useRouter } from 'vue-router';
const router = useRouter();

const handleClick = () => {
  emit('button-clicked', props.route);
  emit('closeNav');
  router.push({ name: props.route });
};
</script>


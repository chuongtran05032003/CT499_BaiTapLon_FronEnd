<!-- MenuItem.vue -->
<template>
  <button
    class="h-12 flex items-center rounded-xl hover:bg-[#FEF6DF] cursor-pointer w-full" 
    :class="{
      'xl:justify-start xl:px-4 xl:h-10': isVisible,
      'justify-center': !isVisible,
      'bg-[#FEF6DF] border-r-4 border-[#FFD573]': isActive 
    }"
    @click="handleClick"
  >
    <i :class="[iconClass, { 'xl:mr-4 text-base': isVisible, 'text-sm': !isVisible}]" class="w-6"></i>
    <span :class="isVisible ? 'block' : 'hidden'">{{ text }}</span>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const emit = defineEmits(['button-clicked']);
const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
  },
  route: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false, 
  },
});

const handleClick = () => {
  emit('button-clicked', props.route);
  router.push({ name: props.route });
};
</script>


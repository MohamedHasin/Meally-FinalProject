<script setup>
const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});


const styles = computed(() => {
  switch (props.status) {
    case "available":
      return "bg-green-100 text-green-800";
    case "booked":
      return "bg-blue-100 text-blue-800";
    case "delivered":
        return "bg-red-100 text-red-800";  
    default:
      return "bg-gray-100 text-gray-800";
  }
});
</script>
<template>
   <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase" :class="styles">{{ props.status }}</span>
</template>
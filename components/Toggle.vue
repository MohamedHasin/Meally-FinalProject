<script setup>
const props = defineProps({
  modelValue: Object | Boolean,
  type: {
    type: String,
    default: "text",
  },
  value: Boolean,
  label: String,
  error: String,
});
</script>

<template>
	<div class="mb-4 flex items-center gap-3">
		<span @click="$emit('update:modelValue', !props.modelValue)" aria-checked="false" class="relative inline-flex items-center justify-center flex-shrink-0 w-10 h-5 cursor-pointer group focus:outline-none" role="checkbox" tabindex="0">
			<!-- On: "bg-indigo-600", Off: "bg-gray-200" -->
			<span :class="{'bg-green-400': props.modelValue}" aria-hidden="true" class="absolute h-4 mx-auto bg-gray-200 rounded-full w-9 transition-colors ease-in-out duration-200"></span>
			<!-- On: "translate-x-5", Off: "translate-x-0" -->
			<span :class="[modelValue ? 'translate-x-5': 'translate-x-0']" aria-hidden="true" class="absolute left-0 inline-block w-5 h-5 bg-white border border-gray-200 rounded-full shadow transform group-focus:shadow-outline group-focus:border-blue-1 transition-transform ease-in-out duration-200"></span>
		</span>
		<label class="block text-sm font-medium text-gray-700" v-if="props.label">
			<span>{{ props.label }}</span>
		</label>
		<div v-if="props.error">
			<p class="mt-2 text-sm text-red-600">{{ props.error }}</p>
		</div>
	</div>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps({
  title: String,
  description: String,
});

const state = reactive({
  active: true,
});
</script>

<template>
	<div>
		<a @click.prevent="state.active = !state.active" class="group flex items-center px-2 py-2 text-sm bg-green-50 leading-6 font-medium text-gray-800 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150 mt-1 cursor-pointer">
			<div class="inline-flex flex-col">
				<span class="text-xl text-gray-700 font-semibold">{{ props.title }}</span>
			  <p class="text-sm text-gray-500 font-normal">{{ props.description }}</p>
			</div>
		

			<svg class="w-6 h-6" fill="none" stroke="currentColor" v-show="state.active" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M5 15l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
			</svg>

			<svg class="w-6 h-6" fill="none" stroke="currentColor" v-show="!state.active" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
			</svg>
		</a>

		<div v-show="state.active">
			<slot></slot>
		</div>
	</div>
</template>

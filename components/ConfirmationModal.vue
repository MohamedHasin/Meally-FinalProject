<script setup>
import { useSlots } from 'vue'
import Modal from "./BaseModal.vue";


const slots = useSlots();

const props = defineProps({
  show: {
    default: false,
  },
  maxWidth: {
    default: "2xl",
  },
  closeable: {
    default: true,
  },
});

const emit = defineEmits(["close"]);

function close() {
  emit("close");
}
</script>

<template>
	<modal :closeable="props.closeable" :max-width="props.maxWidth" :show="props.show" @close="close">
		<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
			<div class="sm:flex sm:items-start">
				<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
					<div class="mt-2">
						<slot name="content"></slot>
					</div>
				</div>
			</div>
		</div>

		<div class="px-6 py-4 bg-gray-100 text-right" v-if="slots.footer">
			<slot name="footer"></slot>
		</div>
	</modal>
</template>

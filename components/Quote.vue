<script setup>
import { useStorage } from "@vueuse/core";
import useQuote from "~~/composables/useQuote";
const { randomQuote } = useQuote();

const show_quote = useStorage("show_quote", true);

function dismissQuote() {
  show_quote.value = false;
}
</script>
<template>
	<confirmation-modal :show="show_quote" @close="dismissQuote">
		<template #content>
			<blockquote class="text-xl italic font-semibold text-gray-900 mt-8">
				<div class="flex items-center justify-between">
					<svg aria-hidden="true" class="w-10 h-10 text-gray-900" fill="none" viewBox="0 0 24 27" xmlns="http://www.w3.org/2000/svg">
						<path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" />
					</svg>

					<button @click="dismissQuote">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
						</svg>
					</button>
				</div>

				<p>"{{ randomQuote }}"</p>
			</blockquote>
		</template>
	</confirmation-modal>
</template>
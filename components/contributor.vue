<script setup>
const client = useSupabaseClient();

const props = defineProps({
    contributor:  Object,
    indexValue: Number,
})

const state = reactive({
    avatar_url: '',
})

const downloadImage = async () => {
  try {

    if(!props.contributor.avatar_url) {
        state.avatar_url = '/placeholder.png'
        return;
    }

    const { data, error } = await client.storage
      .from("avatars")
      .download(props.contributor.avatar_url);
    if (error) throw error;
    state.avatar_url = URL.createObjectURL(data);
  } catch (error) {
    console.error("Error downloading image: ", error.message);
  }
};

onMounted(() => {
  downloadImage();
});
</script>

<template>
	<div class="flex items-center justify-between gap-5 bg-gray-50 p-2 rounded-lg">
		<div class="flex items-center gap-3">
			<div>
				<img :src="state.avatar_url" class="w-10 h-10 rounded-full" />
			</div>
			<div>
				<h4 class="text- font-semibold text-gray-700">{{ props.contributor.full_name ? props.contributor.full_name : 'No name.' }}</h4>
				<p class="text-sm text-gray-600 font-medium">{{ props.contributor.orders.length }} orders</p>
			</div>
		</div>
		<div>
			<span class="inline-flex items-center rounded-lg bg-red-100 px-3 py-0.5 text-xl font-medium text-red-600">{{ props.indexValue + 1 }}</span>
		</div>
	</div>
</template>
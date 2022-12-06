<script setup>
const showAnimation = ref(false);
const show_content = ref(false);

onMounted(() => {
  showAnimation.value = true;
  setTimeout(function () {
    showAnimation.value = false;
    show_content.value = true;
  }, 2000);
});
</script>
<template>
	<div class="bg-white h-screen animate-pulse" v-if="showAnimation">
        <div class="flex items-center justify-center min-h-screen">
            <img class="object-center" src="/icon.png" />
        </div>
		
	</div>

	<AppContainer v-if="show_content">
		<NuxtPage />
	</AppContainer>
	<notifications position="bottom right" />
</template>
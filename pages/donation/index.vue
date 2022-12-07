<script setup>
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

const amount = ref(0);

function donate() {
  if (amount.value < 1) {
    notify({
      title: "Error",
      text: "Please enter a valid amount",
      type: "error",
    });
    return;
  } else {
    notify({
      title: "Success",
      text: `Thank you for donating ${amount.value} RM !`,
      type: "success",
    });
  }
}
</script>
<template>
	<div>
		<div class="bg-primary px-5 py-7">
			<h2 class="text-white text-4xl font-semibold">Donate Us</h2>
			<p class="text-white text-md mt-2 break-words">Support this project by donating to us.</p>
				<span class="logo" style="display: grid;justify-content: left;">
			<img src="/meally.png" alt="logo">
		</span>	
			<div class="mt-5">
				<span class="text-gray-500 font-normal text-xs">Advertisement</span>
				<img class="rounded-lg" src="/ads/3.gif" width="970" />
			</div>
		</div>

		<section class="bg-white rounded-t-lg -my-2 p-4 sm:p-7">
					<div class="howithelps">
						<br>
			<h1 style="font-size:30px;text-align:center;font-family: Gill Sans, sans-serif;font-style:bold; font-weight:700; color:#26b578">How Your Donations Help Us</h1>
			<br>
			<h2 style="font-family: sans-serif;font-weight:300"> • We care about the people and about the country. As such, one of our main objectives is to lessen or put an end to the food wastage problem in Malaysia via food donations. Your bountiful donations will assist in this huge cause.</h2>
			<br>
			<h2 style="font-family: sans-serif;font-weight:300"> • As all the food donations done through the appcost ZERO money from you, we do not generate any primary income through the app. Hence, your generous donations will help to continue the fight against food wastage in Malaysia.</h2>
			<br>
			<h2 style="font-family: sans-serif;font-weight:300"> • Our goal is to expand this project even further and reach all of Malaysia withing the next few years. It will be a massive help if you donate to us in order to make Malaysia a better place with less food wastage with the help of donations. </h2>
			<br>
			<h1 style="font-size:30px;text-align:center;font-family: Gill Sans, sans-serif;font-style:bold; font-weight:700; color:#26b578">How To Donate</h1>
			<br>
			<h2 style="font-family: sans-serif;font-weight:300"> • You can put in any value you would like to donate below and click "Donate Us" button at the bottom. </h2>
			<br>
			<h2 style="font-family: sans-serif;font-weight:300"> • We assure you that the money you donate will be put to good use in order to fight the good fight against food wastage in Malaysia. </h2>
			<br>
			<h2 style="font-family: sans-serif;font-weight:300"> • You can put in any value you would like to donate below and click "Donate Us" button at the bottom. </h2>

		</div>
			<div class="group flex flex-col justify-between rounded-lg bg-white p-8 shadow-xl transition-shadow hover:shadow-lg border my-24">
				<div>
					<div class="inline-flex items-center gap-2 w-full">
						<p class="text-sm font-medium uppercase tracking-widest text-gray-500">RM</p>
						<label class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600" for="donate">
							<input class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" id="donate" placeholder="Donation Amount" required type="number" v-model="amount" />

							<span class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">Donation Amount</span>
						</label>
					</div>

					<div class="mt-4 border-t-2 border-indigo-100 pt-2"></div>
				</div>

				<button @click.prevent="donate" class="mt-5 inline-flex items-center text-primary">
					<p class="text-lg font-medium">Donate Us</p>

					<svg class="ml-3 h-6 w-6 transform transition-transform group-hover:translate-x-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M17 8l4 4m0 0l-4 4m4-4H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
					</svg>
				</button>
			</div>
		</section>
	</div>
</template>
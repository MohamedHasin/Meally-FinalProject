<script setup>
import { onMounted, computed } from "vue";
import moment from "moment";
import Fuse from "fuse.js";

const client = useSupabaseClient();
const user = useSupabaseUser();

definePageMeta({
  middleware: "auth",
});

const state = reactive({
  donations: [],
  searchQuery: "",
  fuse: null,
});

const searchResults = computed(() => {
  if (state.searchQuery && state.donations.length > 0) {
    const results = new Fuse(JSON.parse(JSON.stringify(state.donations)), {
      keys: [
        "name",
        "food_types.name",
        "locations.address",
        "locations.city",
        "locations.state",
		"no_plates",
      ],
      threshold: 0.3,
    }).search(state.searchQuery);

    return results.map((result) => result.item);
  }
  return state.donations;
});

const getAllDonations = async () => {
  const { data } = await client
    .from("foods")
    .select(
      `id, name, pick_up_instructions, created_at, no_plates, image_url, user_id, created_at, expiry_till_date, food_types(id,name), locations(id,address, city, state, lat, long)`
    )
    .order("created_at");
  state.donations = data;
};

const bookADonation = async (donation) => {
  try {
    const { data, error } = await client.from("orders").insert([
      {
        receiver_id: user.id,
        donator_id: donation.user_id,
        food_id: donation.id,
        status: "pending",
      },
    ]);

    if (error) throw error;

    notify({
      title: "Success",
      text: "Donation booked successfully",
      type: "success",
    });
  } catch (error) {
    notify({
      title: "Error",
      text: error.message,
      type: "error",
    });
  }
};

function donationBooked(donation) {
  getAllDonations();
}

function searchFilter(filter) {
  state.searchQuery = filter;
}
onBeforeMount(() => {
  getAllDonations();
});
</script>
<template>
	<div>
		
		<div class="bg-primary px-5 py-7">
			<span class="logo" style="display: grid;justify-content: right;">
			<img src="/logo_b_4.png" alt="logo" style="margin-left:405px; margin-bottom:0px; margin-top:-20px; height: 70px; width: 70px;">
			</span>
			<h2 class="text-white text-4xl font-semibold">Explore</h2>
			<p class="text-white text-md">All the donations made by our users.</p>	

			<div class="mt-2">
				<span class="text-gray-500 font-normal text-xs">Advertisement</span>
				<img class="rounded-lg" src="/4.png" width="970" />
			</div>
		</div>

		<section class="bg-white rounded-t-lg -my-5 pb-32">
			<div class="mt-3 mx-5 overflow-y-scroll space-y-3 pt-5 scrollbar-hide">
				<div>
					<label class="block text-sm font-medium text-gray-700">Food categories</label>
					<select @change="searchFilter($event.target.value)" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm">
						<option selected>Not Selected</option>
						<option>Cooked</option>
						<option>Uncooked</option>
						<option>Fruits & Vegetables</option>
						<option value>Other Food Related Items</option>
					</select>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700">Cities</label>
					<select @change="searchFilter($event.target.value)" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm">
						<option selected>Not Selected</option>
						<option>Klang (KLG)</option>
						<option>Kuala Lumpur (KL)</option>
						<option>Petaling Jaya (PJ)</option>
						<option>Puchong (PCG)</option>
						<option>Shah Alam (SA)</option>
						<option>Subang Jaya (SJ)</option>
					</select>
				</div>
				<!-- <ul class="flex border-b border-gray-200 text-center space-x-2">
					<li>
						<button @click="searchFilter('cooked')" class="bg-gray-100 p-4 text-sm font-medium text-gray-500 ring-1 ring-inset ring-white">
							<span class="absolute inset-x-0 -bottom-px h-px w-full bg-white"></span>
							<span class="flex items-center gap-2 text-sm" :class="{'text-primary': state.searchQuery === 'cooked'}">
								<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 14.25C16.0041 14.25 19.25 11.2018 19.25 7.75H4.75C4.75 11.2018 7.99594 14.25 12 14.25Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
									<path d="M9 4.75V5.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
									<path d="M12 4.75V5.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
									<path d="M15 4.75V5.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
									<path d="M14.75 14L17.25 19.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
									<path d="M8.75 17.75H16.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
									<path d="M9 14L7.75 16.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
									<path d="M8.25 18C8.25 18.6904 7.69036 19.25 7 19.25C6.30964 19.25 5.75 18.6904 5.75 18C5.75 17.3096 6.30964 16.75 7 16.75C7.69036 16.75 8.25 17.3096 8.25 18Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
								</svg>
								Cooked
							</span>
						</button>
					</li>

					<li>
						<button @click="searchFilter('uncooked')" class="bg-gray-100 p-4 text-sm font-medium text-gray-500 ring-1 ring-inset ring-white">
							<span class="flex items-center gap-2 text-sm" :class="{'text-primary': state.searchQuery === 'uncooked'}">
								<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.75 7V6.75C9.75 5.64543 10.6454 4.75 11.75 4.75H12.25C13.3546 4.75 14.25 5.64543 14.25 6.75V7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
									<path d="M5.75 13V18C5.75 18.6904 6.30964 19.25 7 19.25H17C17.6904 19.25 18.25 18.6904 18.25 18V13C18.25 9.54822 15.4518 6.75 12 6.75C8.54822 6.75 5.75 9.54822 5.75 13Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
									<path d="M9.75 14.25H14.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
								</svg>
								UnCooked
							</span>
						</button>
					</li>

					<li>
						<button @click="searchFilter('subang jaya')" class="bg-gray-100 p-4 text-sm font-medium text-gray-500 ring-1 ring-inset ring-white">
							<span class="flex items-center gap-2 text-sm" :class="{'text-primary': state.searchQuery === 'subang jaya'}">
								<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M10 14L12.75 19.25L19.25 4.75L4.75 11.75L10 14Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
								</svg>
								SJ
							</span>
						</button>
					</li>

					<li>
						<button @click="searchFilter('kuala lumpur')" class="bg-gray-100 p-4 text-sm font-medium text-gray-500 ring-1 ring-inset ring-white">
							<span class="flex items-center gap-2 text-sm" :class="{'text-primary': state.searchQuery === 'kuala lumpur'}">
								<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.75 7V6.75C9.75 5.64543 10.6454 4.75 11.75 4.75H12.25C13.3546 4.75 14.25 5.64543 14.25 6.75V7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
									<path d="M5.75 13V18C5.75 18.6904 6.30964 19.25 7 19.25H17C17.6904 19.25 18.25 18.6904 18.25 18V13C18.25 9.54822 15.4518 6.75 12 6.75C8.54822 6.75 5.75 9.54822 5.75 13Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
									<path d="M9.75 14.25H14.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
								</svg>
								KL
							</span>
						</button>
					</li>
				</ul> -->

				<div>
					<label class="block text-sm mb-2" for="search">Search</label>
					<div class="relative">
						<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="Search donations by (name, food type, address, state, city, no. of plates).." required type="text" v-model="state.searchQuery" />
					</div>
				</div>

				<article class="rounded-xl border-2 border-gray-100 bg-white p-5" v-if="searchResults.length === 0">
					<p class="text-base text-gray-700">No results found!</p>
				</article>

				<food-card :donation="donation" :key="donation.id" @orderBooked="donationBooked" v-for="donation in searchResults"></food-card>
			</div>
		</section>
	</div>
</template>
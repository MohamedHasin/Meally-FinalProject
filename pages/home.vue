<script setup>
import { useNotification } from "@kyvg/vue3-notification";
import { onMounted } from "vue";
import moment from "moment";

definePageMeta({
  middleware: "auth",
});

const client = useSupabaseClient();
const user = useSupabaseUser();
const { notify } = useNotification();

const state = reactive({
  my_donations: [],
  donation_count: 0,
  my_location: null,
  profile: null,
});

const getProfile = async () => {
  let { data, error, status } = await client
    .from("profiles")
    .select(`full_name, avatar_url`)
    .eq("id", user.value.id)
    .single();

  if (error && status !== 406) throw error;

  if (data) {
    state.profile = data;
  }

  downloadImage();
};

const getDonations = async () => {
  const { data } = await client
    .from("foods")
    .select(
      `id, name, created_at, no_plates, image_url, created_at,user_id, expiry_till_date, food_types(id,name), locations(id,address, city, state, lat, long)`
    )
    .eq("user_id", user.value.id)
    .order("created_at");

  state.donation_count = data.length;
  state.my_donations = data;
};

const getMyLocation = async () => {
  const { data } = await useAsyncData("locations", async () => {
    const { data } = await client
      .from("locations")
      .select(`id, address, city, state, lat, long`)
      .eq("user_id", user.value.id)
      .order("created_at")
      .limit(1);

    return data;
  });

  state.my_location = data.value[0];
};

const removeDonation = async (donation) => {
  state.my_donations = state.my_donations.filter((d) => d.id !== donation.id);
  await client.from("foods").delete().match({ id: donation.id });

  notify({
    title: "Success",
    message: "Donation deleted successfully",
    type: "success",
  });
};

const downloadImage = async () => {
  try {
    const { data, error } = await client.storage
      .from("avatars")
      .download(state.profile.avatar_url);
    if (error) throw error;
    state.profile.avatar_url = URL.createObjectURL(data);
  } catch (error) {
    console.error("Error downloading image: ", error.message);
  }
};

onMounted(() => {
  getProfile();
  getMyLocation();
  getDonations();
});
</script>
<template>

  <div>
    
		<div class="bg-primary px-5 py-16">
			<NuxtLink to="/my-account">
				<svg class="absolute top-0 right-0 text-white mr-3 mt-3 w-8 h-8 group-hover:scale-125 transform transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
				</svg>
			</NuxtLink>

			<div class="flex items-center justify-center">
				<NuxtLink class="group block w-full flex-shrink-0" to="/profile">
					<div class="flex flex-col items-center space-y-3">
						<div>
              <div class="logo" style="align-content:center;">
            <img src="/header_logo.png" alt="logo" style="margin-left:0px; margin-bottom:-20px; margin-top:-20px; height: 35px; width: 35px; border-collapse: collapse; z-index: 1; position:relative;">
              </div>

							<img :src="state?.profile?.avatar_url" alt class="inline-block h-24 w-24 border-2 rounded-full" />
						</div>
						<div class="ml-3 text-center">
							<p class="text-xl font-medium text-white">{{ user.user_metadata.name }}</p>
							<div class="inline-flex items-center gap-2">
								<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
									<path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
								</svg>
								<p class="text-xs font-normal text-gray-100 group-hover:text-white">{{ state?.my_location?.city }}</p>
							</div>
						</div>
					</div>
				</NuxtLink>
			</div>

			<div class="mt-8">
				<h1 class="text-xl text-white font-light">Welcome Back, {{ user.user_metadata.name }}!</h1>
				<p class="text-white text-left font-semibold text-xl">Your total donations is {{ state.donation_count }} meals. </p>
			</div>

			<div class="mt-2">
				<span class="text-gray-500 font-normal text-xs">Advertisement</span>
				<img class="rounded-lg" src="/ads/home2.gif" width="970" />
			</div>

			<quote></quote>
		</div>

		<div>
			<section class="bg-white rounded-t-lg -my-5 pb-32">
				<h3 class="text-md font-semibold ml-2 p-4">
					My Donations
					<span class="text-primary">({{ state.donation_count }})</span>
				</h3>

				<div class="mt-3 mx-5 overflow-y-scroll space-y-3" v-if="state.my_donations">
					<food-card :donation="donation" :key="donation.id" @delete="removeDonation(donation)" v-for="donation in state.my_donations"></food-card>
				</div>
			</section>
		</div>
	</div>
</template>
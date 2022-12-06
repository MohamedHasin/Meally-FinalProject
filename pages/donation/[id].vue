<script setup>
import { notify } from "@kyvg/vue3-notification";
const user = useSupabaseUser();
const client = useSupabaseClient();
const route = useRoute();

const state = reactive({
  donation: null,
  my_locations: [],
  food_types: [],
});

const image_url = ref("");

const getDonation = async () => {
    const { data, error } = await client
      .from("foods")
      .select(
        `id, name, created_at, pick_up_instructions, no_plates, image_url, user_id, created_at, expiry_till_date, food_types(id,name), locations(id,address, city, state, lat, long)`
      )
      .eq("id", route.params.id)
      .eq("user_id", user.value.id)
      .single();

    if (error) {
      notify({
        title: "Error",
        text: "Donation not found",
        type: "error",
      });
      navigateTo("/explore");
    }

  state.donation = data;
  image_url.value = data.image_url;
  return data;
};

const getMyLocations = async () => {
    const { data } = await client
      .from("locations")
      .select(`id, address, city, state, lat, long`)
      .eq("user_id", user.value.id)
      .order("created_at");

  state.my_locations = data;
};

const getFoodTypes = async () => {
  const { data } = await useAsyncData("food_types", async () => {
    const { data } = await client
      .from("food_types")
      .select(`id, name`)
      .order("name");

    return data;
  });

  state.food_types = data;
};

const updateDonation = async () => {

  const { data, error } = await client
    .from("foods")
    .update({
      name: state.donation.name,
      pick_up_instructions: state.donation.pick_up_instructions,
      no_plates: state.donation.no_plates,
      expiry_till_date: state.donation.expiry_till_date,
      location_id: state.donation.locations.id,
      food_type_id: state.donation.food_types.id,
      image_url: image_url.value,
    })
    .eq("id", state.donation.id);

  if (error) {
    notify({
      title: "Error",
      text: "Error updating donation",
      type: "error",
    });
  } else {
    notify({
      title: "Success",
      text: "Donation updated",
      type: "success",
    });

    navigateTo('/home');
  }
};
onMounted(async () => {
  await getDonation();
  await getMyLocations();
  await getFoodTypes();
});
</script>
<template>
	<div>
		<div class="bg-primary px-5 py-16">
			<h2 class="text-white text-4xl font-semibold">Update Donation: {{ state.donation?.name }}</h2>
			<p class="text-white text-md mt-2">Update Information about the donations</p>
		</div>

		<section class="bg-white rounded-t-lg -my-5 pb-32">
			<div class="mt-3 mx-5 overflow-y-scroll space-y-3 pt-5">
				<form class="space-y-5" v-if="state.donation">
				
          <Upload class="flex flex-col items-center justify-center" @upload="updateDonation" size="10" storage="foods" v-model:path="image_url" />
					<div>
						<label class="block text-sm mb-2" for="name">Item Name</label>
						<div class="relative">
							<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="Item Name" required type="text" v-model="state.donation.name" />
						</div>
					</div>

					<div>
						<label class="block text-sm mb-2" for="name">No Plates</label>
						<div class="relative">
							<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="No Plates" required type="number" v-model="state.donation.no_plates" />
						</div>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700" for="food_type">Food Type</label>
						<select class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" v-model="state.donation.food_types.id">
							<option :key="food_type.id" :value="food_type.id" v-for="food_type of state.food_types">{{ food_type.name}}</option>
						</select>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700" for="food_type">Location</label>
						<select class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" v-model="state.donation.locations.id">
							<option :key="location.id" :value="location.id" v-for="location of state.my_locations">{{ location.address}}, {{ location.state }} ,{{ location.city }}</option>
						</select>
					</div>

					<div>
						<label class="block text-sm mb-2" for="pick_up_instruction">Pick Up Instructions</label>
						<div class="relative">
							<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="Pick Up Instructions" required type="text" v-model="state.donation.pick_up_instructions" />
						</div>
					</div>

					<div>
						<label class="block text-sm mb-2" for="expiry_till_date">Expiry Till Date</label>
						<div class="relative">
							<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="Expiry Till Date" required type="datetime-local" v-model="state.donation.expiry_till_date" />
						</div>
					</div>

					<div class="relative bg-white py-16 sm:py-24 flex justify-center">
						<button @click.prevent="updateDonation" class="inline-block rounded border border-green-600 bg-primary px-32 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-green-500" v-if="user">Save</button>
					</div>
				</form>
			</div>
		</section>
	</div>
</template>
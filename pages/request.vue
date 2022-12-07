<script setup>
import { notify } from "@kyvg/vue3-notification";
const user = useSupabaseUser();
const client = useSupabaseClient();

const state = reactive({
  form: {
    name: "",
    no_plates: "",
    food_type_id: null,
    location_id: null,
    pick_up_instructions: "",
    expiry_till_date: "",
  },
  my_locations: [],
  food_types: [],
});

const image_url = ref("");

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

const createDonation = async () => {
  const { data, error } = await client
    .from("foods")
    .upsert([
      {
        name: state.form.name,
        pick_up_instructions: state.form.pick_up_instructions,
        no_plates: state.form.no_plates,
        expiry_till_date: state.form.expiry_till_date,
        location_id: state.form.location_id,
        food_type_id: state.form.food_type_id,
        image_url: image_url.value,
        user_id: user.value.id,
      }
    ]);

  if(!error) {
      navigateTo("/home");
  }

  if (error) {
    notify({
      title: "Error",
      text: "Error creating donation!",
      type: "error",
    });
  } else {
    notify({
      title: "Success",
      text: "Donation created!",
      type: "success",
    });
  }
};
onMounted(async () => {
  await getMyLocations();
  await getFoodTypes();
});
</script>
<template>
	<div>
		<div class="bg-primary px-5 py-16">
			<h2 class="text-white text-4xl font-semibold">Add Food Donation: {{ state.form?.name }}</h2>
			<p class="text-white text-md mt-2">Please fill the details with valid information. Make sure to put the correct details (Phone number) for Pick Up Instructions and correct information.</p>
		</div>

		<section class="bg-white rounded-t-lg -my-5 pb-32">
			<div class="mt-3 mx-5 overflow-y-scroll space-y-3 pt-5">
				<form class="space-y-5">
					<Upload required class="flex flex-col items-center justify-center" size="10" storage="foods" v-model:path="image_url" />
					<div>
						<label class="block text-sm mb-2" for="name">Item Name</label>
						<div class="relative">
							<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="Item Name" required type="text" v-model="state.form.name" />
						</div>
					</div>

					<div>
						<label class="block text-sm mb-2" for="name">No Plates</label>
						<div class="relative">
							<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="No Plates" required type="number" v-model="state.form.no_plates" />
						</div>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700" for="food_type">Food Type</label>
						<select class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" v-model="state.form.food_type_id">
							<option :key="food_type.id" :value="food_type.id" v-for="food_type of state.food_types">{{ food_type.name}}</option>
						</select>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700" for="food_type">Location</label>
						<select class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" v-model="state.form.location_id">
							<option :key="location.id" :value="location.id" v-for="location of state.my_locations">{{ location.address}}, {{ location.state }} ,{{ location.city }}</option>
						</select>
					</div>

					<div>
						<label class="block text-sm mb-2" for="pick_up_instruction">Pick Up Instructions</label>
						<div class="relative">
							<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="Pick Up Instructions (Contact Details for Delivery Arrangement)" required type="text" v-model="state.form.pick_up_instructions" />
						</div>
					</div>

					<div>
						<label class="block text-sm mb-2" for="expiry_till_date">Estimated Expiry Date</label>
						<div class="relative">
							<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="Estimated Expiry Date" required type="datetime-local" v-model="state.form.expiry_till_date" />
						</div>
					</div>

					<div class="relative bg-white py-16 sm:py-24 flex justify-center">
						<button @click.prevent="createDonation" class="inline-block rounded border border-green-600 bg-primary px-32 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-green-500" v-if="user">Save</button>
					</div>
				</form>
			</div>
		</section>
	</div>
</template>
<script setup>
import { useStorage, useGeolocation } from "@vueuse/core";
import { UseGeolocation } from "@vueuse/components";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css";
import {
  MapboxMap,
  MapboxGeolocateControl,
  MapboxGeocoder,
  MapboxNavigationControl,
} from "@studiometa/vue-mapbox-gl";

definePageMeta({
  middleware: "auth",
});

const user = useSupabaseUser();
const client = useSupabaseClient();
const show_quote = useStorage("show_quote", true);
const geolocate = ref();
const { coords, locatedAt, error, resume, pause } = useGeolocation();

const state = reactive({
  locatons: [],
  address: null,
  city: null,
  state: null,
  lat: null,
  long: null,
  zip_code: null,
  add_new_address: false,
  top_contributors: [],
});

const getLocations = async () => {
  const { data } = await client
    .from("locations")
    .select(`id, address, city, state, long, lat, user_id`)
    .eq("user_id", user.value.id)
    .order("created_at");

  state.locatons = data;
};

const logout = async () => {
  const { error } = await client.auth.signOut();
  if (error) {
    console.log(error);
  }

  if (!error) {
    navigateTo("/");
  }
};

const getTopContributors = async () => {
  const { data } = await client
    .from("profiles")
    .select("*, orders!orders_donator_id_fkey(*)")
	.eq('orders.status', 'delivered');

  const result = data;

  //result Order by users who contributed most orders
  result.sort((a, b) => {
    return b.orders.length - a.orders.length;
  });

  state.top_contributors = result.slice(0, 5);
};

const createLocation = async () => {
  const { data, error } = await client.from("locations").upsert([
    {
      address: state.address,
      city: state.city,
      state: state.state,
      long: state.long,
      zip_code: state.zip_code,
      lat: state.lat,
      user_id: user.value.id,
    },
  ]);

  if (!error) {
    state.add_new_address = false;
    getLocations();

    state.address = null;
    state.city = null;
    state.state = null;
  }
};

function trigger() {
  console.log("trigger");
  if (unref(geolocate)) {
    unref(geolocate).control.trigger();
  }
}

function mb_result(result) {
  state.city = result.result.text;
}

onMounted(() => {
  getLocations();
  getTopContributors();
});
</script>
<template>
	<div>
		<div class="bg-primary px-5 py-7">
			<h2 class="text-white text-4xl font-semibold">My Account</h2>
			<p class="text-white text-md mt-2 break-words">Top Contributors, Settings, Log Out.</p>
			<span class="logo" style="display: grid;justify-content: left;">
			<img src="/meally.png" alt="logo">
			</span>
		</div>

		<section class="bg-white rounded-t-lg -my-2 p-8 space-y-8">
			<collapsable-link description="Shows ranking of all the top donators" title="Top 5 Contributors">
				<div class="p-2 space-y-4">

					<contributor :contributor="contributor" :indexValue="index" :key="contributor.id" v-for="(contributor, index) in state.top_contributors" ></contributor>


				</div>
			</collapsable-link>

			<collapsable-link description="Update Your current location." title="Location">
				<div class="p-2 space-y-2" v-if="state.add_new_address">
					<MapboxMap access-token="pk.eyJ1IjoibW9oYW1lZGhhc2luIiwiYSI6ImNsYjR1YmRnZDAwNm0zcW16YTJvOXF0dGIifQ.iJcYil7Ze0oE-sSt5QfUtQ" map-style="mapbox://styles/mapbox/streets-v11" style="height: 400px">
						<MapboxGeocoder @mb-result="mb_result" countries="my" />
						<MapboxNavigationControl position="bottom-right" />
					</MapboxMap>

					<h3 class="text-sm font-semibold text-gray-700">My Current Location</h3>
					<UseGeolocation v-slot="{ coords: { latitude, longitude } }">
						<div class="mt-2 space-y-3">
							<div>
								<label class="block text-sm mb-2" for="address">Address</label>
								<div class="relative">
									<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="Address" v-model="state.address" />
								</div>
							</div>

							<div>
								<label class="block text-sm mb-2" for="city">City</label>
								<div class="relative">
									<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="City" v-model="state.city" />
								</div>
							</div>

							<div>
								<label class="block text-sm mb-2" for="state">State</label>
								<div class="relative">
									<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="State" v-model="state.state" />
								</div>
							</div>

							<div>
								<label class="block text-sm mb-2" for="zip_code">Zip Code</label>
								<div class="relative">
									<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="Zip Code" v-model="state.zip_code" />
								</div>
							</div>
							<div>
								<label class="block text-sm mb-2" for="long">Long (Mine)</label>
								<div class="relative">
									<input :value="longitude" @input="state.long = $event.target.value" class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="Longitude" />
								</div>
							</div>

							<div>
								<label class="block text-sm mb-2" for="long">Lat (Mine)</label>
								<div class="relative">
									<input :value="latitude" @input="state.lat = $event.target.value" class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="Latitude" />
								</div>
							</div>
						</div>
					</UseGeolocation>

					<div class="space-x-2">
						<button @click="state.add_new_address = false" class="inline-flex items-center rounded-md border border-transparent bg-gray-400 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" type="button">
							<svg class="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M10 14L12.75 19.25L19.25 4.75L4.75 11.75L10 14Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
							</svg>
							back To My Locations List
						</button>
						<button @click="createLocation" class="inline-flex items-center rounded-md border border-transparent bg-primary px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" type="button">
							<svg class="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.75 19.25H17.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
								<path d="M12 15.25V4.75" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
								<path d="M7.75 9.25L12 4.75L16.25 9.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
							</svg>
							Save Location
						</button>
					</div>
				</div>

				<div class="p-3" v-else>
					<h3 class="text-sm text-gray-700 font-semibold">My Saved Locations</h3>
					<ul class="divide-y divide-gray-200" role="list">
						<li :key="location.id" class="flex py-4" v-for="location in state.locatons">
							<svg class="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M10 14L12.75 19.25L19.25 4.75L4.75 11.75L10 14Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
							</svg>

							<div class="ml-3">
								<p class="text-xs font-medium text-gray-900">{{ location.address }}, {{ location.state }}, {{ location.city }}</p>
								<p class="text-xs text-gray-500">Lat: {{ location.lat}} Long: {{location.long}}</p>
							</div>
						</li>
					</ul>
					<button @click="state.add_new_address = true" class="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" type="button">
						<svg class="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M10 14L12.75 19.25L19.25 4.75L4.75 11.75L10 14Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
						</svg>
						Add New Location
					</button>
				</div>
			</collapsable-link>

			<toggle label="Quote Pop-up" v-model="show_quote"></toggle>

			<div class="relative bg-white py-16 sm:py-24 flex justify-center">
				<button @click.prevent="logout()" class="inline-block rounded border border-green-600 bg-primary px-32 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-green-500" v-if="user">Logout</button>
			</div>
		</section>
	</div>
</template>
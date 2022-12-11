<script setup>
import { notify } from "@kyvg/vue3-notification";
import moment from "moment";
import { onMounted } from "vue";

const emits = defineEmits(["orderBooked", "delete"]);
const user = useSupabaseUser();
const client = useSupabaseClient();
const route = useRoute();

const image_url = ref("");

const props = defineProps({
  donation: {
    type: Object,
    required: true,
  },
});

const state = reactive({
  showBookingConfirmation: false,
  donationToBook: null,
  order: null,
  delivered: false,
  donationDelivered: null,
});

const donationStatus = computed(() => {
  if (!state.order) {
    return "available";
  } else if (state.order.status === "pending") {
    return "booked";
  } else {
    return "delivered";
  }
});

const downloadImage = async () => {
  try {
    const { data, error } = await client.storage
      .from("foods")
      .download(props.donation.image_url);
    if (error) throw error;
    image_url.value = URL.createObjectURL(data);
  } catch (error) {
    console.error("Error downloading image: ", error.message);
  }
};

const getDonationOrder = async () => {
  const { data } = await client
    .from("orders")
    .select(
      `id, created_at, status, receiver_id, donator_id, food_id, foods(id, name, image_url, no_plates)`
    )
    .eq("food_id", props.donation.id);

  if (data.length > 0) {
    state.order = data[0];
  }
};

const bookDonation = async () => {
  const { data, error } = await client.from("orders").upsert({
    receiver_id: user.value.id,
    donator_id: state.donationToBook.user_id,
    food_id: state.donationToBook.id,
    status: "pending",
  });

  if (!error) {
    emits("orderBooked", state.donationToBook);
    dismissConfirmToBook();
    getDonationOrder();
  }

  if (error) {
    notify({
      title: "Error",
      text: "Error booking donation!",
      type: "error",
    });
  } else {
    notify({
      title: "Success",
      text: "Donation Booking created!",
      type: "success",
    });
  }
};

const markDonationAsDelivered = async () => {
  const { data, error } = await client
    .from("orders")
    .update({
      status: "delivered",
    })
    .eq("id", state.order.id);

  if (!error) {

	getDonationOrder();
    state.delivered = false;
    state.donationDelivered = null;

    notify({
      title: "Success",
      text: "Donation Marked As delivered!",
      type: "success",
    });
  }
};

function showDeliveredConfirm(donation) {
  state.delivered = true;
  state.donationDelivered = donation;
}

function showBookingConfirmation(donation) {
  state.showBookingConfirmation = true;
  state.donationToBook = donation;
}

function dismissConfirmToBook() {
  state.showBookingConfirmation = false;
  state.donationToBook = null;
}

onMounted(() => {
  downloadImage();
});

onBeforeMount(() => {
  getDonationOrder();
});
</script>
	<template>
	<article class="rounded-xl border-2 border-gray-100 bg-white hover:bg-green-50 cursor-pointer relative">
		<div class="absolute top-0 right-0 mr-3 mt-3 space-x-2">
			<div class="inline-flex items-center gap-3">
				<NuxtLink :to="`/donation/` + donation.id " class="group" v-if="props.donation.user_id === user.id">
					<svg class="text-yellow-400 w-6 h-6 group-hover:scale-125 transform transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
						<path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
					</svg>
				</NuxtLink>

				<button @click="$emit('delete', donation)" class="group" v-if="props.donation.user_id === user.id && route.fullPath !== '/explore'">
					<svg class="text-red-400 w-6 h-6 group-hover:scale-125 transform transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
					</svg>
				</button>
			</div>
		</div>

		<div class="flex items-center p-6">
			<a class="block shrink-0" href="#">
				<img :src="image_url" class="h-36 w-36 rounded-lg object-cover" />
			</a>

			<div class="ml-4">
				<h3 class="font-medium sm:text-lg mb-2">
					<a class="hover:underline" href="#">{{ donation.name }}</a>
				</h3>

				<div class="space-y-2">
					<p class="text-sm text-gray-700 line-clamp-2">
						<span class="font-semibold">No. of Plate:</span>
						{{ donation.no_plates }}
					</p>

					<p class="text-sm text-gray-700 line-clamp-2">
						<span class="font-semibold">Type:</span>
						{{ donation.food_types.name }}
					</p>

					<p class="text-sm text-gray-700 line-clamp-2">
						<span class="font-semibold">Location:</span>
						{{ donation.locations.address }}, {{ donation.locations.city }}, {{ donation.locations.state }}
					</p>

					<p class="text-sm text-gray-700 line-clamp-2">
						<span class="font-semibold">Posted At:</span>
						{{ moment(donation.created_at).format('DD MMM YYYY') }}
					</p>

					<p class="text-sm text-gray-700 line-clamp-2 space-x-2">
						<span class="font-semibold">Status</span>
						<Availability :status="donationStatus" />
					</p>
					<div v-if="state.order">
						<p v-if="user.id === state.order.receiver_id" class="text-sm text-gray-700 line-clamp-2">
							<span class="font-semibold">Pick up instructions:</span>
							{{donation.pick_up_instructions}}
						</p>
					</div>
				</div>
			</div>
		</div>


		<div class="flex justify-end" v-if="donation.user_id === user.id">
			<strong class="-mr-[2px] -mb-[2px] inline-flex items-center gap-1 rounded-tl-xl rounded-br-xl bg-primary py-1.5 px-3 text-white">
				<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke-linecap="round" stroke-linejoin="round" />
				</svg>

				<span class="text-[10px] font-medium sm:text-xs">Mine</span>
			</strong>
		</div>
		<div class="p-3" v-if="donation.user_id !== user.id && donationStatus === 'available'">
			<button @click="showBookingConfirmation(donation)" class="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" type="button">
				<svg class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M4.75 8.75V8C4.52351 8 4.30914 8.10235 4.16675 8.27849C4.02436 8.45463 3.96919 8.68568 4.01665 8.90715L4.75 8.75ZM19.25 8.75L19.9834 8.90715C20.0308 8.68568 19.9756 8.45463 19.8332 8.27849C19.6909 8.10235 19.4765 8 19.25 8V8.75ZM6.66123 17.6691L7.39458 17.5119L6.66123 17.6691ZM17.3388 17.6691L16.6054 17.5119L16.6054 17.5119L17.3388 17.6691ZM4.75 9.5H19.25V8H4.75V9.5ZM18.5166 8.59285L16.6054 17.5119L18.0721 17.8262L19.9834 8.90715L18.5166 8.59285ZM15.3832 18.5H8.61683V20H15.3832V18.5ZM7.39458 17.5119L5.48335 8.59285L4.01665 8.90715L5.92787 17.8262L7.39458 17.5119ZM8.61683 18.5C8.02741 18.5 7.51808 18.0882 7.39458 17.5119L5.92787 17.8262C6.19958 19.0941 7.3201 20 8.61683 20V18.5ZM16.6054 17.5119C16.4819 18.0883 15.9726 18.5 15.3832 18.5V20C16.6799 20 17.8004 19.0942 18.0721 17.8262L16.6054 17.5119Z"
						fill="currentColor"
					/>
					<path d="M7.28849 8.26283C7.1575 8.65579 7.36987 9.08053 7.76283 9.21151C8.15579 9.3425 8.58053 9.13013 8.71151 8.73717L7.28849 8.26283ZM9.96151 4.98717C10.0925 4.59421 9.88013 4.16947 9.48717 4.03849C9.09421 3.9075 8.66947 4.11987 8.53849 4.51283L9.96151 4.98717ZM8.71151 8.73717L9.96151 4.98717L8.53849 4.51283L7.28849 8.26283L8.71151 8.73717Z" fill="currentColor" />
					<path d="M15.2885 8.73717C15.4195 9.13013 15.8442 9.3425 16.2372 9.21151C16.6301 9.08053 16.8425 8.65579 16.7115 8.26283L15.2885 8.73717ZM15.4615 4.51283C15.3305 4.11987 14.9058 3.9075 14.5128 4.03849C14.1199 4.16947 13.9075 4.59421 14.0385 4.98717L15.4615 4.51283ZM16.7115 8.26283L15.4615 4.51283L14.0385 4.98717L15.2885 8.73717L16.7115 8.26283Z" fill="currentColor" />
				</svg>
				Book
			</button>
		</div>

		<div class="p-3" v-if="donation.user_id === user.id && donationStatus === 'booked'">
			<button @click="showDeliveredConfirm(donation)" class="inline-flex items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" type="button">
				<svg class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M4.75 8.75V8C4.52351 8 4.30914 8.10235 4.16675 8.27849C4.02436 8.45463 3.96919 8.68568 4.01665 8.90715L4.75 8.75ZM19.25 8.75L19.9834 8.90715C20.0308 8.68568 19.9756 8.45463 19.8332 8.27849C19.6909 8.10235 19.4765 8 19.25 8V8.75ZM6.66123 17.6691L7.39458 17.5119L6.66123 17.6691ZM17.3388 17.6691L16.6054 17.5119L16.6054 17.5119L17.3388 17.6691ZM4.75 9.5H19.25V8H4.75V9.5ZM18.5166 8.59285L16.6054 17.5119L18.0721 17.8262L19.9834 8.90715L18.5166 8.59285ZM15.3832 18.5H8.61683V20H15.3832V18.5ZM7.39458 17.5119L5.48335 8.59285L4.01665 8.90715L5.92787 17.8262L7.39458 17.5119ZM8.61683 18.5C8.02741 18.5 7.51808 18.0882 7.39458 17.5119L5.92787 17.8262C6.19958 19.0941 7.3201 20 8.61683 20V18.5ZM16.6054 17.5119C16.4819 18.0883 15.9726 18.5 15.3832 18.5V20C16.6799 20 17.8004 19.0942 18.0721 17.8262L16.6054 17.5119Z"
						fill="currentColor"
					/>
					<path d="M7.28849 8.26283C7.1575 8.65579 7.36987 9.08053 7.76283 9.21151C8.15579 9.3425 8.58053 9.13013 8.71151 8.73717L7.28849 8.26283ZM9.96151 4.98717C10.0925 4.59421 9.88013 4.16947 9.48717 4.03849C9.09421 3.9075 8.66947 4.11987 8.53849 4.51283L9.96151 4.98717ZM8.71151 8.73717L9.96151 4.98717L8.53849 4.51283L7.28849 8.26283L8.71151 8.73717Z" fill="currentColor" />
					<path d="M15.2885 8.73717C15.4195 9.13013 15.8442 9.3425 16.2372 9.21151C16.6301 9.08053 16.8425 8.65579 16.7115 8.26283L15.2885 8.73717ZM15.4615 4.51283C15.3305 4.11987 14.9058 3.9075 14.5128 4.03849C14.1199 4.16947 13.9075 4.59421 14.0385 4.98717L15.4615 4.51283ZM16.7115 8.26283L15.4615 4.51283L14.0385 4.98717L15.2885 8.73717L16.7115 8.26283Z" fill="currentColor" />
				</svg>
				Mark as delivered
			</button>
		</div>
			<strong class="logo" style="display: grid;justify-content: center;">
				<img src="/meally-logo.png" alt="logso" style="width:60px;  height:40px; margin-bottom: 10px">
			</strong>
	</article>

	<confirmation-modal :show="state.showBookingConfirmation" @close="dismissConfirmToBook">
		<template #content>
			<div class="mt-3 text-center sm:mt-5">
				<h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Are you sure you want to book "{{ state.donationToBook.name }}" ?</h3>
				<div class="mt-2">
					<p class="text-sm text-gray-500">This item will be added to your bookings and you will able to connect with the donator to arrange a time to pick it up.</p>
				</div>
			</div>
		</template>

		<template #footer>
			<div class="flex items-center gap-2 justify-start">
				<button @click="bookDonation" class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" type="button">Confirm</button>
				<button @click="dismissConfirmToBook" class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" type="button">Cancel</button>
			</div>
		</template>
	</confirmation-modal>

	<confirmation-modal :show="state.delivered" @close="state.delivered = false">
		<template #content>
			<div class="mt-3 text-center sm:mt-5">
				<h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Are you sure you want to mark this donation as delivered?</h3>
				<div class="mt-2">
					<p class="text-sm text-gray-500">After you confirm donation will be marked as delivered and completed!</p>
				</div>
			</div>
		</template>

		<template #footer>
			<div class="flex items-center gap-2 justify-start">
				<button @click="markDonationAsDelivered()" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" type="button">Confirm</button>
				<button @click="state.delivered = false" class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" type="button">Cancel</button>
			</div>
		</template>
	</confirmation-modal>
</template>
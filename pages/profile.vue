<script setup>
import { onMounted, ref, toRefs } from "vue";

definePageMeta({
  middleware: "auth",
});

const user = useSupabaseUser();
const client = useSupabaseClient();

const loading = ref(true);
const full_name = ref("");
const avatar_url = ref("");

onMounted(() => {
  getProfile();
});

async function getProfile() {
  try {
    loading.value = true;

    let { data, error, status } = await client
      .from("profiles")
      .select(`full_name, avatar_url`)
      .eq("id", user.value.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      full_name.value = data.full_name;
      avatar_url.value = data.avatar_url;
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function updateProfile() {
  try {
    loading.value = true;

    const updates = {
      id: user.value.id,
      full_name: full_name.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    };

    let { error } = await client.from("profiles").upsert(updates);

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

</script>

<template>
	<div>
		<div class="bg-primary px-5 py-16">
			<h2 class="text-white text-4xl font-semibold">Profile Page</h2>
			<p class="text-white text-md mt-2 break-words">Update & View Your Profile.</p>
		</div>

		<section class="bg-white rounded-t-lg p-4 sm:p-7 -my-5 pb-32">
			<form @submit.prevent="updateProfile">
                <div class="grid gap-y-4">
				<Upload class="flex flex-col items-center justify-center" @upload="updateProfile" size="10" storage="avatars" v-model:path="avatar_url" />
               

				<div>
					<label class="block text-sm mb-2" for="email">Email</label>
					<div class="relative">
						<input :value="user.email" class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" disabled placeholder="Your email" required type="text" />
					 <p class="text-sm mt-2 text-gray-500">email is not editable.</p>
          </div>
				</div>

                <div>
					<label class="block text-sm mb-2" for="name">Name</label>
					<div class="relative">
						<input v-model="full_name" class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" placeholder="Your name" required type="text" />
					</div>
				</div>

				<div class="flex justify-center">
					<input :disabled="loading" :value="loading ? 'Loading ...' : 'Update'" class="inline-block rounded border border-green-600 bg-primary px-32 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-green-500" type="submit" />
				</div>

                </div>
			</form>
		</section>
	</div>
</template>
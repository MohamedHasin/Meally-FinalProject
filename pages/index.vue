<script setup>
import { useNotification } from "@kyvg/vue3-notification";
import moment from "moment";

const router = useRouter();
const user = useSupabaseUser();
const { auth } = useSupabaseClient();
const { notify } = useNotification();

const name = ref("");
const mobile = ref("");
const email = ref("");
const password = ref("");
const isSignUp = ref(false);

const signUp = async () => {
	if(mobile.value.length <= 9 ||  mobile.value.length > 11){
	notify({
      title: "Error",
      text: "Please type a valid mobile number.",
      type: "error",
    });
	return;

	}
  const { error } = await auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        name: name.value,
        mobile: mobile.value,
      },
    },
  });

  if (error) {
    notify({
      title: "Error",
      text: error.message,
      type: "error",
    });
  } else {
    //reset the fields
    name.value = "";
    mobile.value = "";
    email.value = "";
    password.value = "";

    notify({
      title: "Success",
      text: "Check your email for the confirmation link.",
      type: "success",
    });

    isSignUp.value = false;
  }
};

const login = async () => {
  const { error } = await auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

    if (error) {
        notify({
        title: "Error",
        text: error.message,
        type: "error",
        });
    } else {
        //reset the fields
        email.value = "";
        password.value = "";
    
        notify({
        title: "Success",
        text: "You are logged in.",
        type: "success",
        });
    
        navigateTo("/home");
    }
};


watchEffect(() => {
  if (user.value) {
    navigateTo("/home");
  }
});
</script>

<template>
	<div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
		<div class="p-4 sm:p-7">
			<div class="text-center">
				<h1 class="block text-2xl font-bold text-gray-800">
					<span v-if="isSignUp">Sign up</span>
					<span v-else>Log in</span>
				</h1>
				<button @click="isSignUp = !isSignUp" class="w-full mt-8 text-sm text-center underline text-slate-300">
					<span v-if="isSignUp">Already have an account?</span>
					<span v-else>Don't have an account?</span>
				</button>
			</div>

			<div class="mt-5">
				<div class="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6">Or</div>

				<!-- Form -->
				<form @submit.prevent="() => (isSignUp ? signUp() : login() )">
					<div class="grid gap-y-4">
						<div v-if="isSignUp">
							<label class="block text-sm mb-2" for="name">Name</label>
							<div class="relative">
								<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" required type="text" v-model="name" placeholder="Full Name"/>
							</div>
						</div>

						<div v-if="isSignUp">
							<label class="block text-sm mb-2" for="mobile">Mobile</label>
							<div class="relative">
								<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" required type="text" v-model="mobile" placeholder="Type Your Malaysian Mobile Number"/>
							</div>
						</div>

						<!-- Form Group -->
						<div>
							<label class="block text-sm mb-2" for="email">Email address</label>
							<div class="relative">
								<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" required type="email" v-model="email" placeholder="Email Address"/>
							</div>
						</div>
						<!-- End Form Group -->

						<!-- Form Group -->
						<div>
							<label class="block text-sm mb-2" for="password">Password</label>
							<div class="relative">
								<input class="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary" required type="password" v-model="password" placeholder="Password"/>
							</div>
						</div>
						<!-- End Form Group -->

						<button class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all text-sm" type="submit">
							<span v-if="isSignUp">Sign up</span>
							<span v-else>Log in</span>
						</button>
					</div>
				</form>
				<!-- End Form -->
			</div>
		</div>
	</div>
</template>
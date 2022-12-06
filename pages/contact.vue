<script setup>
definePageMeta({
  middleware: "auth",
});
</script>
<template>
	<div>
		<div class="bg-primary px-5 py-16">
			<h2 class="text-white text-4xl font-semibold">About shabeer Us</h2>
			<p class="text-white text-md mt-2 break-words">Here is a little bit about ourselves</p>
		</div>

		<div class="bg-primary px-5 py-16">
			<img src="/meally-logo.png" alt="logo">
		</div>

		<div class="bg-white rounded-t-lg -my-4 pb-32">
			<section>
				<div class="relative bg-white py-16 sm:py-24">
					<div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-24 lg:px-8">
						<div class="relative sm:py-16 lg:py-0">
							<div aria-hidden="true" class="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
								<div class="absolute inset-y-0 right-1/2 w-full rounded-r-3xl bg-gray-50 lg:right-72"></div>
								<svg class="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12" fill="none" height="392" viewBox="0 0 404 392" width="404">
									<defs>
										<pattern height="20" id="02f20b47-fd69-4224-a62a-4c9de5c763f7" patternUnits="userSpaceOnUse" width="20" x="0" y="0">
											<rect class="text-gray-200" fill="currentColor" height="4" width="4" x="0" y="0" />
										</pattern>
									</defs>
									<rect fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" height="392" width="404" />
								</svg>
							</div>
							<div class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:px-0 lg:py-20">
								<!-- Testimonial card-->
								<div class="relative overflow-hidden rounded-2xl pt-64 pb-10 shadow-xl">
									<img alt class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1615897570286-da936a5dfb81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1521&q=800" />
									<div class="absolute inset-0 bg-white mix-blend-multiply"></div>
									<div class="absolute inset-0 bg-gradient-to-t from-green-600 via-gray-600 opacity-90"></div>
									<div class="relative px-8">
										<div>
											<img alt="Workcation" class="h-16" src="/icon.png" />
										</div>
										<blockquote class="mt-8">
											<div class="relative text-lg font-medium text-white md:flex-grow">
												<svg aria-hidden="true" class="absolute top-0 left-0 h-8 w-8 -translate-x-3 -translate-y-2 transform text-indigo-400" fill="currentColor" viewBox="0 0 32 32">
													<path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
												</svg>
												<p class="relative">Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat, diam. Montes, magna cursus nulla feugiat dignissim id lobortis amet.</p>
											</div>

											<footer class="mt-4">
												<p class="text-base font-semibold text-white">Shabeer, CEO at Meally</p>
											</footer>
										</blockquote>
									</div>
								</div>
							</div>
						</div>

						<div class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
							<!-- Content area -->
							<div class="pt-12 sm:pt-16 lg:pt-20">
								<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">On a mission to empower poor dudes like Shabeer</h2>
								<div class="mt-6 space-y-6 text-gray-500">
									<p class="text-lg">Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel porttitor vitae ut. Amet vitae fames senectus vitae.</p>
									<p class="text-base leading-7">Sollicitudin tristique eros erat odio sed vitae, consequat turpis elementum. Lorem nibh vel, eget pretium arcu vitae. Eros eu viverra donec ut volutpat donec laoreet quam urna. Sollicitudin tristique eros erat odio sed vitae, consequat turpis elementum. Lorem nibh vel, eget pretium arcu vitae. Eros eu viverra donec ut volutpat donec laoreet quam urna.</p>
									<p class="text-base leading-7">Rhoncus nisl, libero egestas diam fermentum dui. At quis tincidunt vel ultricies. Vulputate aliquet velit faucibus semper. Pellentesque in venenatis vestibulum consectetur nibh id. In id ut tempus egestas. Enim sit aliquam nec, a. Morbi enim fermentum lacus in. Viverra.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section class="bg-white px-8">
				<div class="bg-white">
					<div class="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
						<div class="mx-auto max-w-lg md:grid md:max-w-none md:grid-cols-2 md:gap-8">
							<div>
								<h2 class="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">Sales Support</h2>
								<div class="mt-3">
									<p class="text-lg text-gray-500">Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus arcu.</p>
								</div>
								<div class="mt-9">
									<div class="flex">
										<div class="flex-shrink-0">
											<!-- Heroicon name: outline/phone -->
											<svg aria-hidden="true" class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
												<path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" stroke-linecap="round" stroke-linejoin="round" />
											</svg>
										</div>
										<div class="ml-3 text-base text-gray-500">
											<p>+1 (555) 123 4567</p>
											<p class="mt-1">Mon-Fri 8am to 6pm PST</p>
										</div>
									</div>
									<div class="mt-6 flex">
										<div class="flex-shrink-0">
											<!-- Heroicon name: outline/envelope -->
											<svg aria-hidden="true" class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
												<path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" stroke-linecap="round" stroke-linejoin="round" />
											</svg>
										</div>
										<div class="ml-3 text-base text-gray-500">
											<p>support@example.com</p>
										</div>
									</div>
								</div>
							</div>
							<div class="mt-12 sm:mt-16 md:mt-0">
								<h2 class="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">Technical Support</h2>
								<div class="mt-3">
									<p class="text-lg text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, repellat error corporis doloribus similique, voluptatibus numquam quam, quae officiis facilis.</p>
								</div>
								<div class="mt-9">
									<div class="flex">
										<div class="flex-shrink-0">
											<!-- Heroicon name: outline/phone -->
											<svg aria-hidden="true" class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
												<path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" stroke-linecap="round" stroke-linejoin="round" />
											</svg>
										</div>
										<div class="ml-3 text-base text-gray-500">
											<p>+1 (555) 123 4567</p>
											<p class="mt-1">Mon-Fri 8am to 6pm PST</p>
										</div>
									</div>
									<div class="mt-6 flex">
										<div class="flex-shrink-0">
											<!-- Heroicon name: outline/envelope -->
											<svg aria-hidden="true" class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
												<path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" stroke-linecap="round" stroke-linejoin="round" />
											</svg>
										</div>
										<div class="ml-3 text-base text-gray-500">
											<p>support@example.com</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>
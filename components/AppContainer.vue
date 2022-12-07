<template>
	<div class="w-full h-screen bg-gray-50">
		<div class="container mx-auto">
			<div>
				<slot />
			</div>
		</div>

		<section class="block fixed inset-x-0 bottom-0 z-10 rounded-t-[25px] shadow" v-if="$route.fullPath !== '/'">
			<nav aria-label="Tabs" class="relative z-0 flex rounded-xl overflow-hidden" role="tablist">
				<NuxtLink class="inline-flex flex-col items-center relative min-w-0 flex-1 first:border-l-0 py-4 px-4 hover:text-gray-700 text-sm font-normal text-center overflow-hidden hover:bg-gray-50 focus:z-10" :class="[$route.fullPath === '/home' ? 'bg-gray-50 text-gray-700' : 'bg-white text-primary']" to="/home">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
					</svg>
					<span>Home</span>
				</NuxtLink>

				<NuxtLink class="inline-flex flex-col items-center relative min-w-0 flex-1 first:border-l-0 py-4 px-4 hover:text-gray-700 text-sm font-normal text-center overflow-hidden hover:bg-gray-50 focus:z-10" :class="[$route.fullPath === '/explore' ? 'bg-gray-50 text-gray-700' : 'bg-white text-primary']" to="/explore">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
					</svg>
					<span>Explore</span>
				</NuxtLink>

				<NuxtLink class="inline-flex flex-col items-center relative min-w-0 flex-1 first:border-l-0 py-4 px-4 hover:text-gray-700 text-sm font-normal text-center overflow-hidden hover:bg-gray-50 focus:z-10" :class="[$route.fullPath === '/donation' ? 'bg-gray-50 text-gray-700' : 'bg-white text-primary']" to="/donation">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
					</svg>
					<span>Donate Us</span>
				</NuxtLink>

				<NuxtLink class="inline-flex flex-col items-center relative min-w-0 flex-1 first:border-l-0 py-4 px-4 hover:text-gray-700 text-sm font-normal text-center overflow-hidden hover:bg-gray-50 focus:z-10" :class="[$route.fullPath === '/about' ? 'bg-gray-50 text-gray-700' : 'bg-white text-primary']" to="/about">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
					<span>About</span>
				</NuxtLink>

				<NuxtLink class="inline-flex flex-col items-center relative min-w-0 flex-1 first:border-l-0 py-4 px-4 hover:text-gray-700 text-sm font-normal text-center overflow-hidden hover:bg-gray-50 focus:z-10" :class="[$route.fullPath === '/my-account' ? 'bg-gray-50 text-gray-700' : 'bg-white text-primary']" to="/my-account">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
					<span>Account</span>
				</NuxtLink>

				
			</nav>

			<div class="absolute bottom-0 right-0 mr-5 mb-24">
				<NuxtLink class="inline-block rounded-lg border border-primary bg-primary p-2 text-white hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-primary" to="/request" v-if="$route.fullPath !== '/'">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
					</svg>
				</NuxtLink>
			</div>
		</section>
	</div>
</template>
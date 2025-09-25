<template>
	<div>
		<div class="w-full flex justify-center mb-6 rounded-full backdrop-blur-lg px-1 py-1">
			<button @click="handleTabChange('login')" class="w-1/2 py-1 text-center text-xs rounded-full font-medium cursor-pointer" :class="tab == 'login' ? 'bg-gray-50' : ''">Login</button>
			<button @click="handleTabChange('register')" class="w-1/2 py-1 text-center text-xs rounded-full font-medium cursor-pointer" :class="tab == 'register' ? 'bg-gray-50' : ''">Register</button>
		</div>

		<AuthLogin v-if="tab == 'login'" />
		<AuthRegister v-else />
	</div>
</template>

<script setup>

	definePageMeta({
		layout: 'authentication'
	})
	
	const tab = ref('login');

	const handleTabChange = (tabName) => {
		tab.value = tabName;
	}

</script>
	
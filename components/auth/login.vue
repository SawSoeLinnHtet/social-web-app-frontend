<template>
	<div>
		<div class="p-5 rounded-xl border-1 border-gray-300 bg-white/60 backdrop-sepia-5">
			<h2 class="text-md font-semibold mb-1">Welcome back</h2>
			<p class="text-xs text-gray-500 mb-2">Enter your credentials to access your account</p>
			
			<form @submit.prevent="handleSubmit" class="space-y-2">
				<div>
					<label for="" class="text-xs">Email</label>
					<input v-model="form.email" type="text" placeholder="Enter your email" class="w-full px-3 py-1 bg-gray-50 border-1 placeholder:text-xs border-gray-100 rounded-lg focus:outline-none text-sm">
					<span v-if="errors.email" class="text-[10px] pl-2 text-red-500">{{ errors.email }}</span>
				</div>
				<div>
					<label for="" class="text-xs">Password</label>
					<input v-model="form.password" type="password" placeholder="Enter your password" class="w-full px-3 py-1 bg-gray-50 border-1 placeholder:text-xs border-gray-100 rounded-lg focus:outline-none text-sm">
					<span v-if="errors.password" class="text-[10px] pl-2 text-red-500">{{ errors.password }}</span>
				</div>
				<button type="submit" class="w-full mt-3 bg-gray-900 text-xs text-white py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer">
					Sign in
				</button>
			</form>
		</div>
	</div>
</template>

<script setup>
    import { useAuthStore } from "~/stores/useAuthStore"
    import { useRouter } from "vue-router";

    const router = useRouter();
	const toast = useToast();

	const authStore = useAuthStore()

	const form = ref({
		email: '',
		password: '',
	})

	const errors = ref({
		email: null,
		password: null,
	});

	const pending = ref(false);
	
	const validateForm = () => {
		errors.value.email = null;
		errors.value.password = null;

		let isValid = true;

		if (!form.value.email) {
			errors.value.email = "Email is required";
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
			errors.value.email = "Email is invalid";
			isValid = false;
		}

		if (!form.value.password) {
			errors.value.password = "Password is required";
			isValid = false;
		}

		setTimeout(() => {
			pending.value = false;
		}, 500);

		return isValid;
	};

	const { handleLogin } = await useAuth();

	const handleSubmit = async () => {

		validateForm()

		const response = await handleLogin(form.value)

        if (authStore.token) {
			if (response.status == 200) {
				toast.success(response.message);
				router.push('/home');
			}
        }
	}
	
</script>

<template>
    <div>
        <div class="p-5 rounded-xl border-1 border-gray-300 bg-white/60 backdrop-sepia-5">
            <h2 class="text-md font-semibold mb-1">Create account</h2>
            <p class="text-xs text-gray-500 mb-2">Join our community and start sharing</p>
            
            <form @submit.prevent="handleSubmit" class="space-y-2">
                <div>
                    <label for="" class="text-xs">Username</label>
                    <input v-model="form.username" type="text" placeholder="Choose your username" class="w-full px-3 py-1 bg-gray-50 border-1 placeholder:text-xs border-gray-100 rounded-lg focus:outline-none">
                    <span v-if="errors.username" class="text-[10px] pl-2 text-red-500">{{ errors.username }}</span>
                </div>
                <div>
                    <label for="" class="text-xs">Email</label>
                    <input v-model="form.email" type="text" placeholder="Enter your email" class="w-full px-3 py-1 bg-gray-50 border-1 placeholder:text-xs border-gray-100 rounded-lg focus:outline-none">
                    <span v-if="errors.email" class="text-[10px] pl-2 text-red-500">{{ errors.email }}</span>
                </div>
                <div>
                    <label for="" class="text-xs">Password</label>
                    <input v-model="form.password" type="password" placeholder="Enter your password" class="w-full px-3 py-1 bg-gray-50 border-1 placeholder:text-xs border-gray-100 rounded-lg focus:outline-none">
                    <span v-if="errors.password" class="text-[10px] pl-2 text-red-500">{{ errors.password }}</span>
                </div>
                <div>
                    <label for="" class="text-xs">Profile Picture URL (Optional)</label>
                    <input type="file" placeholder="https://example.com/your-photo.jpg" class="w-full px-3 py-1 bg-gray-50 border-1 placeholder:text-xs border-gray-100 rounded-lg focus:outline-none">
                </div>
                <button type="submit" class="w-full mt-3 bg-gray-900 text-xs text-white py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                    Create Account
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { useAuthStore } from "~/stores/useAuthStore"
    import { useRouter } from "vue-router";

    const router = useRouter();

	const authStore = useAuthStore()

	const form = ref({
        username: '',
		email: '',
		password: '',
	})

	const errors = ref({
        username: null,
		email: null,
		password: null,
	});

	const pending = ref(false);
	
	const validateForm = () => {
		errors.value.username = null;
		errors.value.email = null;
		errors.value.password = null;

		let isValid = true;

		if (!form.value.username) {
			errors.value.username = "Username is required";
			isValid = false;
		}

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

	const handleSubmit = async () => {
        console.log(form.value)
		validateForm()
            
        const response = await authStore.register(form.value)

        console.log(response);

        if (response) {
            router.push('/');
        }

        // if (authStore.token) {
        //     router.push('/home');
        // }
	}
</script>
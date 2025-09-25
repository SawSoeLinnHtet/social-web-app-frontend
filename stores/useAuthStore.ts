import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		authUser: {},
		token: useCookie("access-token"),
	}),

	getters: {
		isAuth: (state) => (state.token ? true : false),
	},

	actions: {
		setAuthUser(user: any) {
			this.authUser = user;
		},
		setToken(token: any) {
			this.token = token;
		},
		clearAuthUser() {
			this.authUser = {};
		},
		clearToken() {
			this.token = null;
		},
		async fetchUser() {
			const config = useRuntimeConfig();
			const { data: response, error } = await useFetch(`${config.public.apiURL}profile`, {
				method: 'GET',
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.token}`
				}
			});
			this.setAuthUser(response.value.data);
		},
		// async register(data: any) {
		// 	const config = useRuntimeConfig();
			
		// 	const { data: response, error } = await useFetch(`${config.public.apiURL}register`, {
		// 		method: 'POST',
		// 		body: {
		// 			username: data.username,
		// 			email: data.email,
		// 			password: data.password,
		// 		}
		// 	});

		// 	console.log(response.value);

		// 	if (response.value && response.value.status == 200) {
		// 		return true;
		// 	}
				
		// },
		// async login(data: any) {
		// 	const config = useRuntimeConfig();
			
		// 	const { data: response, error } = await useFetch(`${config.public.apiURL}login`, {
		// 		method: 'POST',
		// 		body: {
		// 			email: data.email,
		// 			password: data.password,
		// 		}
		// 	});
		// 	if (response.value && response.value.token) {
		// 		this.token = response.value.token;
		// 		this.setToken(response.value.token);
		// 		this.setAuthUser(response.value.user);
		// 	}

		// 	if (error.value) {
		// 		console.log(error.value);
		// 	}
		// },
		// async logout() {
		// 	const router = useRouter();
			
		// 	const accessToken = useCookie("access-token");
		// 	accessToken.value = null;
		// 	this.clearAuthUser();
		// 	this.clearToken();
		// 	this.authUser = {};

		// 	router.push('/');
		// },
	},
})
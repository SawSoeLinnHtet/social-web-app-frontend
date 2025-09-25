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
			const response = await $fetch(`${config.public.apiURL}profile`, {
				method: 'GET',
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.token}`
				}
			});
			this.setAuthUser(response.data);
		},
	},
})
import { data } from "autoprefixer";

export const useAuth = async () => {
  const { token } = storeToRefs(useAuthStore());
  const authStore = useAuthStore();
  const router = useRouter();
  const config = useRuntimeConfig();
  const postStore = usePostStore();
  const profileStore = useProfileStore();

  const handleLogin = async (data: any) => {
    try {
      const response = await $fetch(`${config.public.apiURL}login`, {
        method: 'POST',
        body: {
          email: data.email,
          password: data.password,
        }
      });

      if (response && response.token) {
        const accessToken = useCookie("access-token");
        accessToken.value = response.token;
        authStore.setToken(response.token);
        authStore.setAuthUser(response.user);
      }

      if (response && response.status == 200) {
        await authStore.fetchUser();
        await postStore.fetchPosts();
        await profileStore.fetchMyPosts();

        return response
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleRegister = async (data: any) => {
    try {
      const response = await $fetch(`${config.public.apiURL}register`, {
        method: 'POST',
        body: {
          username: data.username,
          email: data.email,
          password: data.password,
        }
      });

      if (response && response.status == 200) {
        return response
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = async () => {
    const accessToken = useCookie("access-token");
    accessToken.value = null;

    const config = useRuntimeConfig();

    let headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    } as any

    if (token.value) {
        headers["Authorization"] = `Bearer ${token.value}`;
    }

    try {
      const response = await $fetch(`${config.public.apiURL}logout`, {
        method: "POST",
        headers: headers,
        credentials: "include",
      });
      

      if (response && response.status == 200) {
        token.value = null;
        const authStore = useAuthStore();
        const profileStore = useProfileStore();
        const postStore = usePostStore();
        
        authStore.$reset()
        profileStore.$reset()
        postStore.$reset()

        return response
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return { handleLogin, handleLogout, handleRegister };
};

import { data } from "autoprefixer";

export const useAuth = async () => {
  const { token } = storeToRefs(useAuthStore());
  const authStore = useAuthStore();
  const router = useRouter();
  const config = useRuntimeConfig();
  const postStore = usePostStore();
  const profileStore = useProfileStore();

  const handleLogin = async (data: any) => {
    const { data: response, error } = await useFetch(`${config.public.apiURL}login`, {
      method: 'POST',
      body: {
        email: data.email,
        password: data.password,
      }
    });

    if (response.value && response.value.token) {
      const accessToken = useCookie("access-token");
      accessToken.value = response.value.token;
      authStore.setToken(response.value.token);
      authStore.setAuthUser(response.value.user);
    }

    if (response.value && response.value.status == 200) {
      await authStore.fetchUser();
      await postStore.fetchPosts();
      await profileStore.fetchMyPosts();

      return response.value
    }

    if (error.value) {
      console.log(error.value);
    }
  }

  const handleRegister = async (data: any) => {
    const { data: response, error } = await useFetch(`${config.public.apiURL}register`, {
      method: 'POST',
      body: {
        username: data.username,
        email: data.email,
        password: data.password,
      }
    });

    if (response.value && response.value.status == 200) {
      return response.value
    }

    if (error.value) {
      console.log(error.value);
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

    const { data: response, error } = await useFetch(`${config.public.apiURL}logout`, {
      method: "POST",
      headers: headers,
      credentials: "include",
    });
    

    if (response.value && response.value.status == 200) {
      token.value = null;
      const authStore = useAuthStore();
      const profileStore = useProfileStore();
      const postStore = usePostStore();
      
      authStore.$reset()
      profileStore.$reset()
      postStore.$reset()

      return response.value
    }
  };
  

  return { handleLogin, handleLogout, handleRegister };
};

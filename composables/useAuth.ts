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

      router.push('/home');
    }

    if (error.value) {
      console.log(error.value);
    }
  }

  const handleLogout = async () => {
    token.value = null;
    const accessToken = useCookie("access-token");
    accessToken.value = null;

    let headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    } as any

    if (token.value) {
      headers["Authorization"] = `Bearer ${token.value}`
    }

    const { data: response } = await useFetch(`${config.public.apiURL}logout`, {
      method: "POST",
      headers: headers,
      credentials: "include",
    });

    const authStore = useAuthStore();
    const profileStore = useProfileStore();
    const postStore = usePostStore();
    
    authStore.$reset()
    profileStore.$reset()
    postStore.$reset()

    return navigateTo("/");
  };
  

  return { handleLogin, handleLogout };
};

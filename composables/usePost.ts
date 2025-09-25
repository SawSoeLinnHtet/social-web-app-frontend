export const usePost = () => {
    const { token } = storeToRefs(useAuthStore());
    const postStore = usePostStore();
    const profileStore = useProfileStore();

    const getPosts = async () => {
        const config = useRuntimeConfig();

        let headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        } as any
    
        if (token.value) {
            headers["Authorization"] = `Bearer ${token.value}`;
        }

        const { data: response, error } = await useFetch(`${config.public.apiURL}posts`, {
            method: 'GET',
            headers: headers,
            credentials: 'include',
        });

        if (response.value && response.value.status == 200) {
            postStore.setPosts(response.value.data);
        }
    }

    const createPost = async (data: any) => {
        const config = useRuntimeConfig();

        let headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        } as any
    
        if (token.value) {
            headers["Authorization"] = `Bearer ${token.value}`;
        }

        const { data: response, error } = await useFetch(`${config.public.apiURL}posts`, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: data,
        });

        if (response.value && response.value.status == 200) {
            const newPost = response.value.data;

            postStore.addPost(newPost)
            
            return newPost
        }
    }

    const reactPost = async (id: number) => {
        const config = useRuntimeConfig();

        let headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        } as any
    
        if (token.value) {
            headers["Authorization"] = `Bearer ${token.value}`;
        }

        const data = {
            "type": "like",
        }

        const { data: response, error } = await $fetch(`${config.public.apiURL}posts/${id}/reaction`, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: data,
        });

        if (response.value && response.value.status == 200) {
            const likedPost = response.value;
            const id = likedPost.data.post_info.id

            profileStore.reactedPost(likedPost.data, id)
    
            return likedPost.data
        }
    }

    const commentPost = async (id: number, data: any) => {
        const config = useRuntimeConfig();

        let headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        } as any
    
        if (token.value) {
            headers["Authorization"] = `Bearer ${token.value}`;
        }

        const { data: response, error } = await $fetch(`${config.public.apiURL}posts/${id}/comment`, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: data,
        });

        if (response.value && response.value.status == 200) {
            const commentedPost = response.value;
            const id = commentedPost.data.post_info.id
            postStore.commentedPost(commentedPost.data, id)
    
            return commentedPost.data
        }
    }

    return {
        getPosts,
        createPost,
        reactPost,
        commentPost
    }
}

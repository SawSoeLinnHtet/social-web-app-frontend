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

        const response = await $fetch(`${config.public.apiURL}posts`, {
            method: 'GET',
            headers: headers,
            credentials: 'include',
        });

        if (response && response.status == 200) {
            postStore.setPosts(response.data);
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
        const response = await $fetch(`${config.public.apiURL}posts`, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: data,
        });

        if (response && response.status == 200) {
            const newPost = response.data;

            postStore.addPost(newPost)
            profileStore.addPost(newPost)
            
            return { newPost, response: response }
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

        const response = await $fetch(`${config.public.apiURL}posts/${id}/reaction`, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: data,
        });

        if (response && response.status == 200) {
            const likedPost = response.data;
            const id = likedPost.post_info.id

            profileStore.reactedPost(likedPost, id)
    
            return likedPost
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

        const response = await $fetch(`${config.public.apiURL}posts/${id}/comment`, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: data,
        });

        if (response && response.status == 200) {
            const commentedPost = response.data;
            const id = commentedPost.post_info.id
            postStore.commentedPost(commentedPost, id)
    
            return commentedPost
        }
    }

    return {
        getPosts,
        createPost,
        reactPost,
        commentPost
    }
}

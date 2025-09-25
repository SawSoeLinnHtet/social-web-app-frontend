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
            const likedPost = response;
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

        const response = await $fetch(`${config.public.apiURL}posts/${id}/comment`, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: data,
        });

        if (response && response.status == 200) {
            const commentedPost = response;
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
